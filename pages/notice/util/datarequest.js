var urlutil = require('../../../utils/util.js');

//获取通知消息
function getnotice(uid,callback){
  wx.request({
    url: urlutil.url + '/phone/userinfor/getnotice', //
    data: {
      uid: uid
    },
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    method: 'POST',
    complete: function (e) {
      if (e.data.code == 1){
        callback(e)
      }else {
        wx.showModal({
          title: '提示',
          content: '获取通知信息异常，请重新尝试',
          showCancel:false
        })
      }
    }
  })
}

module.exports = {
  getnotice: getnotice
}