var urluril = require('../../../../utils/util.js')


function gettechqual(callback){
  wx.request({
    url: urluril.url + '/phone/userinfor/gettechqual', //
    header: {
      'content-type': 'application/json'
    },
    method: 'POST',
    complete: function (e) {
      if (e.data.code == 1) {
        callback(e)
      } else {
        wx.showToast({
          title: '获取技师资质异常，请重新尝试',
        })
      }
    }
  })
}

function getallcompany(callback) {
  var remoteUrl = getApp().globalData.serverIp + "userinfor/getCompanyInfor";
  wx.request({
    url: remoteUrl,
    method: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    success: function (res) {
      console.log(res);
      callback(res);
    }
  })
}
module.exports = {
  gettechqual: gettechqual,
  getallcompany: getallcompany
}