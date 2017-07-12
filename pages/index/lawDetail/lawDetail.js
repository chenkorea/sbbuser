
//获取应用实例
var app = getApp()
Page({
  data: {
    detailObj: {},
    lawType: 1  // 1：法律法规  2：安防知识
  },
  onLoad: function (options) {
    console.log('onLoad')
    var that = this
    let item = JSON.parse(options.detail);
    that.setData({
      detailObj: item,
      lawType: options.lawType
    });
    if (options.lawType == 1) {
      wx.setNavigationBarTitle({
        title: '法律法规',
      })
    } else {
      wx.setNavigationBarTitle({
        title: '安防知识',
      })
    }
  }
})
