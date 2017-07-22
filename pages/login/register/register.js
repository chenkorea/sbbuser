//index.js

//获取应用实例
var app = getApp();
var regrequest = require('../datarequest/datarequest.js');
Page({
  data: {
    titleText: '',
    regusername:'',
    regpasswd:'',
    nickname:'',
    regverifycode:'',
    isagree:false,
    agreeBg:'#43CD80',
    agreeBg:'agreeunselect',
    register_btn:'register_un_btn'
  },
  //事件处理函数
  bindViewTap: function () {
    var verifycode = '';
    var that = this;
    wx.getStorage({
      key: 'regverifycode',
      success: function(res) {
        verifycode = res.data;
      },
      fail: function(res) {},
      complete: function(res) {

        if (that.data.isagree) {
          if (that.data.regusername.length != 11) {
            wx.showToast({
              title: '手机号码格式有误',
              duration: 1500,
            })
          } else if (that.data.regpasswd.length < 6) {
            wx.showToast({
              title: '请设置至少六位登录密码',
              duration: 1500,
            })
          } else if (that.data.regverifycode != verifycode) {
            wx.showToast({
              title: '验证码错误',
              duration: 1500,
            })
          } else {
            regrequest.getregist(that.data.regusername, that.data.regpasswd, that.data.nickname);
          }
        } else {
          wx.showToast({
            title: '请先确认服务协议',
            duration: 1500,
          })
        }
      },
    });
    
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      that.setData({
        nickname: userInfo.nickName
      })
    })
  },
  getcode:function(){
    var that = this;
    if (this.data.regusername.length != 11){
      wx.showToast({
        title: '手机号码格式有误',
      })
    }else{
      regrequest.getverifycode(function (res){
        if (res.data.code == '1') {
          wx.setStorage({
            key: "regverifycode",
            data: res.data.content[0],
          });
          that.setData({
            regverifycode: res.data.content[0]
          });
        }
      })
    }
  },

  getregname: function (e) {
    this.setData({
      regusername: e.detail.value
    })
  },
  getregpasswd: function (e) {
    this.setData({
      regpasswd: e.detail.value
    })
  },
  getverifycode: function (e) {
    this.setData({
      regverifycode: e.detail.value
    })
  },
  chooseagree: function () {
    var isagree = this.data.isagree;
    isagree = !isagree;
    this.setData({
      isagree: isagree
    });
    if(isagree){
      this.setData({
        agreeBg:'agreeselect',
        register_btn:'register_en_btn'
      })
    }else{
      this.setData({
        agreeBg: 'agreeunselect',
        register_btn: 'register_un_btn'
      })
    }
  }
})
