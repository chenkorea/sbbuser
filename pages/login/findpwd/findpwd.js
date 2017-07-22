//index.js

//获取应用实例
var app = getApp();
var fogrequest = require('../datarequest/datarequest.js');
Page({
  data: {
    titleText: '',
    fogcode:'',
    fogphone:'',
    nextstep:'next_un_btn'
  },
  //事件处理函数
  bindViewTap: function () {
    var verifycode = '';
    var that = this;
    wx.getStorage({
      key: 'fogcode',
      success: function (res) {
        verifycode = res.data;
      },
      fail: function (res) { },
      complete: function (res) {
        if (that.fogphone.length != 11) {
          wx.showToast({
            title: '手机号码格式有误',
          })
        } else if (that.data.fogcode != verifycode){
          wx.showToast({
            title: '验证码错误',
            duration: 1500,
          })
        }else{
          wx.redirectTo({
            url: '../changepwd/changepwd'
          })
        }
      },
    });
   
  },
  onLoad: function () {
    var that = this
    wx.getStorage({
      key: 'phone',
      success: function (res) {
        console.log('onLoad success: ' + JSON.stringify(res))
        that.fogphone = res.data;
      },
    })
  },
  //获取验证码
  getcode: function () {
    var that = this;
    if (this.data.fogphone.length != 11) {
      wx.showToast({
        title: '手机号码格式有误',
      })
    } else {
      fogrequest.getverifycode(function (res) {
        if (res.data.code == '1') {
          wx.setStorage({
            key: "fogcode",
            data: res.data.content[0],
          });
          that.setData({
            fogcode: res.data.content[0],
            nextstep:'next_en_btn'
          });
        }
      })
    }
  },
  //验证码
  getfogcode: function(e) {
    this.setData({
      fogcode: e.detail.value
    })
  },
  //手机号
  getfogname: function (e) {
    this.setData({
      fogphone: e.detail.value
    })
    if (this.data.fogphone.length==11){
      this.setData({
        nextstep: 'next_en_btn'
      })
    }
  },

  onShow: function (opntions) {
    var that = this;
    wx.getStorage({
      key: 'phone',
      success: function (res) {
        that.setData({ fogphone: res.data })
      },
    })
  }
})
