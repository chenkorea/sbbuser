
//获取应用实例
var app = getApp()
Page({
  data: {
    uid: '',
    userInfo: {},
    titleText: '',
    user_name: '昵称',
    user_head: 'http://img3.imgtn.bdimg.com/it/u=2733704563,565708946&fm=26&gp=0.jpg'
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo,
        user_head: userInfo.avatarUrl == "" ? "http://img3.imgtn.bdimg.com/it/u=2733704563,565708946&fm=26&gp=0.jpg" : userInfo.avatarUrl
      })
    })
    //获取昵称
    wx.getStorage({
      key: 'nickname',
      success: function (res) {
        that.setData({
          user_name: res.data
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
  tosetting: function () {
    wx.navigateTo({
      url: '../mine/updatepwd/updatepwd',
    })
  },
  toDialphone: function () {
    wx.makePhoneCall({
      phoneNumber: '4000851323',
      phoneNumber: '13037817127',
    })
  }
})
