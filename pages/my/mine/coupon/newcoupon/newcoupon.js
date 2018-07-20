// pages/my/mine/coupon/coupon.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    couponList: [],
    order_infor: {},
    username:''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    if (options.order_infor != undefined) {
      this.setData({
        order_infor: JSON.parse(options.order_infor)
      })
    }
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];  //上一个页面
    that.setData({ username: wx.getStorageSync("nickname")});

    that.getNewCoupon();

  },


  getNewCoupon() {
    var that = this;
    wx.getStorage({
      key: 'uid',
      success: function (res) {
        wx.request({
          url: getApp().globalData.serverIp + 'userinfor/getUserCanCoupons', //
          data: {
            uid: res.data
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          method: 'POST',
          complete: function (e) {
            if (e.data.code == '1' || e.data.code == '2') {
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

  selcoupon: function (data) {
    var that = this
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面
    var item = data.currentTarget.dataset.item
    if (prevPage.__route__.indexOf('pages/my/orderView/orderNewView') != -1) {
      wx.showModal({
        title: '提示',
        content: '确定使用该卡券？',
        complete: function (res) {
          if (res.confirm) {
            prevPage.wxLogin(that.data.order_infor, item.coupon_type, "" + item.coupon_price, item.id);
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

  getCoupon: function (data) {
    var item = data.currentTarget.dataset.item;
    var that = this;
    wx.getStorage({
      key: 'uid',
      success: function (res) {
        console.log("this.usrdata=", JSON.stringify(this.usrdata));
        var obj = {};
        
        obj.parent_id = res.data;
        obj.operator_name = that.data.username;
        obj.operator_id = res.data;
        obj.stop_time = item.stop_time;
        obj.coupon_nam = item.coupon_name;
        obj.coupon_type = item.coupon_type;
        obj.coupon_price = item.coupon_price;
        console.log('obj=', JSON.stringify(obj));
        //提交
        that.commitGetCoupons(obj, item.id);
      },
    })
  },

  commitGetCoupons:function(obj, couponId){
    var that = this;
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面
    wx.request({
      url: getApp().globalData.serverIp + 'userinfor/commitGetCoupons', //
      data: {
        voStr: JSON.stringify(obj),
        couponId: couponId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      complete: function (e) {
        if (e.data.code == '1') {
          prevPage.setData({isChange:true});
          wx.showToast({
            title: '领取成功',
          })
          that.getNewCoupon();
        }
      }
    })
  },
})