Page({
  data: {
    imgUrls: [
      'http://www.quanjing.com/image/2016index/gryy1.jpg',
      'http://www.quanjing.com/image/2016index/gryy2.jpg',
      'http://www.quanjing.com/image/2016index/gryy3.jpg'
    ],
    imageWidth: wx.getSystemInfoSync().windowWidth,//图片宽度 
    indicatorDots: 3,
    name: '',
    phone: '',
    grade: '',
    servicetype: ''
  },
  onLoad: function (info){
    var e = JSON.parse(info.infor)
    console.log('onload---->' + JSON.stringify(e))
    this.setData({
      name: e.name,
      phone: e.phone,
      grade: e.grade,
      servicetype: e.service_types_str,
      imgUrls: e.archives_url
    })
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
  }
})