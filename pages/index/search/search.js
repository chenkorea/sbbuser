
// 获取Util实例
var homeUtil = require('../../../utils/selKeyType.js')

//获取应用实例
var app = getApp()
Page({
  data: {
    inputValue: '',
    persons: []
  },
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    that.setData({
      persons: homeUtil.persons
    })
  }
})
