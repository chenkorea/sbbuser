
//获取应用实例
var app = getApp()
var Util = require('../../../utils/address.js')
Page({
  data: {
    titleText: '',
    userOrder: {},
    hasGuarantee:true,
    selectPicAr: [],
    imageWidth: getApp().screenWidth / 4 - 10,
    coment:{},
    allPrice:'0'
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  getUserOrderComment: function (dispatching_id) {
    if (wx.showLoading) {
      wx.showLoading({ title: '数据加载中...', })
    }
    var that = this;
    // 提交数据
    var process_status = '';
    Util.getUserOrderComment(function (data) {
      if (wx.hideLoading) {
        wx.hideLoading();
      }
      var code = data.data.code;
      if (code == "1") {
        that.setData({ coment: data.data.content[0] })
      }
    }, dispatching_id);
  },
  getUserOrderAllPrice: function (dispatching_id) {
    if (wx.showLoading) {
      wx.showLoading({ title: '数据加载中...', })
    }
    var that = this;
    // 提交数据
    var process_status = '';
    Util.getUserOrderAllPrice(function (data) {
      if (wx.hideLoading) {
        wx.hideLoading();
      }
      var code = data.data.code;
      if (code == "1") {
        console.log(data.data.content)
        that.setData({ allPrice: data.data.content[0] })
      }
    }, dispatching_id);
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
    if (typeof userOrder.guarantee === "undefined"
      || userOrder.guarantee == ""
      || typeof userOrder.guarantee_date_type === "undefined"
      || userOrder.guarantee_date_type == "") {
      this.setData({ hasGuarantee: false })
    }
    console.log('dispatching_id----' + JSON.stringify(userOrder));
    
    var that = this
    that.setData({ userOrder: userOrder})

    var commFileVos = userOrder.commFileVos;
    var pics = [];
    for (var i = 0; i < commFileVos.length; i++) {
      pics[i] = getApp().globalData.imageServerIp + commFileVos[i].archives_url;
      console.log(getApp().globalData.imageServerIp + commFileVos[i].archives_url);
    }
    that.setData({ selectPicAr: pics })
    var dispatching_id = userOrder.dispatching_id;
    that.getUserOrderComment(dispatching_id);
    that.getUserOrderAllPrice(dispatching_id);
  }
})
