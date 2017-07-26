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
      url: '../../my/myorder/myorder?jsonStr=' + jsonStr,
    })
  },
  /**
   * 去支付
   */
  toPay: function (e) {
    wx.showLoading({title: '数据提交中...',})
    var that = this;
    var orderId = e.currentTarget.dataset.id;
    var uname = this.data.user_name;
    var uid = this.data.uid;
    console.log(orderId);
    // 这个应该是支付成功之后调用的，现在是直接跳过支付默认支付成功
    Util.updateOrderPayStatus(function (data) {
      wx.hideLoading();
      var code = data.data.code;
      if (code == "1") {
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


    // // 时间戳
    // var timestamp = '' + Date.parse(new Date()); 
    // // 随机数
    // var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    // var nums = "";
    // for (var i = 0; i < 32; i++) {
    //   var id = parseInt(Math.random() * 61);
    //   nums += chars[id];
    // }

    // var paySign = MD5Util.hexMD5("appId=wxd678efh567hg6787&nonceStr=5K8264ILTKCH16CQ2502SI8ZNMTM67VS&package=prepay_id=wx2017033010242291fcfe0db70013231072&signType=MD5&timeStamp=1490840662&key=qazwsxedcrfvtgbyhnujmikolp111111");

    // wx.requestPayment({
    //   'timeStamp': timestamp,
    //   'nonceStr': nums,
    //   'package': 'prepay_id=2378621736721323721537612',
    //   'signType': 'MD5',
    //   'paySign': paySign,
    //   'total_fee': '0.01',
    //   'success': function (res) {
    //     wx.showModal({
    //       title: '',
    //       content: '支付成功',
    //     })
    //   },
    //   'fail': function (res) {
    //     wx.showModal({
    //       title: '支付失败',
    //       content: res,
    //     })
    //   }
    // })
  },
  /**
   * 获取微信登录
   */
  wxLogin: function () {
    var that = this;
    wx.login({
      success: function (res) {
        that.getOpenId(res.code);
      }
    });
  },
  /**
   * 获取openId
   */
  getOpenId: function () {
    var that = this;
    wx.request({
      url: 'https://www.see-source.com/weixinpay/GetOpenId',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {'code':code},
      success: function(res) {
        var openId = res.data.openid;
        that.xiadan(openId);
      }
    })
  },
  /**
   * 微信统一下单
   */
  xiadan: function (opendId) {
    var that = this;
    wx.request({
      url: '自己的服务器',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: { 'openid': openId },
      success: function (res) {
        var prepay_id = res.data.prepay_id;
        console.log("统一下单返回 prepay_id:" + prepay_id);
        that.sign(prepay_id);
      }
    })
  },
  getNum:function (callback){  
    
    return nums;  
  },  
  toRating: function (e) {
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
