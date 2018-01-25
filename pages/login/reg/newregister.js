// pages/login/reg/newregister.js
//获取应用实例
var app = getApp();
var regrequest = require('../util/datarequest.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickname:'',
    agreeBg: 'agree-un-btn',
    register_btn:'register_un_btn',
    tips:'获取验证码',
    reg_verify_code:'',
    reg_true_code:'',
    reg_phone_num: '',
    reg_passwd: '',
    reg_passwd_confirm: '',
    isagree:false,
    can_click:true,
    second:60
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取昵称
    console.log('getApp().globalData--', app.globalData.userInfo.nickName)
    if (app.globalData.userInfo != null){
      this.setData({ nickname: app.globalData.userInfo.nickName })
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },
  // 注册电话
  getregname: function (e) {
    this.setData({
      reg_phone_num: e.detail.value
    })
  },
  // 验证码
  getverifycode: function (e) {
    this.setData({
      reg_verify_code: e.detail.value
    })
  },
  // 密码
  getregpasswd: function (e) {
    this.setData({
      reg_passwd: e.detail.value
    })
  },
  // 确认密码
  getconformpasswd: function (e) {
    this.setData({
      reg_passwd_confirm: e.detail.value
    })
  },
  //前往登录
  bindlogin:function(){
    wx.redirectTo({
      url: '../login',
    })
  },
  chooseagree: function () {
    var isagree = this.data.isagree;
    isagree = !isagree;
    this.setData({
      isagree: isagree
    });
    if (isagree) {
      this.setData({
        agreeBg: 'agree-en-btn',
        register_btn: 'register_en_btn'
      })
    } else {
      this.setData({
        agreeBg: 'agree-un-btn',
        register_btn: 'register_un_btn'
      })
    }
  },
  //事件处理函数
  bindViewTap: function () {
    var that = this;
    if (that.data.isagree) {
      if (!app.phoneRe.test(that.data.reg_phone_num)) {
        wx.showModal({
          title: '提示',
          content: '手机号码格式有误',
          showCancel: false
        })
      } else if (that.data.reg_passwd=='' || (that.data.reg_passwd.length < 6)) {
        wx.showModal({
          title: '提示',
          content: '请设置至少六位登录密码',
          showCancel: false
        })
      } else if (that.data.reg_passwd != that.data.reg_passwd_confirm) {
        wx.showModal({
          title: '提示',
          content: '两次输入的密码不一致',
          showCancel: false
        })
      } else if (that.data.reg_verify_code == ''
        || that.data.reg_verify_code != that.data.reg_true_code) {
        wx.showModal({
          title: '提示',
          content: '验证码错误',
          showCancel: false
        })
      } else {
        regrequest.getregist(that.data.reg_phone_num, that.data.reg_passwd, that.data.nickname);
      }
    } else {
      wx.showModal({
        title: '提示',
        content: '请先确认服务协议',
        showCancel: false
      })
    }
  },
  getcode: function () {
    var that = this;
    if (this.data.can_click) {
      if (!app.phoneRe.test(that.data.reg_phone_num)) {
        wx.showModal({
          title: '提示',
          content: '手机号码格式有误',
          showCancel: false
        })
      } else {
        regrequest.getverifycode(that.data.reg_phone_num, function (res) {
          if (res.data.code == '1') {
            that.setData({
              reg_true_code: res.data.content[0],
              can_click: false
            });
            that.countdown()
          }
        })
      }
    }
  },
  //倒计时
  countdown: function () {
    var that = this
    var id = setInterval(function () {
      //定时执行的代码
      var second = that.data.second;
      if (second == 0) {
        that.setData({
          second: 60,
          can_click: true,
          tips: '获取验证码'
        })
        clearInterval(id);//关闭定时器
      } else {
        second = second - 1;
        that.setData({
          second: second,
          tips: second + '秒后再次获取'
        })
      }

    }, 1000);
  }
})