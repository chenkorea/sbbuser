//index.js

//获取应用实例
var app = getApp();
var fogrequest = require('../../../login/util/datarequest.js');
Page({
  data: {
    titleText: '',
    fogpwd:'',
    fogphone:'',
    nextstep:'next_un_btn',
    verifycode:''
  },
  //事件处理函数
  bindViewTap: function () {
    var verifycode = '';
    var that = this;
    if (!app.phoneRe.test(that.fogphone)) {
      wx.showToast({
        title: '手机号码格式有误',
      })
    } else if (that.data.fogpwd.length < 6) {
      wx.showToast({
        title: '登录密码不得少于6位',
        duration: 1500,
      })
    } else {
      fogrequest.getconfirmlogin(this.data.fogphone, this.data.fogpwd,function(res){
        if (res.data.code == '1'){
          wx.redirectTo({
            url: '../updatepwd/updatepwd'
          })
        }
        
      });
      
    }
    // wx.getStorage({
    //   key: 'fogcode',
    //   success: function (res) {
    //     verifycode = res.data;
    //   },
    //   fail: function (res) { },
    //   complete: function (res) {
        
    //   },
    // });
   
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
    }else{
      this.setData({
        nextstep: 'next_un_btn'
      })
    }
  },

  getfogpwd: function (e) {
    this.setData({
      fogpwd: e.detail.value
    })
  },

  onShow: function (opntions) {
    var that = this;
    wx.getStorage({
      key: 'phone',
      success: function (res) {
        that.setData({ fogphone: res.data })
      },
      complete:function(res){
        if (app.phoneRe.test(that.data.fogphone)) {
          that.setData({
            nextstep: 'next_en_btn'
          })
        }
      }
    })
  }
})
