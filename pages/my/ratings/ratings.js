// ratings.js

var Util = require('../../../utils/address.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ratings: [
      { value: '满意', name: '01', checked: 'true' },
      { value: '一般', name: '02'},
      { value: '不满意', name: '03' }],
    rating:'',
    remark:'',
    dispatching_id:'',
    orderId:'',
    uid: '',
    uname:''
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.setData({ rating: e.detail.name});
  },
  toRating: function () {
    var that = this;
    var rema = that.data.remark;
    if ("" == rema) {
      rema = '服务很好！';      
    }
    var remaks = '1';
    if ('满意' == that.data.remark) {
      remaks = '1';
    } else if ('一般' == that.data.remark) {
      remaks = '2';
    } else if ('不满意' == that.data.remark) {
      remaks = '3';
    } else {
      remaks = '1';
    }

    console.log(that.data.uid + '----' + that.data.uname + '----' + that.data.orderId + '----' + that.data.dispatching_id + '----' + that.data.rating + '----' + remaks);
    wx.showLoading({
      title: '数据提交中...',
    })
    Util.addServiceComment(function (data) {
      wx.hideLoading();
      var code = data.data.code;
      if (code == "1") {
        wx.showToast({
          title: '提交成功',
        })
        wx.navigateBack({})
      } else {
        // 失败
        wx.showToast({
          title: '数据提交失败',
        })
      }
    }, that.data.uid, that.data.uname, that.data.orderId, that.data.dispatching_id, remaks, rema);
  },
  saveRemark: function (e) {
    var rema = e.detail.value;
    this.setData({ remark:rema})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ uid: options.uid})
    this.setData({ uname: options.uname })
    this.setData({ dispatching_id: options.dispatching_id })
    this.setData({ orderId: options.orderId })
    
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