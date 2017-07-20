
var util = require('../../utils/util.js');
//登录接口
function getlogin(loginname,loginpw){
  wx.request({
    url: util.url + '/phone/userinfor/login?username='
    + loginname + '&passwd=' + loginpw, //
    // data: {
    //   username: '111111',
    //   passwd: '000000'
    // },
    header: {
      'content-type': 'application/json'
    },
    method: 'POST',
    success: function (res) {
      if (res.data.code == '1') {
        if (res.data.content.length > 0) {
          wx.setStorage({
            key: 'uid',
            data: res.data.content[0].id,
          });
          wx.setStorage({
            key: 'phone',
            data: res.data.content[0].phone,
          });
          wx.setStorage({
            key: 'isLogin',
            data: '1',
          });
        }
        wx.navigateBack({

        })
      } else if (res.data.code == '-1') {
        wx.showToast({
          title: '用户名或密码有误',
          duration: 1500,
        })
        wx.setStorage({
          key: 'isLogin',
          data: '0',
        });
      }
    },
    fail(res) {
      wx.showToast({
        title: '登录时异常,请重新登录',
        duration: 1500,
      })
      wx.setStorage({
        key: 'isLogin',
        data: '0',
      });
    }
  })
}

//密码更新
function getupdate(username,uid, updatepw) {
  wx.request({
    url: util.url + '/phone/userinfor/updatepasswd?username=' + username + '&uid='
    + uid + '&passwd=' + updatepw, //
    // data: {
    //   username: '111111',
    //   passwd: '000000'
    // },
    header: {
      'content-type': 'application/json'
    },
    method: 'POST',
    success: function (res) {
      if (res.data.code == '1') {
        wx.showToast({
          title: '密码更新成功,请返回登录体验吧',
          duration: 1500,
        })
        wx.navigateBack({

        })
      }
    },
    fail(res) {
      wx.showToast({
        title: '密码找回异常...',
        duration: 1500,
      })
    }

  })
}

//用户注册接口
function getregist(regname, regpw) {
  wx.request({
    url: util.url + '/phone/userinfor/reguser?username='
    + regname + '&passwd=' + regpw, //
    // data: {
    //   username: '111111',
    //   passwd: '000000'
    // },
    header: {
      'content-type': 'application/json'
    },
    method: 'POST',
    success: function (res) {
      if (res.data.code == '1') {
        wx.showToast({
          title: '注册成功,请登录体验吧',
          duration: 1500,
        })
      } else if (res.data.code == '-1') {
        wx.showToast({
          title: '账号已经注册过了，请直接登录吧',
          duration: 1500,
        })
      }
      wx.setStorage({
        key: 'phone',
        data: regname,
      });
      wx.navigateBack({

      })
    },
    fail(res) {
      wx.showToast({
        title: '注册失败...',
        duration: 1500,
      })
    }

  })
}

//获取验证码
function getverifycode(callback){
  wx.request({
    url: util.url + '/phone/userinfor/getverifycode', //
    // data: {
    //   username: '111111',
    //   passwd: '000000'
    // },
    header: {
      'content-type': 'application/json'
    },
    method: 'POST',
    success: function (res) {
      callback(res)
    },
    fail(res) {
      wx.showToast({
        title: '获取验证码异常...',
        duration: 1500,
      })
    }
  })
}

module.exports = {
  getlogin: getlogin,
  getregist: getregist,
  getverifycode: getverifycode,
  getupdate: getupdate
} 