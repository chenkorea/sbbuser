//app.js
App({
  onLaunch: function() {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  // 手机号正则表达式
  phoneRe: /^1[3-9]\d{9}$/i,
  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function(res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },

  globalData: {
    userInfo: null,
    serverIp:"https://www.gywnks.com/sbb-web/phone/",
    imageServerIp: "https://www.gywnks.com/sbb-web/"
    // serverIp: "http://106.14.217.147/sbb-web/phone/",
    // imageServerIp: "http://106.14.217.147/sbb-web/"
  }
})
