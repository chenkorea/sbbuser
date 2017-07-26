//index.js
// 获取Util实例
var homeUtil = require('../../utils/home.js');
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    muenus:[],
    cellHeight: '120rpx',
    city:'',
    latitude:'',
    longitude:'',
    uid:'',
    user_name:'昵称',
    user_head:'http://img3.imgtn.bdimg.com/it/u=2733704563,565708946&fm=26&gp=0.jpg'
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  toNoticeDetailView: function () {
    wx.navigateTo({
      url: '../notice/notice'
    })
  },
  selectNewCity: function () {
    wx.navigateTo({
      url: '../switchcity/switchcity?city=' + this.data.city
    })
  },
  toMyOrderView: function () {
    wx.navigateTo({
      url: '../my/orderView/orderView?uid=' + this.data.uid + "&user_name=" + this.data.user_name
    })
  },
  onLoad: function () {

    // 获取uid
    wx.getStorage({
      key: 'uid',
      success: function (res) {
        that.setData({ uid: res.data })
      },
    })

    console.log('onLoad')

    var that = this
    var islogin = wx.getStorageSync('isLogin');
    if (islogin != '1') {
      wx.navigateTo({
        url: '../login/login',
        success: function (res) {
        },
      })
    }
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo,
        user_head: userInfo.avatarUrl == "" ? "http://img3.imgtn.bdimg.com/it/u=2733704563,565708946&fm=26&gp=0.jpg" : userInfo.avatarUrl
      })
    })
    // 自动定位获取地理位置
    homeUtil.getCityName(function (locationData) {

      homeUtil.updateLocation(locationData.location.lng, locationData.location.lat, that.data.uid);
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
        success: function(res) {
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
    wx.getStorage({
      key: 'city',
      success: function(res) {
        that.setData({ city: res.data})
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
    wx.getStorage({
      key: 'uid',
      success: function (res) {
        that.setData({ userId: res.data })
        
      },
    })
    console.log('onShow getCityName--->>lng:' + that.data.longitude + ', lat:' + that.data.latitude, ', uid:' + that.data.uid);

    // 自动定位获取地理位置
    homeUtil.getCityName(function (locationData) {

      homeUtil.updateLocation(locationData.location.lng, locationData.location.lat, that.data.uid);
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
  }
})
