//index.js

//获取应用实例
var app = getApp();
var loginrequest = require('./util/datarequest.js')
Page({
  data: {
    titleText: '',
    username:'',
    passwd:'',
    name_icon:'../images/head_account_nos.png',
    bold_name_line:'bolder-un-line',
    pwd_icon:'../images/key_pwd_nor.png',
    bold_name_line: 'bolder-un-line',
    bold_pwd_line: 'bolder-un-line',
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../login/findpwd/findpwd'
    })
  },
  bindRegisterTap: function () {
    // wx.navigateTo({
    //   url: '../login/reg/newregister'
    // })
    wx.navigateTo({
      url: '../login/userreg/userreg'
    })
  },
  loginTap: function () {
    if (this.data.username.length == 0) {
      wx.showToast({
        title: '请输入登录账号',
        duration: 1500,
      })
    } else if (this.data.passwd.length == 0) {
      wx.showToast({
        title: '请输入登录密码',
        duration: 1500,
      })
    } else {
      loginrequest.getlogin(this.data.username, this.data.passwd);
    }
  },
  getusername: function (e) {
    this.setData({
      username: e.detail.value
    })
  },
  getpasswd:function (e) {
    this.setData({
      passwd: e.detail.value
    })
  },
  onLoad: function () {
    var that = this
  },

  onShow:function(opntions){
    var that = this;
    wx.getStorage({
      key: 'phone',
      success: function(res) {
        that.setData({ username:res.data})
      },
    })
  },
  bindnamefocus: function (e) {
    this.setData({
      bold_name_line: 'bolder-en-line',
      name_icon: '../images/head_account_sel.png',
    })
  },
  bindnameblur: function (e) {
    this.setData({
      bold_name_line: 'bolder-un-line',
      name_icon: '../images/head_account_nos.png',
    })
  },
  bindpwdfocus: function (e) {
    this.setData({
      bold_pwd_line: 'bolder-en-line',
      pwd_icon: "../images/key_pwd_sel.png",
    })
  },
  bindpwdblur: function (e) {
    this.setData({
      bold_pwd_line: 'bolder-un-line',
      pwd_icon: "../images/key_pwd_nor.png",
    })
  },
})
