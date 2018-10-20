
var Util = require('../../../../utils/address.js');
var weburl = require('../../../../utils/util.js');

//获取应用实例
var app = getApp()
Page({
  data: {
    imgUrls: [],
    companyUrls:[],
    imageWidth: wx.getSystemInfoSync().windowWidth,//图片宽度 
    indicatorDots: 3,
    name: '',
    phone: '',
    grade: '',
    servicetype: [],
    hidePhone:'',
    company:{},
    zz_type:'tech',
    isRecord:false,
    test:[
      'http://imge.kugou.com/stdmusic/20170423/20170423114015440967.jpg',
      'http://imge.kugou.com/stdmusic/20151218/20151218200608401755.jpg',
      'http://imge.kugou.com/stdmusic/20170423/20170423114015440967.jpg',
      'http://imge.kugou.com/stdmusic/20151218/20151218200608401755.jpg',
      'http://imge.kugou.com/stdmusic/20170423/20170423114015440967.jpg',
    ]
  },
  onLoad: function (info) {
    var e = JSON.parse(info.infor)
    console.log('info....', e.zz_type)
    if (e.zz_type != undefined && e.zz_type == 'company'){
      this.setData({
        zz_type: 'company',
        isRecord:true
      })
      console.log(e.id,'e.ide.ide.ide.ide.ide.ide.ide.ide.ide.ide.id')
      this.getCompanyInfor(e.id)
    }else{
      var tech_id = e.tech_id;
      this.setData({
        zz_type: 'tech'
      })
      if (tech_id) {
        // 查询
        this.gettechqual(tech_id);
        this.getcompany(tech_id);
      } else {
        // 显示
        this.getcompany(e.id);
        this.gettechqual(e.id);
      }
    }
    
  },
  preview: function (e) {
    var str = JSON.stringify(e)
    wx.previewImage({
      current: e.currentTarget.dataset.url,
      urls: this.data.imgUrls,
    })
  },
  compreview: function (e) {
    var str = JSON.stringify(e)
    wx.previewImage({
      current: e.currentTarget.dataset.url,
      urls: this.data.companyUrls,
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
  //查看公司备案信息
  getCompanyInfor: function (company_id) {
    var that = this;
    Util.getCompanyInfor(function (data) {
      if (wx.hideLoading) {
        wx.hideLoading();
      }
      var code = data.data.code;
      if (code == "1") {
        var companys = data.data.content;
        var company = companys[0];
        var cimgs = []
        if (company.company_url != undefined) {
          cimgs = company.company_url.split(",");
          for (var i = 0; i < cimgs.length - 1; i++) {
            cimgs[i] = (getApp().globalData.imageServerIp + cimgs[i])
          }
        }
        that.setData({
          company: company,
          companyUrls: cimgs
        })
      }
    }, company_id);
  },
  getcompany: function (tech_id) {
    var that = this;
    Util.getcompany(function (data) {
      if (wx.hideLoading) {
        wx.hideLoading();
      }
      var code = data.data.code;
      if (code == "1") {
        var companys = data.data.content;
        var company = companys[0];
        var cimgs = []
        if (company.company_url != undefined) {
          cimgs = company.company_url.split(",");
          for (var i = 0; i < cimgs.length-1; i++) {
            cimgs[i] = (getApp().globalData.imageServerIp + cimgs[i])
          }
        }
        that.setData({
          company: company,
          companyUrls:cimgs,
          isRecord:true
        })
      }else{
        that.setData({
          isRecord: false,
        })
      }
    }, tech_id);
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
        console.log('shifu....', shifu.archives_url)
        if (shifu.archives_url != undefined) {
          imgs = shifu.archives_url.split(",");
          for (var i = 0; i < imgs.length; i++) {
            imgs[i] = (getApp().globalData.imageServerIp + imgs[i])
          }
        }

        if (shifu.service_types != undefined) {
          that.setData({
            servicetype: shifu.service_types.split(','),
          })
        }

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