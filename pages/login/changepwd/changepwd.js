//index.js

//获取应用实例
var app = getApp();
var resetrequest = require('../util/datarequest.js');
Page({
  data: {
    titleText: '',
    newpwd:'',
    conformpwd:'',
    phone:'',
    uid:'',
    nickname:''
  },
  //事件处理函数
  bindViewTap: function () {
    if (this.data.newpwd.length < 6){
      wx.showToast({
        title: '登录密码不得少于六位',
      })
    } else if (this.data.newpwd != this.data.conformpwd) {
      wx.showToast({
        title: '两次填写的密码不一致',
      });
    }else{
      resetrequest.getupdate(this.data.phone, this.data.uid, this.data.conformpwd
        , this.data.nickname,function(res){
              if(res.data.code == '1'){
                wx.showToast({
                  title: '重置密码成功,请返回登录体验吧',
                })
                wx.setStorage({
                  key: 'isLogin',
                  data: '0',
                })
                wx.navigateBack({

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

    //获取昵称
    wx.getStorage({
      key: 'nickname',
      success: function (res) {
        that.setData({
          nickname: res.data
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
