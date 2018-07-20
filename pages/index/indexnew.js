//index.js
// 获取Util实例
var homeUtil = require('../../utils/home.js');
var noticeutil = require('../notice/util/datarequest.js');
//获取应用实例

var app = getApp()
Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    imgUrls: [
      'https://www.gzwnks.com/sbb-web/upload/headericon/H6700HLEZ.jpg',
      'https://www.gzwnks.com/sbb-web/upload/headericon/H6700HK46.jpg',
      'https://www.gzwnks.com/sbb-web/upload/headericon/H6700HKLO.jpg'
    ],
    userInfo: {},
    muenus: [],
    cellHeight: '120rpx',
    city: '',
    latitude: '',
    longitude: '',
    uid: '',
    user_name: '昵称',
    user_head: 'http://img3.imgtn.bdimg.com/it/u=2733704563,565708946&fm=26&gp=0.jpg',
    noticecontent: [],
    open_id: '0000',
    showDaall: false,
    hiddenmodalput: true,
    phone: '',
    nickName: '', 
    avatarUrl: '', 
    openId: ''
  },
  toCallPhone: function () {
    wx.makePhoneCall({
      phoneNumber: '4000851323',
    })
  },
  //事件处理函数
  toNoticeDetailView: function () {
    var that = this;
    wx.navigateTo({
      url: '../notice/notice?notice=' + JSON.stringify(that.data.noticecontent)
    })
  },
  selectNewCity: function () {
    console.log('this.data.city = ' + this.data.city)
    wx.navigateTo({
      url: '../switchcity/switchcity?city=' + this.data.city
    })
  },
  toMyOrderView: function () {
    // wx.navigateTo({
    //   url: '../my/orderView/orderView?uid=' + this.data.uid + "&user_name=" + this.data.user_name
    // })
    wx.switchTab({
      url: '../my/orderView/orderNewView',
    })
  },

  /**
   * 获取微信登录
   */
  wxLogin: function (e) {
    var that = this;
    wx.login({
      success: function (res) {
        that.getOpenId(res.code, e);
      }
    });
  },
  /**
   * 获取openId
   */
  getOpenId: function (code, e) {
    var that = this;
    wx.request({
      url: getApp().globalData.serverIp + 'openkey/getWXopenId',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: { code: code },
      success: function (res) {
        var openIdStr = res.data.content[0];
        var jsonObj = JSON.parse(openIdStr);
        console.log('open_id = ' + jsonObj.openid);
        that.setData({ open_id: jsonObj.openid});
        let uid = wx.getStorageSync('uid')
        
        if (uid) {
          that.saveOpenId(jsonObj.openid, res.data);
        } else {
          // 新用户
          that.getUserRealInfo(jsonObj.openid)
        }
      }
    })
  },
  // 保存open_id
  saveOpenId: function (open_id, uid) {
    var that = this;
    wx.request({
      url: getApp().globalData.serverIp + 'openkey/saveWXopenId',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: { 
        open_id: open_id,
        uid: uid
       },
      success: function (res) {
      }
    })
  },
  getUserRealInfo(openid) {
    var that = this
    wx.getUserInfo({
      success: function (res) {
        console.log(res)
        var userInfo = res.userInfo
        console.log(userInfo)
        that.setData({
          nickName: userInfo.nickName,
          avatarUrl: userInfo.avatarUrl,
          openId: openid
        })
        that.modalinput()
        // that.addEditWxUser('', userInfo.nickName, userInfo.avatarUrl, openid)
      }
    })
  },
  addEditWxUser: function (user_id, nickname, head_img, open_id, phone) {
    var that = this;
    wx.request({
      url: getApp().globalData.serverIp + 'openkey/addEditWxUser',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        open_id: open_id,
        user_id: user_id,
        nickname: nickname,
        head_img: head_img,
        phone: phone
      },
      success: function (res) {
        var code = res.data.code;
        if (code == '1') {
          // 成功
          console.log(res.data.content[0])
          wx.setStorage({
            key: 'uid',
            data: res.data.content[0].id,
          });
          wx.setStorage({
            key: 'phone',
            data: res.data.content[0].phone,
          });
          wx.setStorage({
            key: 'isLogin',
            data: '1',
          });
          wx.setStorage({
            key: 'nickname',
            data: res.data.content[0].name,
          });
          wx.setStorage({
            key: 'is_vip',
            data: res.data.content[0].is_vip,
          });
        }
      }
    })
  },
  
  onLoad: function () {
    // 打开调试
    // wx.setEnableDebug({
    //   enableDebug: true
    // })
    // 获取uid

    var that = this
    wx.getStorage({
      key: 'uid',
      success: function (res) {
        that.setData({ uid: res.data })
      },
    })

    this.shihis()
    
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo,
        user_head: userInfo.avatarUrl == "" ? "http://img3.imgtn.bdimg.com/it/u=2733704563,565708946&fm=26&gp=0.jpg" : userInfo.avatarUrl
      })
    })
    // 自动定位获取地理位置
    homeUtil.getCityName(function (locationData) {
      // homeUtil.updateLocation(locationData.location.lng, locationData.location.lat, that.data.uid);
      that.setData({
        longitude: locationData.location.lng,
        latitude: locationData.location.lat
      })

      wx.setStorage({
        key: 'latitude',
        data: locationData.address_component.city,
      })

      wx.setStorage({
        key: 'city',
        data: locationData.address_component.city,
      })
      var city = wx.getStorage({
        key: 'city',
        success: function (res) {
          that.setData({ city: res.data })
        },
      })
    })

    // 获取首页菜单
    var pageItems = [];
    var row = [];
    var len = homeUtil.PageItems.length;//重组PageItems 
    that.setData({
      muenus: homeUtil.PageItems
    })
    len = Math.floor((len + 2) / 3) * 3;
    for (var i = 0; i < len; i++) {
      
      if ((i + 1) % 3 == 0) {
        row.push(indexs.PageItems[i]);
        
        pageItems.push(row);
        row = [];
        continue;
      }
      else {
        row.push(indexs.PageItems[i]);
      }
    }
    wx.getSystemInfo({
      success: function (res) {
        var windowWidth = res.windowWidth;
        that.setData({
          cellHeight: (windowWidth / 3) + 'rpx'
        })
      },
      complete: function () {
        that.setData({
          muenus: pageItems
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;

    // var islogin = wx.getStorageSync('isLogin');
    // if (islogin != '1') {
    //   wx.navigateTo({
    //     url: '../login/login',
    //     success: function (res) {
    //     },
    //   })
    // }

    wx.getStorage({
      key: 'city',
      success: function (res) {
        that.setData({ city: res.data })
      },
    }),
      //获取昵称
      wx.getStorage({
        key: 'nickname',
        success: function (res) {
          that.setData({
            user_name: res.data
          })
        },
      })

    // 获取uid
    var nowuid = wx.getStorageSync('uid')
    that.setData({ userId: nowuid })

    
    // 自动定位获取地理位置
    homeUtil.getCityName(function (locationData) {

      homeUtil.updateLocation(locationData.location.lng, locationData.location.lat, nowuid);
      that.setData({
        longitude: locationData.location.lng,
        latitude: locationData.location.lat
      })

      wx.setStorage({
        key: 'latitude',
        data: locationData.address_component.city,
      })

      wx.setStorage({
        key: 'city',
        data: locationData.address_component.city,
      })
      var city = wx.getStorage({
        key: 'city',
        success: function (res) {
          that.setData({ city: res.data })
        },
      })
    })

    //获取通知消息
    var uid = wx.getStorage({
      key: 'uid',
      success: function(res) {
        noticeutil.getnotice(res.data, function (e) {
          if (e.data.code == '1') {
            for (var i = 0; i < e.data.content.length; i++) {
              e.data.content[i].send_time = new Date(parseInt(e.data.content[i].send_time)).toLocaleString('chinese', { hour12: false });
            }
            that.setData({
              noticecontent: e.data.content
            })
          }
        })
      },
    })
    
    // 获取用户open_id
    console.log('// 获取用户open_id');
    if ('0000' == that.data.open_id) {
      that.wxLogin();
    }
  },
  shihis: function () {
    var that = this;
    wx.getSetting({
      success: res => {
        console.log(res)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: data => {
              // 可以将 res 发送给后台解码出 unionId
              app.globalData.userInfo = data.userInfo;
              console.log(data.userInfo)

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              // if (this.userInfoReadyCallback) {
              //   this.userInfoReadyCallback(res)
              // }
            }
          })
        } else {
          that.setData({ showDaall: true })
        }
      }
    })
  },
  bindGetUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo;
    this.setData({ showDaall: false })
    this.wxLogin();
  },
  //点击按钮痰喘指定的hiddenmodalput弹出框  
  modalinput: function () {
    this.setData({
      hiddenmodalput: false
    })
  },
  //取消按钮  
  cancel: function () {
    this.setData({
      hiddenmodalput: true
    });
  },
  //确认  
  confirm: function () {
    if (this.data.phone.length != 11) {
        wx.showToast({
          title: '请输入正确的手机号',
        })
        return;
    }
    this.addEditWxUser('', this.data.nickName, this.data.avatarUrl, this.data.openId, this.data.phone)
    this.setData({
      hiddenmodalput: true
    })
  },
  phoneInput: function(e) {
    this.setData({
      phone: e.detail.value
    })
  }
})
