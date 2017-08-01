
//获取应用实例
var app = getApp()
Page({
  data: {
    selectIndex: 0,
    times: '12:00',
    dates: '12:00'
  },
  changeSelectIndex: function (e) {
    var id = e.currentTarget.dataset.id;
    var that = this;
    if (id == 1) {
      that.setData({ selectIndex: 0 })
      wx.setStorage({ key: 'serviceTime', data: '马上', })
      wx.navigateBack({})
    } else {
      that.setData({
        selectIndex: 1
      })
    }
  },
  //  点击时间组件确定事件  
  bindTimeChange: function (e) {
    this.setData({times: e.detail.value})
    var conten = this.data.dates + ' ' + this.data.times;
    wx.setStorage({ key: 'serviceTime', data: conten, })
    // wx.navigateBack({})
  },
  bindDateChange: function (e) {
    this.setData({ dates: e.detail.value })
    var conten = this.data.dates + ' ' + this.data.times;
    wx.setStorage({ key: 'serviceTime', data: conten, })
    // wx.navigateBack({})
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
    var myDate = new Date();    
    var year = myDate.getFullYear();
    var month = myDate.getMonth();
    var day = myDate.getDay();

    var hour = myDate.getHours();
    var second = myDate.getSeconds();

    var dates = year + '-' + month + '-' + day;
    var times = hour + ':' + second;
    that.setData({ dates: dates})
    that.setData({ times: times })
  }
})
