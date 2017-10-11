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
    wx.request({
      url: getApp().globalData.serverIp + 'userinfor/getUserCoupon', //
      data:{
        uid:'404848c75f053701015f0537f2770000'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      complete: function (e) {
        console.log('complete----' + JSON.stringify(e))
        if (e.data.code == '1'){
          that.setData({
            couponList: e.data.content
          })
        }
      }
    })
  }
})