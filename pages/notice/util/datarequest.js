var urlutil = require('../../../utils/util.js');

//获取通知消息
function getnotice(callback){
  wx.request({
    url: urlutil.url + '/phone/userinfor/getnotice', //
    header: {
      'content-type': 'application/json'
    },
    method: 'POST',
    complete: function (e) {
      console.log('++++getnotice complete+++' + JSON.stringify(e))
      if (e.data.code == 1){
        callback(e)
      }else {
        wx.showToast({
          title: '获取通知信息异常，请重新尝试',
        })
      }
    }
  })
}

module.exports = {
  getnotice: getnotice
}