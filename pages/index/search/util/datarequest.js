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
module.exports = {
  gettechqual: gettechqual
}