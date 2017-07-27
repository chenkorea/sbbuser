
// 获取Util实例
var datarequest = require('./util/datarequest.js');
var urlutil = require('../.././../utils/util.js');

//获取应用实例
var app = getApp()
Page({
  data: {
    inputValue: '',
    persons: [],
    temp:[]
  },
  bindKeyInput: function (e) {
    var that = this 
    this.setData({
      inputValue: e.detail.value
    })
    if (e.detail.value.length == 0){
    var temp = this.data.temp
      this.setData({
        persons: temp
      })
    }else{
      var temp = [];
      var persons = this.data.temp;
      for (var i = 0; i < persons.length; i++) {
        var name = persons[i].name
        
        if ((persons[i].name != undefined && persons[i].name.indexOf(e.detail.value)>=0)
          || (persons[i].phone != undefined && persons[i].phone.indexOf(e.detail.value) >= 0)){
          temp.push(persons[i]);
        }
      }
      this.setData({
        persons: temp
      })
    }
  },
  onLoad: function () {
    var that = this
    datarequest.gettechqual(function (res){
      if (res.data.code == '1'){
        for (var i = 0; i < res.data.content.length; i++) {
            var urls = [];
            if (res.data.content[i].archives_url == undefined){
              urls.push(urlutil.no_pic);
              res.data.content[i]['archives_url'] = urls
            }else{
              var url = res.data.content[i].archives_url.split(',');
              for (var j = 0; j < url.length; j++) {
                if (url[j] != '') {
                  urls.push(urlutil.url + '/' + url[j])
                }
              }
              res.data.content[i].archives_url = urls
            }
          }
          that.setData({
            goods: res.data.content
          })
        that.setData({
          persons: res.data.content,
          temp: res.data.content
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
