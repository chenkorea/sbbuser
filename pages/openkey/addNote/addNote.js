//addNote.js

//获取应用实例
var app = getApp()
Page({
  data: {
    remark: '轻快一点来吧，我赶时间呢！'
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    wx.getStorage({
      key: 'remark',
      success: function(res) {
        that.setData({ remark: res.data})
      },
    })
  },
  saveRemark: function (e) {
    var rema = e.detail.value;
    wx.setStorage({
      key: 'remark',
      data: rema,
    })
  }
})
