// orderprocess.js
var Util = require('../../../utils/address.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userOrder: {},
    hasGuarantee:true,
    ordersProcess:[],
    userLocation: {},
    hideDelete: true
  },
  getUserOrdersProcess: function (orderId) {
    if (wx.showLoading) {
      wx.showLoading({ title: '数据加载中...', })
    }
    var that = this;
    
    Util.getUserOrdersProcess(function (data) {
      if (wx.hideLoading) {
        wx.hideLoading();
      }
      var code = data.data.code;
      if (code == "1") {
        that.setData({ ordersProcess: data.data.content })
      } else {
        // 失败
        that.setData({ ordersProcess: [] })
      }
    }, orderId);
  },
  toDetail: function () {
    var jsonStr = JSON.stringify(this.data.userOrder);
    wx.navigateTo({
      url: '../../my/myorder/myorder?jsonStr=' + jsonStr,
    })
  },
  toShiFuDetail: function () {
    var tech_id = this.data.userOrder.process_person_id;
    console.log('--------------')
    console.log(this.data.userOrder)
    console.log('--------------')
    wx.navigateTo({
      url: '../../index/search/persondetail/persondetail?tech_id=' + tech_id,
    })
  },
  getUserLocation: function (techid) {
    var that = this;

    Util.gettechlocation(function (data) {
      console.log(data);
      
      var code = data.data.code;
      if (code == "1") {
        var locations = data.data.content;
        if (locations && locations.length > 0) {
          var userLocation = locations[0];
          that.setData({ userLocation: userLocation })
        }
        
      } else {
        // 失败
        that.setData({ userLocation: {} })
      }
    }, techid);
  },
  /**
   * 显示技师位置地图
   */
  showLocation: function () {
    
    var latitude = this.data.userLocation.latitude;
    var longitude = this.data.userLocation.longitude;
    
    wx.openLocation({
      latitude: latitude,
      longitude: longitude,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var jsonStr = options.jsonStr;
    var userOrder = JSON.parse(jsonStr);
    if (typeof userOrder.guarantee === "undefined"
      || userOrder.guarantee == ""
      || typeof userOrder.guarantee_date_type === "undefined"
      || userOrder.guarantee_date_type == "") {
      this.setData({ hasGuarantee: false })
    }
    var deleteshow = false
    var stage = userOrder.process_stage;
    if ('06' == stage || '07' == stage || '08' == stage || '09' == stage){
      deleteshow = true
      this.setData({ hideDelete: true});
    } else {
      deleteshow = false
      this.setData({ hideDelete: false });
    }
    this.setData(
      {
       userOrder: userOrder,
       })

    this.getUserOrdersProcess(userOrder.id);

    var tech_id = this.data.userOrder.process_person_id;
    this.getUserLocation(tech_id);
  },

  /**
   * 取消订单
  */
  deleorder:function(){
    if (this.data.hideDelete){
      return
    }
    var that = this
    wx.showModal({
      title: '提示',
      content: '确定取消该订单吗?',
      success:function(res){
        if(res.confirm){
          Util.cancelOrders(that.data.userOrder.id, function (res) {
            if (res.data.code == '1') {

            // 订单取消成功，推送消息给师傅
              that.sendJPushMsg(that.data.userOrder.process_person_id, '09');

              wx.showModal({
                title: '提示',
                content: '订单取消成功',
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {
                    wx.navigateBack({

                    })
                  }
                }
              })
            } else if (res.data.code == '-1') {
              wx.showModal({
                title: '提示',
                content: res.data.errmsg,
                showCancel: false,
              })
            }
          });
        }
      }
    })

  },
  // 发送极光推送通知
  sendJPushMsg: function (user_id, status) {
    var that = this;
    wx.request({
      url: getApp().globalData.serverIp + 'openkey/sendJPushMsg',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        user_id: user_id,
        status: status
      },
      success: function (res) {
      }
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