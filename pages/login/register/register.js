//index.js

//获取应用实例
var app = getApp();
var regrequest = require('../util/datarequest.js');
Page({
  data: {
    titleText: '',
    regusername: '',
    name_icon: "../../images/phone_reg_nos.png",
    bold_name_line: 'bolder-un-line',
    regpasswd: '',
    pwd_icon: "../../images/key_pwd_nor.png",
    bold_pwd_line: 'bolder-un-line',
    conformpwd: '',
    cpwd_icon: "../../images/reconform_reg_nos.png",
    bold_cpwd_line: 'bolder-un-line',
    nickname:'',
    regverifycode: '',
    verifycode:'',
    verify_icon: '../../images/verify_reg_nos.png',
    bold_verify_line: 'bolder-un-line',
    isagree:false,
    agreeBg:'#FF7F24',
    agreeBg:'agreeunselect',
    register_btn:'reg_un_btn',
    tips: '获取验证码',
    is_click: true,
    second: 60,
  },
  //事件处理函数
  bindlogin:function(){
    wx.navigateBack({
      
    })
  },
  bindViewTap: function () {
    var that = this;
    if (that.data.isagree) {
      if (!app.phoneRe.test(that.data.regusername)) {
          wx.showToast({
            title: '手机号码格式有误',
            duration: 1500,
           })
      } else if (that.data.regpasswd.length < 6) {
          wx.showToast({
             title: '请设置至少六位登录密码',
             duration: 1500,
           })
      } else if (that.data.regpasswd != that.data.conformpwd) {
          wx.showToast({
            title: '两次输入的密码不一致',
             duration: 1500,
           })
      } else if (that.data.regverifycode != that.data.verifycode) {
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
    if (that.data.is_click){
      if (!app.phoneRe.test(this.data.regusername)) {
        wx.showToast({
          title: '手机号码格式有误',
        })
      } else {
        regrequest.getverifycode(that.data.regusername, function (res) {
          if (res.data.code == '1') {
            that.setData({
              verifycode: res.data.content[0],
              is_click: false
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
          is_click: true,
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
  getconformpasswd: function (e) {
    this.setData({
      conformpwd: e.detail.value
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
        register_btn:'reg_en_btn'
      })
    }else{
      this.setData({
        agreeBg: 'agreeunselect',
        register_btn: 'reg_un_btn'
      })
    }
  },
  bindnamefocus: function (e) {
    this.setData({
      bold_name_line: 'bolder-en-line',
      name_icon: "../../images/phone_reg_sel.png"
    })
  },
  bindnameblur: function (e) {
    this.setData({
      bold_name_line: 'bolder-un-line',
      name_icon: "../../images/phone_reg_nos.png"
    })
  },
  bindverifyfocus: function (e) {
    this.setData({
      bold_verify_line: 'bolder-en-line',
      verify_icon: '../../images/verify_reg_sel.png',
    })
  },
  bindverifyblur: function (e) {
    this.setData({
      bold_verify_line: 'bolder-un-line',
      verify_icon: '../../images/verify_reg_nos.png',
    })
  },
  bindpwdfocus: function (e) {
    this.setData({
      bold_pwd_line: 'bolder-en-line',
      pwd_icon: '../../images/key_pwd_sel.png',
    })
  },
  bindpwdblur: function (e) {
    this.setData({
      bold_pwd_line: 'bolder-un-line',
      pwd_icon: '../../images/key_pwd_nor.png',
    })
  },
  bindcpwdfocus: function (e) {
    this.setData({
      bold_cpwd_line: 'bolder-en-line',
      cpwd_icon: "../../images/reconform_reg_sel.png",
    })
  },
  bindcpwdblur: function (e) {
    this.setData({
      bold_cpwd_line: 'bolder-un-line',
      cpwd_icon: "../../images/reconform_reg_nos.png",
    })
  },
})
