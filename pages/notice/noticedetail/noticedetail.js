
//获取应用实例
var app = getApp()
Page({
  data: {
    noticecontent: {},
  },
  onLoad: function (options) {
    console.log('onLoad')
    var that = this
    let item = JSON.parse(options.detail);
    that.setData({
      noticecontent: item
    });
  }
})
