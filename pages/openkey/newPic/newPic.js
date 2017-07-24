// newPic.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    selectPicAr: [],
    imageWidth: getApp().screenWidth / 4 - 10
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //将字符串转成json
    var picsStr = JSON.parse(options.picsStr);
    // console.log(picsStr);
    // var pics = JSON.parse(picsStr);
    picsStr[picsStr.length] = '../../images/plus.png';
    this.setData({ selectPicAr: picsStr });
  },
  /**
   * 选择图片
   */
  selectPic: function () {
    var that = this;
    wx.chooseImage({
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        var orgPics = that.data.selectPicAr;
        if (orgPics.length != 0) {
          orgPics.splice(orgPics.length-1, 1); // 删除最后一个
        }
        var pics = orgPics.concat(tempFilePaths);

        // 保存选择
        wx.setStorage({key: 'selectPics', data: pics,})

        pics[pics.length] = '../../images/plus.png';
        that.setData({ selectPicAr: pics });
      }
    })
  },
  deletePic: function (e) {
    var index = e.currentTarget.dataset.id;
    var typename = e.currentTarget.dataset.type;
    if (typename == 'del') {
      var pics = this.data.selectPicAr;
      for (var i = 0; i < pics.length; i++) {
        if (index == i) {
          pics.splice(index, 1);
        }
      }

      // 保存选择
      if (pics.length == 1) {
        wx.setStorage({ key: 'selectPics', data: [], })
      } else {
        wx.setStorage({ key: 'selectPics', data: pics, })
      }
      
      this.setData({ selectPicAr: pics });
    } else {
      return;
    }
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
      console.log('index=' + index + '  count=' + count);
      if (index == count - 1) {
        // 添加
        that.selectPic();
      } else {
        wx.previewImage({
          current: that.data.selectPicAr[index], // 当前显示图片的http链接
          urls: that.data.selectPicAr // 需要预览的图片http链接列表
        })
      }
    }
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