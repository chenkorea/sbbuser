// selectPic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectPicAr:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //将字符串转成json
    var picsStr = JSON.parse(options.picsStr);
    // console.log(picsStr);
    // var pics = JSON.parse(picsStr);
    this.setData({ selectPicAr: picsStr});
  },
  /**
   * 选择图片
   */
  selectPic: function () {
    var that = this;
    wx.chooseImage({
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        that.setData({ selectPicAr: tempFilePaths });
        wx.setStorage({
          key: 'selectPics',
          data: tempFilePaths,
        })
        wx.uploadFile({
          url: getApp().globalData.serverIp + 'openkey/uploadFileToServer',
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'user': 'test'
          },
          success: function (res) {
            var data = res.data
            console.log(data);
            //do something
          }
        })
      }
    })
  },
  /**
   * 查看图片信息
   */
  seeMovieInfo: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.id;
    wx.previewImage({
      current: that.data.selectPicAr[index], // 当前显示图片的http链接
      urls: that.data.selectPicAr // 需要预览的图片http链接列表
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