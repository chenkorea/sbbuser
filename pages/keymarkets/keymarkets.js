//keymarkets.js

//获取应用实例
var app = getApp();
var request = require('./util/datarequest.js');
var market_util = require('./util/utils.js');
var urlutil = require('../../utils/util.js');
Page({
  data:{
    goods: []
  },
  onLoad:function(options){
    var that = this
    console.log(',isnull:' + (options.cid == null));
    // 获取商品列表
    if (options.cid == null){
      request.getallgoods('', function (res) {
        if (res.data.code == '1') {
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
        }
      });
    }else{
      request.getallgoods(options.cid, function (res) {
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
          }
          that.setData({
            goods: res.data.content
          })
        }
      });
    }
    
    
  },
  chooseclsfy:function(){
    wx.redirectTo({
      url: './goodsclsfy/goodsclsfy',
    })
  },
  goodsdetail:function(e){
    wx.navigateTo({
      url: './goodsdetail/goodsdetail?infor=' + JSON.stringify(e.currentTarget.dataset.item),
    })
  }
})