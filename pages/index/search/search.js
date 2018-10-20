
// 获取Util实例
var datarequest = require('./util/datarequest.js');
var urlutil = require('../.././../utils/address.js');

//获取应用实例
var app = getApp()
Page({
  data: {
    inputValue: '',
    persons: [],
    showspersons: [],
    companys:[],
    showscompanys:[],
    hidePhones: [],
    is_show: false
  },
  bindKeyInput: function (e) {
    var searchVal = e.detail.value
    var that = this 
    this.setData({
      inputValue: searchVal,
      is_show:true
    })
  },
  onLoad: function () {
    var that = this
    that.getAllTecher();
    that.getallcompany()
  },
  getAllTecher: function () {
    var that = this
    datarequest.gettechqual(function (res) {
      var phones = [];
      if (res.data.code == '1') {
        for (var i = 0; i < res.data.content.length; i++) {
          res.data.content[i]['zz_type'] = 'tech'
          var urls = [];
          if (res.data.content[i].archives_url == undefined) {
            urls.push(urlutil.no_pic);
            res.data.content[i]['archives_url'] = urls
          } else {
            var url = res.data.content[i].archives_url.split(',');
            for (var j = 0; j < url.length; j++) {
              if (url[j] != '') {
                urls.push(urlutil.url + '/' + url[j])
              }
            }
            res.data.content[i].archives_url = urls
          }

          if (res.data.content[i].service_types != undefined){
            res.data.content[i].service_types = res.data.content[i].service_types.split(',')
          }
          phones[i] = res.data.content[i].phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1****$3")
        }
        that.setData({
          persons: res.data.content,
          hidePhones: phones
        })
      }
    })
  },
  getallcompany: function() {
    var that = this
    datarequest.getallcompany(function (res) {
      if (res.data.code == '1') {
        for (var j = 0; j < res.data.content.length; j++) {
          res.data.content[j]['zz_type'] = 'company'
        }  
        that.setData({
          companys: res.data.content
        })
      }else{
        wx.showModal({
          title: '提示',
          content: '获取公司列表异常',
          showCancel: false
        })
      }
    },)
  },
  cancelsearch:function(){
    // this.setData({
    //   showspersons: [],
    //   showscompanys: [],
    //   inputValue:''
    // })
    var searchVal = this.data.inputValue
    if (searchVal.length == 0) {
      this.setData({
        showspersons: [],
        showscompanys: [],
        is_show: false
      })
    } else {
      var personlist = []
      for (var i = 0; i < this.data.persons.length; i++) {
        var temp = this.data.persons[i]
        if ((temp.name != undefined && temp.name == searchVal)
          || (temp.phone != undefined && temp.phone == searchVal)) {
          if (temp.phone) {
            temp.phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1****$3")
          }
          personlist.push(temp);
        }
      }
      var companylist = []
      for (var i = 0; i < this.data.companys.length; i++) {
        var temp = this.data.companys[i]
        if ((temp.company_name != undefined && temp.company_name == searchVal)
          || (temp.fixed_phone != undefined && temp.fixed_phone == searchVal)) {
          companylist.push(temp);
        }
      }
      this.setData({
        showspersons: personlist,
        showscompanys: companylist,
      })
    }
  },
  gopersondetail:function(e){
    wx.navigateTo({
      url: './persondetail/persondetail?infor=' + JSON.stringify(e.currentTarget.dataset.item),
    })
  }

})
