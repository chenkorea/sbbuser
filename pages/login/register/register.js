//index.js

//获取应用实例
var app = getApp();
// var util = require('../../utils/util.js');
Page({
  data: {
    titleText: '',
    regusername:'',
    regpasswd:'',
    regverifycode:'',
    isagree:false,
    agreeBg:'#43CD80',
    agreeBg:'agreeunselect'
  },
  //事件处理函数
  bindViewTap: function () {
    if (this.data.isagree){
      if (this.data.regusername.length == 0){
        wx.showToast({
          title: '请输入手机号码',
          duration: 1500,
        })
      } else if (this.data.regpasswd.length == 0){
        wx.showToast({
          title: '请设置登录密码',
          duration: 1500,
        })
      } else if (this.data.regverifycode.length == 0){
        wx.showToast({
          title: '请输入验证码',
          duration: 1500,
        })
      }else{
        wx.request({
          url: '192.200.200.71:9000/sbb-web/phone/reg/reguser', //
          data: {
            username: this.data.regusername,
            passwd: this.data.regpasswd
          },
          header: {
            'content-type': 'application/json'
          },
          method:'POST',
          success: function (res) {
            console.log('success++++++++++++++++++++++++ + ' + JSON.stringify(res))
            wx.navigateBack({

            })
          },
          fail(res){
            console.log('fail++++++++++++++++++++++++ + ' + JSON.stringify(res))
          }

        })
        
      }
    }else{
      wx.showToast({
        title: '请先确认服务协议',
        duration: 1500,
      })
    }
    
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this

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
        agreeBg:'agreeselect'
      })
    }else{
      this.setData({
        agreeBg: 'agreeunselect'
      })
    }
  }
})
