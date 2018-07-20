//keymarkets.js

//获取应用实例
var app = getApp();
var request = require('./util/datarequest.js');
var market_util = require('./util/utils.js');
var urlutil = require('../../utils/util.js');
Page({
  data:{
    goods: [],
    goodcode:null,
    categorylist:[],
    curindex:0,
    more_id:0,//更多里面的子项
    category: ['', '01','02',''],
    moreTab: [],
    tabTxt: [],//tab文案
    tab: [],
    len:0
  },
  onLoad:function(options){
    var self = this, tt = ['全部'], tb = [false], cg = [''], len=0;
    request.getgoodcategory(function (res) {
      for (var i = 0; i < res.data.content.length; i++) {
        res.data.content[i]['num'] = i
        if(i<2){
          tt.push(res.data.content[i].data_name);
          cg.push(res.data.content[i].data_code);
          tb.push(true);
        }
      }
      tt.push('更多'); cg.push(''); tb.push('true'); len = tb.length-1
      if (res.data.code == '1') {
        self.setData({
          categorylist: res.data.content,
          tab: tb,
          category:cg,
          tabTxt:tt,
          len:len
        })
      }
    })
    /*默认获取所有商品*/
    this.getGoodsData(null)
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
  },
  // 选项卡
  filterTab: function (e) {
    var self = this, data = [], index = e.currentTarget.dataset.index;
    for (var i = 0; i < this.data.tab.length;i++){
      data.push(true)
    }
    data[index] = !this.data.tab[index];
    // data[index] = false;
    this.setData({
      tab: data,
      // curindex: index
    })
    if (index != (this.data.category.length - 1)){
      this.getGoodsData(this.data.category[index])
    }else{
      // request.getgoodcategory(function (res) {
      //   for (var i = 0; i < res.data.content.length;i++){
      //     res.data.content[i]['num']=i
      //   }
      //   if (res.data.code == '1') {
      //     self.setData({
      //       categorylist: res.data.content,
      //     })
      //   }
      // })
    }
  },
  //筛选项点击操作
  filtercategory: function (e) {
    //数据筛选
    var self = this, num = e.currentTarget.dataset.cur, id = e.currentTarget.dataset.id, code = e.currentTarget.dataset.data_code, name = e.currentTarget.dataset.data_name, txt = e.currentTarget.dataset.txt, tabTxt = this.data.tabTxt;
    switch (e.currentTarget.dataset.index) {
      case (this.data.category.length - 1):
        // tabTxt[4] = txt;
        var tab = self.data.tab
        tab[self.data.len] = !tab[self.data.len]
        self.setData({
          page: 1,
          data: [],
          tab: tab,
          // tabTxt: tabTxt,
          more_id: num
        });
        break;
    }
    if (e.currentTarget.dataset.index == (this.data.category.length - 1)){
      self.getGoodsData(id);
    }
  },
  getGoodsData: function (goodcode){
    var that = this
    // 获取商品列表
    if (goodcode == null){
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
      request.getallgoods(goodcode, function (res) {
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
  }
})