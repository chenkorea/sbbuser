// pages/selectKeyType/selectKeyType.js
// 获取Util实例
var Util = require('../../../utils/address.js')
//获取应用实例
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addresses: []
  },
  toAddNewAddress: function() {
    wx.navigateTo({
      url: '../address/addAddr/addAddr',
    })
  },
  delAddress: function (e) {
    // 获取ID
    var id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '是否删除改服务地址',
      showCancel: true,
      cancelText: '取消',
      confirmText: '确定',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定' + id)
        } else {
          console.log('用户点击取消' + id)
        }
      }
    })
  },
  setDefAddress: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.showToast({
      title: '设置成功' + id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(Util.addresses);
    var that = this;
    that.setData({
      addresses: Util.addresses
    })
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