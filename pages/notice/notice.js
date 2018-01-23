//index.js

//获取应用实例
var app = getApp();
var noticeutil = require('./util/datarequest.js');
Page({
  data: {
    noticecontent:[]
  },
  onLoad: function (e) {
    var that = this
    if (e.notice) {
      var res = JSON.parse(e.notice)
      that.setData({
        noticecontent: res
      })
    }
    
    //获取通知消息
    var uid = wx.getStorage({
      key: 'uid',
      success: function (res) {
        noticeutil.getnotice(res.data, function (e) {
          if (e.data.code == '1') {
            var results = e.data.content
            for (var i = 0; i < results.length; i++) {
              results[i].send_time = that.formateDateTime(results[i].send_time)
            }
            that.setData({
              noticecontent: results
            })
          }
        })
      },
    })
  },
  godetail:function(e){
    wx.navigateTo({
      url: './noticedetail/noticedetail?detail=' + JSON.stringify(e.currentTarget.dataset.detail),
    })
  },
  formateDateTime: function(timestamps) {
    var timestamp = parseInt(timestamps)
    var date = new Date()
    date.setTime(timestamp)
    var y = date.getFullYear()
    var m = date.getMonth() + 1
    m = m < 10 ? ('0' + m) : m
    var d = date.getDay()
    d = d < 10 ? ('0' + d) : d
    var h = date.getHours()
    h = h < 10 ? ('0' + h) : h
    var mintue = date.getMinutes()
    var second = date.getSeconds()
    mintue = mintue < 10 ? ('0' + mintue) : mintue
    second = second < 10 ? ('0' + second) : second
    return y + '-' + m + '-' + d + ' ' + h + ':' + mintue +  ':' + second
  }
})
