//index.js

//获取应用实例
var app = getApp();
var updaterequest = require('../../../login/datarequest/datarequest.js');
Page({
  data: {
    titleText: '',
    oldpwd:'',
    newpwd:'',
    conformpwd:'',
    phone:'',
    uid:'',
    nickname:''
  },
  //事件处理函数
  bindViewTap: function () {
    if (this.data.oldpwd.length < 6){
      wx.showToast({
        title: '登录密码不得少于6位',
      })
    } else if (this.data.newpwd != this.data.conformpwd) {
      wx.showToast({
        title: '确认密码和新密码不一致',
      });
    } else if (this.data.newpwd.length < 6) {
      wx.showToast({
        title: '设置登录密码不得少于6位',
      });
    } else if (this.data.newpwd == this.data.oldpwd) {
      wx.showToast({
        title: '新设置的密码不能和原来的密码一样',
      });
    }else{
      updaterequest.getreset(this.data.phone, this.data.uid, this.data.conformpwd
        , this.data.oldpwd, this.data.nickname, function (res) {
          if(res.data.code == '1'){
            wx.showToast({
              title: '重置密码成功,请返回登录体验吧',
             })
             wx.setStorage({
              key: 'isLogin',
              data: '0',
             })
             wx.reLaunch({
               url:'../../../index/index'
             })
          }else{
             wx.showToast({
               title: '重置密码失败了',
            })
          }
         })

      
    }
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    wx.getStorage({
      key: 'phone',
      success: function(res) {
        that.setData({
          phone: res.data
        })
      },
    })
    wx.getStorage({
      key: 'uid',
      success: function (res) {
        that.setData({
          uid: res.data
        })
      },
    })
    //获取昵称
    wx.getStorage({
      key: 'nickname',
      success: function (res) {
        that.setData({
          nickname: res.data
        })
      },
    })
  },
  oldpwd: function (e) {
    this.setData({
      oldpwd: e.detail.value
    })
  },
  newpwd:function(e){
    this.setData({
      newpwd: e.detail.value
    })
  },
  conformpwd: function (e) {
    this.setData({
      conformpwd: e.detail.value
    })
  }
})
