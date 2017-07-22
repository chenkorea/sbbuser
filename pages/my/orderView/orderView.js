// 获取Util实例
var Util = require('../../../utils/address.js')

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
  onLoad: function () {
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
      process_status = "('01')";
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
  }
})
