
//获取应用实例
var app = getApp()
Page({
  data: {
    selectIndex: 0,
    times: '12:00'
  },
  changeSelectIndex: function (e) {
    var id = e.currentTarget.dataset.id;
    var that = this;
    if (id == 1) {
      that.setData({
        selectIndex: 0
      })
      wx.navigateBack({
        url: '../openkey/openley'
      })
    } else {
      that.setData({
        selectIndex: 1
      })
    }
  },
  //  点击时间组件确定事件  
  bindTimeChange: function (e) {
    
    this.setData({
      times: e.detail.value
    })
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

  }
})
