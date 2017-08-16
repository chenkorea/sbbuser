// orderprocess.js
var Util = require('../../../utils/address.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userOrder: {},
    ordersProcess:[]
  },
  getUserOrdersProcess: function (orderId) {
    wx.showLoading({ title: '数据加载中...', })
    var that = this;
    
    Util.getUserOrdersProcess(function (data) {
      wx.hideLoading();
      var code = data.data.code;
      if (code == "1") {
        that.setData({ ordersProcess: data.data.content })
      } else {
        // 失败
        that.setData({ ordersProcess: [] })
      }
    }, orderId);
  },
  toDetail: function () {
    var jsonStr = JSON.stringify(this.data.userOrder);
    wx.navigateTo({
      url: '../../my/myorder/myorder?jsonStr=' + jsonStr,
    })
  },
  toShiFuDetail: function () {
    var tech_id = this.data.userOrder.process_person_id;
    wx.navigateTo({
      url: '../../index/search/persondetail/persondetail?tech_id=' + tech_id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var jsonStr = options.jsonStr;
    var userOrder = JSON.parse(jsonStr);
    this.setData({ userOrder: userOrder})

    this.getUserOrdersProcess(userOrder.id);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})