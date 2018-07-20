// pages/my/mine/coupon/coupon.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    couponList:[],
    order_infor:{},
    is_f:true,
    is_able:'',
    isChange:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    if (options.order_infor != undefined){
      this.setData({
        order_infor: JSON.parse(options.order_infor)
      })
    }
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];  //上一个页面
    if (prevPage.__route__.indexOf('pages/my/orderView/orderNewView') != -1) {
      that.setData({ is_able:'1'});
      that.setData({is_f: false})
    }
    
    this.getHavCoupon();
   

  },


  getHavCoupon:function() {
    var that = this;
    wx.getStorage({
      key: 'uid',
      success: function (res) {
        wx.request({
          url: getApp().globalData.serverIp + 'userinfor/getUserCoupon', //
          data: {
            uid: res.data,
            is_able: that.data.is_able
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          method: 'POST',
          complete: function (e) {
            if (e.data.code == '1') {
              console.log(e.data.content);
              that.setData({
                couponList: e.data.content
              })
            }
          }
        })
      },
    })
  },

  onShow:function() {
    console.log("回来了", this.data.isChange);
    if (this.data.isChange) {
      this.getHavCoupon();
      this.setData({isChange:false});
    }
  },

  selcoupon:function(data){
    var that = this
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面
    var item = data.currentTarget.dataset.item
    if (prevPage.__route__.indexOf('pages/my/orderView/orderNewView') != -1){
      wx.showModal({
        title: '提示',
        content: '确定使用该卡券？',
        complete: function (res) {
          if (res.confirm) {
            prevPage.wxLogin(that.data.order_infor, item.coupon_type, ""+item.coupon_price, item.id);
            wx.navigateBack({

            })
          }
        }
      })
    } else {
      wx.previewImage({
        urls: ['https://www.gzwnks.com/sbb-web/upload/headericon/shoudanmianfei.jpg'],
      })
    }
  },

  goChoose:function () {
    console.log('ddsss')
    wx.navigateTo({
      url: './newcoupon/newcoupon',
    })
  }
})