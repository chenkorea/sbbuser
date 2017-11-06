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
  /**
   * 选择地址
   */
  selectAddress: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    for (var i = 0; i < that.data.addresses.length; i++) {
      var data = that.data.addresses[i];
      console.log(data);
      if (id == data.id) {
        console.log(data.address);
        wx.setStorage({ key: 'selAddr', data: data, })
        wx.navigateBack({})
        break;
      }
    }
  },
  /**
   * 删除地址
   */
  delAddress: function (e) {
    
    var that = this;
    var id = e.currentTarget.dataset.id;
    
    // 获取ID
    var id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '是否删除该服务地址',
      showCancel: true,
      cancelText: '取消',
      confirmText: '确定',
      success: function (res) {
        if (res.confirm) {
          if (wx.showLoading) {
            wx.showLoading({ title: '正在删除...', })
          }
          Util.deleteUserAddress(function (data) {
            if (wx.hideLoading) {
              wx.hideLoading();
            }
            var code = data.data.code;
            if (code == "1") {
              
              // 上传数据成功
              wx.showToast({ title: '删除地址成功', });
              that.setData({ addresses: [] });
              that.getUserAddr();
            } else {
              wx.showToast({title: '删除地址失败！',})
            }
          }, id);
        } else {
          console.log('用户点击取消' + id)
        }
      }
    })
  },
  /**
   * 设置默认地址
   */
  setDefAddress: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    
    wx.getStorage({
      key: 'uid',
      success: function(res) {
        var uid = res.data;
        Util.updateUserAddress(function (data) {
          var code = data.data.code;
          if (code == "1") {
            // 上传数据成功
            wx.showToast({ title: '设置默认地址成功', });
            that.setData({ addresses: [] });
            that.getUserAddr();
          } else {
            wx.showToast({
              title: '设置地址失败！',
            })
          }
        }, uid, id);
      },
    })
  },
  /**
   * 获取用户服务地址
   */
  getUserAddr: function () {
    var that = this;
    wx.getStorage({
      key: 'uid',
      success: function (res) {
        var uid = res.data;
        // 获取地址列表
        Util.getUserAddress(function (data) {
          var code = data.data.code;
          if (code == "1") {
            // 获取成功
            that.setData({ addresses: data.data.content })
          } else {
            wx.showToast({
              title: '获取地址失败！',
            })
          }
        }, uid);
      },
    })
  },
  chooseLocationMap: function() {
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        that.setData({
          address: res,
          longitude: res.longitude,
          latitude: res.latitude
        })
        wx.setStorage({ key: 'selAddr', data: res, })
        wx.navigateBack({})
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserAddr();
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
    this.getUserAddr();
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