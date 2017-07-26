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
    orderstatus: '1',   // 待派工  2 开工  3待支付  4已完成
    bottomstatus: 1,  // 1 订单  2  积分  3 我的
    bottomone: 'bottomsel',
    bottomtwo: '',
    bottomthree: '',
    uid:'',
    userOrders: [],
    user_name:'昵称',
    user_head:'http://img3.imgtn.bdimg.com/it/u=2733704563,565708946&fm=26&gp=0.jpg'
  },
  //事件处理函数
  bindStatusViewTap: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    if (id == 1) {
      that.setData({ classone: 'selected', classtwo: '', classThree: '', classFour: '', orderstatus: '1'})
    } else if (id == 2) {
      that.setData({ classone: '', classtwo: 'selected', classThree: '', classFour: '', orderstatus: '2' })
    } else if (id == 3) {
      that.setData({ classone: '', classtwo: '', classThree: 'selected', classFour: '',orderstatus: '3' })
    } else if (id == 4) {
      that.setData({ classone: '', classtwo: '', classThree: '', classFour: 'selected',orderstatus: '4' })
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
 
  tosetting:function(){
    wx.navigateTo({
      url: '../mine/updatepwd/updatepwd',
    })
  },
  onLoad: function (options) {
    console.log('onLoad')
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

    wx.getStorage({
      key: 'uid',
      success: function(res) {
        that.setData({
          uid: res.data
        })
      },
    })

    console.log(that.data.uid + "--------" + that.data.orderstatus)
    that.getUserOrder(that.data.uid, that.data.orderstatus);

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
  getUserOrder: function(uid, status) {
    wx.showLoading({title: '数据加载中...',})
    var that = this;
    // 提交数据
    var process_status = '';
    if (status == '1') {
      process_status = "('01','02','03','04')";
    } else if (status == '2') {
      process_status = "('05')";
    } else if (status == '3') {
      process_status = "('06')";
    } else if (status == '4') {
      process_status = "('07', '08')";
    }
    Util.getUserOrders(function (data) {
      wx.hideLoading();
      var code = data.data.code;
      if (code == "1") {
        that.setData({ userOrders: data.data.content})
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
   * 去支付
   */
  toPay: function (e) {

    this.wxLogin(e);
    
  },
  /**
   * 获取微信登录
   */
  wxLogin: function (e) {
    wx.showLoading({ title: '启动微信支付中...', })
    var that = this;
    wx.login({
      success: function (res) {
        wx.hideLoading();
        console.log(res.code);
        that.getOpenId(res.code, e);
      }
    });
  },
  /**
   * 获取openId
   */
  getOpenId: function (code, e) {
    wx.showLoading({ title: '启动微信支付中...', })
    var that = this;
    // http://192.200.200.21:9000/sbb-web/phone/openkey/getWXopenId
    // code=013Bu1c00iFzsD1klvc00RS3c00Bu1ch
    wx.request({
      url: getApp().globalData.serverIp + 'openkey/getWXopenId',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: { code:code},
      success: function(res) {
        wx.hideLoading();
        var openIdStr = res.data.content[0];
        // "{"session_key":"WX39zL8sZsFPOu4ajGQ1pQ== ","expires_in":7200,"openid":"ov9Hv0PDYNOv- tdbSM7Nv2beapSk"}"
        var jsonObj = JSON.parse(openIdStr);
        console.log(jsonObj.openid);
        that.xiadan(jsonObj.openid, e);
      }
    })
  },
  /**
   * 微信统一下单
   */
  xiadan: function (opendId, e) {
    wx.showLoading({ title: '启动微信支付中...', })
    var orderId = e.currentTarget.dataset.id;
    var that = this;
    wx.request({
      url: getApp().globalData.serverIp + 'openkey/xiadan',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: { 'openid': opendId, 'orderId': orderId},
      success: function (res) {
        wx.hideLoading();
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
            that.sign(prepay_id, e);  
          }
        }
      }
    })
  },
  sign: function (prepay_id, e) {
    wx.showLoading({ title: '启动微信支付中...', })
    var that = this;
    wx.request({
      url: getApp().globalData.serverIp + 'openkey/sign',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: { prepay_id: prepay_id },
      success: function (res) {
        wx.hideLoading();
        var code = res.data.code;
        if (code == '1') {
          console.log(res.data.content[0].prepay_id);
          that.requestPayment(res.data.content[0].prepay_id, e);
        }
      }
    })
  },
  requestPayment: function (objj, e) {
    wx.showLoading({ title: '启动微信支付中...', })
    var that = this;
    var obj = JSON.parse(objj);
    wx.requestPayment({
      timeStamp: obj.timeStamp,
      nonceStr: obj.nonceStr,
      package: obj.package,
      signType: obj.signType,
      paySign: obj.paySign,
      success: function (res) {
        // 成功
        var orderId = e.currentTarget.dataset.id;
        var uname = this.data.user_name;
        var uid = this.data.uid;
        console.log(orderId);
        // 这个应该是支付成功之后调用的，现在是直接跳过支付默认支付成功
        Util.updateOrderPayStatus(function (data) {
          wx.hideLoading();
          var code = data.data.code;
          if (code == "1") {
            wx.showToast({title: '支付成功',})
            // 直接跳转到查询已完成的
            that.setData({ classone: '', classtwo: '', classThree: '', classFour: 'selected', orderstatus: '4' })
            // 查询已完成订单
            that.getUserOrder(that.data.uid, that.data.orderstatus);
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
  getNum:function (callback){  
    
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
