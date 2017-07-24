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
  /**
   * 去支付
   */
  toPay: function () {
    // 时间戳
    var timestamp = '' + Date.parse(new Date()); 
    // 随机数
    var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    var nums = "";
    for (var i = 0; i < 32; i++) {
      var id = parseInt(Math.random() * 61);
      nums += chars[id];
    }

    var paySign = MD5Util.hexMD5("appId=wxd678efh567hg6787&nonceStr=5K8264ILTKCH16CQ2502SI8ZNMTM67VS&package=prepay_id=wx2017033010242291fcfe0db70013231072&signType=MD5&timeStamp=1490840662&key=qazwsxedcrfvtgbyhnujmikolp111111");

    wx.requestPayment({
      'timeStamp': timestamp,
      'nonceStr': nums,
      'package': 'prepay_id=2378621736721323721537612',
      'signType': 'MD5',
      'paySign': paySign,
      'total_fee': '0.01',
      'success': function (res) {
        wx.showModal({
          title: '',
          content: '支付成功',
        })
      },
      'fail': function (res) {
        wx.showModal({
          title: '支付失败',
          content: res,
        })
      }
    })
  },
  getNum:function (callback){  
    
    return nums;  
  }  
})
