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
    category:['','0101','0201','0102'],
    tabTxt:['全部','挂锁','电子锁','锁芯','更多'],//tab文案
    tab: [false, true, true, true, true]
  },
  onLoad:function(options){
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
    var self = this, data = [true, true, true, true, true], index = e.currentTarget.dataset.index;
    console.log("curindex:" + this.data.curindex + '----filterTab---' + index )
    data[index] = !this.data.tab[index];
    // data[index] = false;
    this.setData({
      tab: data,
      // curindex: index
    })
    if(index != 4){
      this.getGoodsData(this.data.category[index])
    }else{
      request.getgoodcategory(function (res) {
        for (var i = 0; i < res.data.content.length;i++){
          res.data.content[i]['num']=i
        }
        if (res.data.code == '1') {
          self.setData({
            categorylist: res.data.content,
          })
        }
      })
    }
  },
  //筛选项点击操作
  filtercategory: function (e) {
    //数据筛选
    var self = this, num = e.currentTarget.dataset.cur, id = e.currentTarget.dataset.id, code = e.currentTarget.dataset.data_code, name = e.currentTarget.dataset.data_name, txt = e.currentTarget.dataset.txt, tabTxt = this.data.tabTxt;
    switch (e.currentTarget.dataset.index) {
      case '4':
        // tabTxt[4] = txt;
        self.setData({
          page: 1,
          data: [],
          // tab: [true, true, true, true, false],
          // tabTxt: tabTxt,
          more_id: num
        });
        break;
    }
    if (e.currentTarget.dataset.index == '4'){
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