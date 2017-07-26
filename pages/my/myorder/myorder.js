
//获取应用实例
var app = getApp()
Page({
  data: {
    titleText: '',
    userOrder: {},
    selectPicAr: [],
    imageWidth: getApp().screenWidth / 4 - 10
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  /**
   * 查看图片信息
   */
  seeMovieInfo: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.id;
    var typename = e.currentTarget.dataset.type;
    if (typename == 'open') {
      var count = that.data.selectPicAr.length;
      wx.previewImage({
        current: that.data.selectPicAr[index], // 当前显示图片的http链接
        urls: that.data.selectPicAr // 需要预览的图片http链接列表
      })
    }
  },
  onLoad: function (optains) {
    var jsonStr = optains.jsonStr;
    var userOrder = JSON.parse(jsonStr);
    
    var that = this
    that.setData({ userOrder: userOrder})

    var commFileVos = userOrder.commFileVos;
    var pics = [];
    for (var i = 0; i < commFileVos.length; i++) {
      pics[i] = getApp().globalData.imageServerIp + commFileVos[i].archives_url;
      console.log(getApp().globalData.imageServerIp + commFileVos[i].archives_url);
    }
    that.setData({ selectPicAr: pics })
  }
})
