// pages/index/price/price.js

var Util = require('../../../utils/address.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    serviceAr1: [],
    serviceAr2: [],
    serviceAr3: [],
    serviceAr4: [],
    serviceAr5: [],
  },
  /**
     * 获取服务类型
     */
  getServiceType1: function (e) {
    var that = this;
    Util.getServiceType(function (data) {
      var code = data.data.code;
      if (code == "1") {
        that.setData({ serviceAr1: data.data.content });
      }
    }, '01');
  },
  getServiceType2: function (e) {
    var that = this;
    Util.getServiceType(function (data) {
      var code = data.data.code;
      if (code == "1") {
        that.setData({ serviceAr2: data.data.content });
      }
    }, '02');
  },
  getServiceType3: function (e) {
    var that = this;
    Util.getServiceType(function (data) {
      var code = data.data.code;
      if (code == "1") {
        that.setData({ serviceAr3: data.data.content });
      }
    }, '03');
  },
  getServiceType4: function (e) {
    var that = this;
    Util.getServiceType(function (data) {
      var code = data.data.code;
      if (code == "1") {
        that.setData({ serviceAr4: data.data.content });
      }
    }, '04');
  },
  getServiceType5: function (e) {
    var that = this;
    Util.getServiceType(function (data) {
      var code = data.data.code;
      if (code == "1") {
        that.setData({ serviceAr5: data.data.content });
      }
    }, '05');
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getServiceType1();
    this.getServiceType2();
    this.getServiceType3();
    this.getServiceType4();
    this.getServiceType5();
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