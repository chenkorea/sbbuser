// pages/my/mine/coupon/coupon.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    couponList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getStorage({
      key: 'uid',
      success: function (res) {
        wx.request({
          url: getApp().globalData.serverIp + 'userinfor/getUserCoupon', //
          data: {
            uid: res.data
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          method: 'POST',
          complete: function (e) {
            if (e.data.code == '1') {
              that.setData({
                couponList: e.data.content
              })
            }
          }
        })
      },
    })

  }
})