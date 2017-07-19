//index.js

//获取应用实例
var app = getApp()
Page({
  data: {
    titleText: '',
    username:'',
    passwd:''
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../login/findpwd/findpwd'
    })
  },
  bindRegisterTap: function () {
    wx.navigateTo({
      url: '../login/register/register'
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
      wx.setStorage({
        key: 'isLogin',
        data: '1',
      }),
      wx.navigateBack({

      })
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
    console.log('onLoad')
    var that = this

  }
})
