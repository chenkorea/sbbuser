//addNote.js

//获取应用实例
var app = getApp()
Page({
  data: {
    remark: '请快一点来吧，我赶时间呢！'
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
  onHide: function () {

  },
  saveRemark: function (e) {
    var rema = e.detail.value;
    console.log(rema);
    if (rema.length == 0) {
      rema = this.data.remark;
    }
    wx.setStorage({
      key: 'remark',
      data: rema,
    })
  }
})
