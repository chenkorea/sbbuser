//law.js

// 获取Util实例
var Util = require('../../../utils/selKeyType.js')

//获取应用实例
var app = getApp()
Page({
  data: {
    laws: [],
    lawType:1  // 1：法律法规
  },
  /**
   * 查询详细
   */
  lookDetailView: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    let str = JSON.stringify(that.data.laws[id-1]);
    if (id == '3') {
      wx.navigateTo({
        url: '../../index/price/price',
      })
    } else {
      wx.navigateTo({
        url: '../../index/lawDetail/lawDetail?&detail=' + str + '&lawType=' + that.data.lawType,
      })
    }
  },
  onLoad: function (options) {
    console.log('onLoad')
    var that = this;
    that.setData({
      laws: Util.laws,
      lawType: options.lawType
    })
    if (options.lawType == 1) {
      wx.setNavigationBarTitle({
        title: '关于我们',
      })
    }
  }
})
