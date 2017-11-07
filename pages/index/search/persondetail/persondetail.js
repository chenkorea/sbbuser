
var Util = require('../../../../utils/address.js');
var weburl = require('../../../../utils/util.js');

//获取应用实例
var app = getApp()
Page({
  data: {
    imgUrls: [],
    imageWidth: wx.getSystemInfoSync().windowWidth,//图片宽度 
    indicatorDots: 3,
    name: '',
    phone: '',
    grade: '',
    servicetype: [],
    hidePhone:'',
    test:[
      'http://imge.kugou.com/stdmusic/20170423/20170423114015440967.jpg',
      'http://imge.kugou.com/stdmusic/20151218/20151218200608401755.jpg',
      'http://imge.kugou.com/stdmusic/20170423/20170423114015440967.jpg',
      'http://imge.kugou.com/stdmusic/20151218/20151218200608401755.jpg',
      'http://imge.kugou.com/stdmusic/20170423/20170423114015440967.jpg',
    ]
  },
  onLoad: function (info){
    var that = this;
    var tech_id = info.tech_id;
    if (tech_id) {
      // 查询
      that.gettechqual(tech_id);
    } else {
      // 显示
      var e = JSON.parse(info.infor)
      that.setData({
        name: e.name,
        phone: e.phone,
        grade: e.grade,
        servicetype: e.service_types,
        imgUrls: e.archives_url,
        hidePhone: e.phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1****$3")
      })
    }
  },
  preview: function (e) {
    var str = JSON.stringify(e)
    wx.previewImage({
      current: e.currentTarget.dataset.url,
      urls: this.data.imgUrls,
    })
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  gettechqual: function (tech_id) {
    var that = this;
    Util.gettechqual(function (data) {
      if (wx.hideLoading) {
        wx.hideLoading();
      }
      var code = data.data.code;
      if (code == "1") {
        var users = data.data.content;
        var shifu = users[0];
        var imgs = []
        if (shifu.archives_url != undefined){
          imgs = shifu.archives_url.split(",");
          for (var i = 0; i < imgs.length;i++){
            imgs[i] = (getApp().globalData.imageServerIp + imgs[i])
          }
        }

        if (shifu.service_types != undefined) {
          that.setData({
            servicetype: shifu.service_types.split(','),
          })
        }

        console.log(imgs);
        that.setData({
          name: shifu.name,
          phone: shifu.phone,
          grade: shifu.grade,
          imgUrls: imgs,
          hidePhone: shifu.phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1****$3")
        })
      }
    }, tech_id);
  },
  dialphone: function () {
    var that = this;
    wx.makePhoneCall({
      phoneNumber: that.data.phone,
    })
  }
})