// pages/login/userreg/userreg.js

var app = getApp();
var addressUtil = require('../../../utils/address.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickname: '',
    agreeBg: 'agree-un-btn',
    register_btn: 'register_un_btn',
    tips: '获取验证码',
    reg_verify_code: '',
    reg_true_code: '',
    reg_phone_num: '',
    reg_passwd: '',
    reg_passwd_confirm: '',
    isagree: false,
    can_click: true,
    second: 60
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取昵称
    console.log('getApp().globalData--', app.globalData.userInfo.nickName)
    if (app.globalData.userInfo != null) {
      this.setData({ nickname: app.globalData.userInfo.nickName })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
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
  bindlogin: function () {
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
        agreeBg: 'agree-en-btn'
      })
    } else {
      this.setData({
        agreeBg: 'agree-un-btn'
      })
    }
  },
  // 获取验证码
  getUserVerifyCode: function () {
    var that = this;
    var phone = that.data.reg_phone_num;
    if (phone.length != 11) {
      wx.showToast({
        title: '手机号不正确',
      })
      return;
    }
    if (that.data.can_click) {
      addressUtil.saveLog(phone, 'getverifycode-获取验证码-开始', 'newregister');
      wx.showLoading({
        title: '验证码获取中',
      })
      addressUtil.getuserverifycode(function (data) {
        if (wx.hideLoading) {
          wx.hideLoading();
        }
        var code = data.data.code;
        if (code == "1") {
          addressUtil.saveLog(phone, 'getverifycode-获取验证码-成功', 'newregister');
          that.setData({
            reg_true_code: data.data.content[0],
            can_click: false
          });
          that.countdown()

        } else if (code == "-1") {
          addressUtil.saveLog(phone, 'getverifycode-获取验证码-失败短信次数获取已达上限', 'newregister');
          wx.showToast({
            title: '当前短信次数获取已达上限，请稍后再试！',
          })
        } else {
          addressUtil.saveLog(phone, 'getverifycode-获取验证码-失败', 'newregister');
          wx.showToast({
            title: '获取验证码失败！',
          })
        }
      }, that.data.reg_phone_num);
    }
  },
  // 注册用户
  registerUser: function () {
    var that = this;
    var phone = that.data.reg_phone_num;
    
    if (that.data.isagree) {
      if (that.data.reg_passwd == '' || (that.data.reg_passwd.length < 6)) {
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
        // 开始注册
        that.localRegister();
      }
    } else {
      wx.showModal({
        title: '提示',
        content: '请先确认服务协议',
        showCancel: false
      })
    }
  },
  /**
   * 注册用户
   */
  localRegister: function () {
    var  that = this;
    var phone = that.data.reg_phone_num;
    addressUtil.saveLog(phone, 'getverifycode-用户注册-开始', 'newregister');
    wx.showLoading({
      title: '用户注册中',
    })
    addressUtil.registerUser(function (data) {
      if (wx.hideLoading) {
        wx.hideLoading();
      }
      var code = data.data.code;
      if (code == "1") {
        addressUtil.saveLog(phone, 'getverifycode-用户注册-成功', 'newregister');
        wx.setStorage({
          key: 'phone',
          data: phone,
        });
        wx.showModal({
          title: '提示',
          content: '注册成功,请登录体验吧',
          showCancel: false,
          success: function (e) {
            if (e.confirm) {
              wx.navigateBack({

              })
            }
          }
        })
        that.getUserYH();
      } else if (code == "-1") {
        addressUtil.saveLog(phone, 'getverifycode-用户注册用户已注册过-失败', 'newregister');
        
        wx.showModal({
          title: '提示',
          content: '用户已注册过,请登录体验吧',
          showCancel: false,
          success: function (e) {
            if (e.confirm) {
              wx.navigateBack({

              })
            }
          }
        })
      } else {
        addressUtil.saveLog(phone, 'getverifycode-用户注册-失败', 'newregister');
        wx.showToast({
          title: '用户注册失败！',
        })
      }
    }, that.data.reg_phone_num, that.data.reg_passwd, that.data.nickname);
  },
  /**
   * 注册优惠券
   */
  getUserYH: function () {
    var that = this;
    var phone = that.data.reg_phone_num;
    addressUtil.saveLog(phone, 'getverifycode-用户注册优惠券-开始', 'newregister');
    
    addressUtil.getUserFristCoupon(function (data) {
      var code = data.data.code;
      if (code == "1") {
        addressUtil.saveLog(phone, 'getverifycode-用户注册优惠券-成功', 'newregister');
        
      } else {
        addressUtil.saveLog(phone, 'getverifycode-用户注册优惠券-失败', 'newregister');
       
      }
    }, that.data.reg_phone_num);
  },
  /**
   * 倒计时
   */
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