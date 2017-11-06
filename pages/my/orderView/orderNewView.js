// 获取Util实例
var Util = require('../../../utils/address.js')

var MD5Util = require('../../../utils/md5.js')

//获取应用实例
var app = getApp()
Page({
  data: {
    classone: 'selected',
    classtwo: '',
    classThree: '',
    classFour: '',
    orderstatus: '1',   // 1 当前订单  2 历史订单1
    bottomstatus: 1,  // 1 订单  2  积分  3 我的
    bottomone: 'bottomsel',
    bottomtwo: '',
    bottomthree: '',
    uid: '',
    userOrders: [],
    user_name: '昵称',
    user_head: 'http://img3.imgtn.bdimg.com/it/u=2733704563,565708946&fm=26&gp=0.jpg',
    status_cla: 'impoerta'
  },
  //事件处理函数
  bindStatusViewTap: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    if (id == 1) {
      that.setData({ classone: 'selected', classtwo: '', classThree: '', classFour: '', orderstatus: '1' })
    } else if (id == 2) {
      that.setData({ classone: '', classtwo: 'selected', classThree: '', classFour: '', orderstatus: '2' })
    }
    // 查询订单
    that.getUserOrder(that.data.uid, that.data.orderstatus);
  },
  bindBottomViewTap: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    if (id == 1) {
      that.setData({ bottomone: 'bottomsel', bottomtwo: '', bottomthree: '', bottomstatus: 1 })
    } else if (id == 2) {
      that.setData({ bottomone: '', bottomtwo: 'bottomsel', bottomthree: '', bottomstatus: 2 })
    } else if (id == 3) {
      that.setData({ bottomone: '', bottomtwo: '', bottomthree: 'bottomsel', bottomstatus: 3 })
    }
  },
  toJifen: function () {
    close
    wx.navigateTo({
      url: '../../my/score/score',
    })
  },

  tosetting: function () {
    wx.navigateTo({
      url: '../mine/updatepwd/updatepwd',
    })
  },
  onLoad: function (options) {
    console.log('onLoad')

    wx.getStorage({
      key: 'phone',
      success: function(res) {
        console.log("phone --------  " + res.data);

      },
    })

    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo,
        user_head: userInfo.avatarUrl == "" ? "http://img3.imgtn.bdimg.com/it/u=2733704563,565708946&fm=26&gp=0.jpg" : userInfo.avatarUrl
      })
    })
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
    that.setData({
      uid: options.uid
    })
    that.setData({
      user_name: options.user_name
    })

    wx.getStorage({
      key: 'uid',
      success: function (res) {
        that.setData({
          uid: res.data
        })
        that.getUserOrder(that.data.uid, that.data.orderstatus);
      },
    })

    console.log(that.data.uid + "--------" + that.data.orderstatus)
    

    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo,
        user_head: userInfo.avatarUrl == "" ? "http://img3.imgtn.bdimg.com/it/u=2733704563,565708946&fm=26&gp=0.jpg" : userInfo.avatarUrl
      })
    })
    //获取昵称
    wx.getStorage({
      key: 'nickname',
      success: function (res) {
        that.setData({
          user_name: res.data
        })
      },
    })

  },
  /**
   * 保存form_id
   */
  saveWXFormId: function (form_id, uid) {
    Util.saveWXFormId(function (data) {
      // 不做任何操作
    }, form_id, uid);
  },
  saveWXOrderFormId: function (form_id, order_id) {
    Util.saveWXOrderFormId(function (data) {
      // 不做任何操作
    }, form_id, order_id, "1");
  },
  getUserOrder: function (uid, status) {
    // wx.showLoading({
    //   title: '数据加载中...',
    // })
    // wx.showLoading({ title: '数据加载中...', })
    var that = this;
    // 提交数据
    var process_status = '';
    if (status == '1') {
      process_status = "('01','02','03','04','05','06')";
    } else if (status == '2') {
      process_status = "('07', '08')";
    }
    Util.getUserOrders(function (data) {
      // wx.hideLoading();
      var code = data.data.code;
      if (code == "1") {
        that.setData({ userOrders: data.data.content })
      } else {
        // 失败
        that.setData({ userOrders: [] })
      }
    }, uid, process_status);
  },
  getRealDate: function (callback) {
    return new Date(parseInt(nS) * 1000).toLocaleString().substr(0, 17)
  },
  toDetail: function (e) {
    var orderId = e.currentTarget.dataset.id;
    var userOrdserDe = {};
    for (var i = 0; i < this.data.userOrders.length; i++) {
      var userOrder = this.data.userOrders[i];
      var order_id = userOrder.id;
      if (order_id == orderId) {
        userOrdserDe = userOrder;
        break;
      }
    }
    var jsonStr = JSON.stringify(userOrdserDe);
    wx.navigateTo({
      url: '../../my/orderprocess/orderprocess?jsonStr=' + jsonStr,
    })
  },
  /**
   * 查询是否有卡券可使用
   *
  */
  getCoupon: function (e) {
    var that = this
    wx.request({
      url: getApp().globalData.serverIp + 'userinfor/getUserCoupon',
      data: {
        uid: this.data.uid,
        is_able:'1'
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      complete: function (res) {
        if (wx.hideLoading) {
          wx.hideLoading();
        }
        if (res.data.code == 1 && res.data.content.length>0){
          wx.showModal({
            title: '提示',
            content: '您有卡券可抵部分费用，使用卡券？',
            success: function (res) {
              if (res.confirm){
                wx.navigateTo({
                  url: '../mine/coupon/coupon?order_infor=' + JSON.stringify(e)
                })
              } else {
                that.wxLogin(e, "", 0,'');
              }
            }
          })
        } else {
          that.wxLogin(e,"",0,'');
        }
      }
    })
  },

  /**
   * 去支付
   */
  toPay: function (e) {
    this.getCoupon(e);
  },
  /**
   * 获取微信登录
   */
  wxLogin: function (e, coupon_type, coupon_price, coupon_id) {
    console.log('coupon_type:' + coupon_type + ', coupon_price:' + coupon_price)
    if (wx.showLoading) {
      wx.showLoading({ title: '启动微信支付中...', })
    }
    var that = this;
    wx.login({
      success: function (res) {
        if (wx.hideLoading) {
          wx.hideLoading();
        }
        console.log('code = ' + res.code);
        that.getOpenId(res.code, e, coupon_type, coupon_price, coupon_id);
      }
    });
  },
  /**
   * 获取openId
   */
  getOpenId: function (code, e, coupon_type, coupon_price, coupon_id) {
    if (wx.showLoading) {
      wx.showLoading({ title: '启动微信支付中...', })
    }
    var that = this;
    // http://192.200.200.21:9000/sbb-web/phone/openkey/getWXopenId
    // code=013Bu1c00iFzsD1klvc00RS3c00Bu1ch
    wx.request({
      url: getApp().globalData.serverIp + 'openkey/getWXopenId',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: { code: code },
      success: function (res) {
        if (wx.hideLoading) {
          wx.hideLoading();
        }
        console.log(res);
        var openIdStr = res.data.content[0];
        // "{"session_key":"WX39zL8sZsFPOu4ajGQ1pQ== ","expires_in":7200,"openid":"ov9Hv0PDYNOv- tdbSM7Nv2beapSk"}"
        var jsonObj = JSON.parse(openIdStr);
        console.log('open_id = ' + jsonObj.openid);
        that.xiadan(jsonObj.openid, e, coupon_type, coupon_price, coupon_id);
      }
    })
  },
  /**
   * 微信统一下单
   */
  xiadan: function (opendId, e, coupon_type, coupon_price, coupon_id) {
    if (wx.showLoading) {
      wx.showLoading({ title: '启动微信支付中...', })
    }
    var orderId = e.currentTarget.dataset.id;
    var that = this;
    wx.request({
      url: getApp().globalData.serverIp + 'openkey/xiadan',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: { 'openid': opendId, 'orderId': orderId, 'coupon_type': coupon_type, 'coupon_price': coupon_price },
      success: function (res) {
        if (wx.hideLoading) {
          wx.hideLoading();
        }
        var code = res.data.code;
        if (code == '1') {
          // 成功
          var prepay_id = res.data.content[0];
          if (prepay_id == null || '' == prepay_id) {
            wx.showToast({
              title: 'prepay_id获取失败',
            })
          } else {
            console.log('prepay_id == ' + prepay_id);
            that.sign(prepay_id, e,coupon_id);
          }
        }
      }
    })
  },
  sign: function (prepay_id, e,coupon_id) {
    if (wx.showLoading) {
      wx.showLoading({ title: '启动微信支付中...', })
    }
    var that = this;
    wx.request({
      url: getApp().globalData.serverIp + 'openkey/sign',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: { prepay_id: prepay_id },
      success: function (res) {
        if (wx.hideLoading) {
          wx.hideLoading();
        }
        var code = res.data.code;
        if (code == '1') {
          console.log(res.data.content[0].prepay_id);
          that.requestPayment(res.data.content[0].prepay_id, e,coupon_id);
        }
      }
    })
  },
  requestPayment: function (objj, e,coupon_id) {
    if (wx.showLoading) {
      wx.showLoading({ title: '启动微信支付中...', })
    }
    var that = this;
    var formId = e.detail.formId;
    var obj = JSON.parse(objj);

    var orderObj = e.currentTarget.dataset.item;
    
    wx.requestPayment({
      timeStamp: obj.timeStamp,
      nonceStr: obj.nonceStr,
      package: obj.package,
      signType: obj.signType,
      paySign: obj.paySign,
      success: function (res) {
        // 成功
        var orderId = e.currentTarget.dataset.id;
        var uname = that.data.user_name;
        var uid = that.data.uid;
        console.log(orderId);
        // 这个应该是支付成功之后调用的，现在是直接跳过支付默认支付成功
        Util.updateOrderPayStatus(function (data) {
          if (wx.hideLoading) {
            wx.hideLoading();
          }
          var code = data.data.code;
          if (code == "1") {
            wx.showToast({ title: '支付成功', })
            //更新卡券状态(使用过后不能被再次使用)
            that.updateCouponStatus(coupon_id)
            // 直接跳转到查询已完成的
            that.setData({ classone: '', classtwo: '', classThree: '', classFour: 'selected', orderstatus: '4' })
            // 查询已完成订单
            that.getUserOrder(that.data.uid, that.data.orderstatus);
            // 发送通知给师傅端
            that.sendMsgForStatus(orderId, '07', orderObj.process_person_id);

            //pay success update form_id
            that.saveWXFormId(formId, uid);

            that.saveWXOrderFormId(formId, orderId);
          } else {
            // 失败
            wx.showModal({
              title: '失败',
              content: '提交状态更新失败！',
              showCancel: false,
            })
          }
        }, uid, uname, orderId);
      },
      fail: function (res) {
        // 失败
        wx.showToast({ title: '支付失败', })
      }
    })
  },
  updateCouponStatus: function (coupon_id) {
    wx.request({
      url: getApp().globalData.serverIp + 'userinfor/updateCouponStatus',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        coupon_id: coupon_id,
      },
      complete: function (res) {
        // console.log(res)
      }
    })
  },
  sendMsgForStatus: function (orderId, status, jsId) {
    var that = this;
    wx.request({
      url: getApp().globalData.serverIp + 'openkey/sendMsgForStatus',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: { 
        orderId: orderId,
        status: status,
        jsId: jsId },
      success: function (res) {
      }
    })
  },
  getNum: function (callback) {

    return nums;
  },
  toRating: function (e) {
    var that = this;
    var orderId = e.currentTarget.dataset.id;
    var dispatching_id = e.currentTarget.dataset.dis;
    wx.navigateTo({
      url: '../../my/ratings/ratings?uid=' + this.data.uid + '&uname=' + this.data.user_name + '&dispatching_id=' + dispatching_id + '&orderId=' + orderId,
    })
  },
  onShow: function () {
    this.getUserOrder(this.data.uid, this.data.orderstatus);
  }
})
