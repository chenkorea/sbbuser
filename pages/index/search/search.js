
// 获取Util实例
var datarequest = require('./util/datarequest.js');
var urlutil = require('../.././../utils/util.js');

//获取应用实例
var app = getApp()
Page({
  data: {
    inputValue: '',
    persons: [],
    temp:[],
    hidePhones: [],
    is_show: false
  },
  bindKeyInput: function (e) {
    var that = this 
    this.setData({
      inputValue: e.detail.value,
      is_show:true
    })
    if (e.detail.value.length == 0){
      var temp = this.data.temp
      this.setData({
        persons: temp,
        is_show: false
      })
    }else{
      var temp = [];
      var phones = [];
      var persons = this.data.temp;
      for (var i = 0; i < persons.length; i++) {
        var name = persons[i].name
        
        if ((persons[i].name != undefined && persons[i].name.indexOf(e.detail.value)>=0)
          || (persons[i].phone != undefined && persons[i].phone.indexOf(e.detail.value) >= 0)){
          temp.push(persons[i]);
        }
      }
      console.log(phones);
      this.setData({
        persons: temp,
        hidePhones: phones
      })
    }
  },
  onLoad: function () {
    var that = this
    that.getAllTecher();
  },
  getAllTecher: function () {
    var that = this
    datarequest.gettechqual(function (res) {
      var phones = [];
      if (res.data.code == '1') {
        for (var i = 0; i < res.data.content.length; i++) {
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
          phones[i] = res.data.content[i].phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1****$3")
        }

        if (res.data.content.length > 0){
          that.setData({
            is_show: true
          })
        }

        that.setData({
          goods: res.data.content
        })

        that.setData({
          persons: res.data.content,
          temp: res.data.content,
          hidePhones: phones
        })
      }
    })
  },
  cancelsearch:function(){
    var temp = this.data.temp
    this.setData({
      persons: temp,
      inputValue:''
    })
  },
  gopersondetail:function(e){
    console.log('gopersondetail----->>' + JSON.stringify(e))
    wx.navigateTo({
      url: './persondetail/persondetail?infor=' + JSON.stringify(e.currentTarget.dataset.item),
    })
  }

})
