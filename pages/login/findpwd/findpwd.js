//index.js

//获取应用实例
var app = getApp();
var fogrequest = require('../util/datarequest.js');
Page({
  data: {
    titleText: '',
    fogcode:'',
    verifycode:'',
    fogphone:'',
    nextstep:'next_un_btn',
    animation: ''
  },
  //事件处理函数
  bindViewTap: function () {
    var that = this;
    
    if (!app.phoneRe.test(that.data.fogphone)) {
      wx.showToast({
        title: '手机号码格式有误',
      })
    } else if (that.data.fogcode != that.data.verifycode){
          wx.showToast({
            title: '验证码错误',
            duration: 1500,
          })
    }else{
       wx.redirectTo({
        url: '../changepwd/changepwd?phone=' + that.data.fogphone
       })
    }
  },
  onLoad: function () {
    var that = this
    wx.getStorage({
      key: 'phone',
      success: function (res) {
        console.log('onLoad success: ' + JSON.stringify(res))
        that.setData({
          fogphone:res.data
        })
      },
    })
  },
  //获取验证码
  getcode: function () {
    var that = this;
    if (!app.phoneRe.test(this.data.fogphone)) {
      wx.showToast({
        title: '手机号码格式有误',
      })
    } else {
      fogrequest.getverifycode(that.data.fogphone,function (res) {
        if (res.data.code == '1') {
          that.setData({
            verifycode: res.data.content[0],
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
    if (app.phoneRe.test(this.data.fogphone)){
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
