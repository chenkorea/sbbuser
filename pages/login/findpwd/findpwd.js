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
    animation: '',
    is_click: true,
    second:60,
    tips:'发送'
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
        that.setData({
          fogphone:res.data
        })
      },
    })
  },
  //获取验证码
  getcode: function () {
    var that = this;
    if (that.data.is_click) {
      if (!app.phoneRe.test(this.data.fogphone)) {
        wx.showToast({
          title: '手机号码格式有误',
        })
      } else {
        fogrequest.getverifycode(that.data.fogphone, function (res) {
          if (res.data.code == '1') {
            that.setData({
              verifycode: res.data.content[0],
              nextstep: 'next_en_btn'
            });

            // 倒计时60之前 
            that.setData({ is_click: false });
            // 倒计时60之后
            that.countdown()
          }
        })
      }
    }
    
  },
  //倒计时
  countdown:function () {
    var that = this
    var id = setInterval(function () {
      //定时执行的代码
      var second = that.data.second;
      if (second == 0){
        that.setData({
          second:60,
          is_click: true,
          tips:'发送'
        })
        clearInterval(id);//关闭定时器
      }else{
        second = second -1;
        that.setData({
          second: second,
          tips: second + '秒后再次获取'
        })
      }

    }, 1000);
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
