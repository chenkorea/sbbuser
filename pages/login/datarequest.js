
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
          wx.setStorage({
            key: 'isLogin',
            data: '1',
          });
          wx.setStorage({
            key: 'nickname',
            data: res.data.content[0].name,
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

//忘记密码
function getupdate(username, uid, updatepw, nickname, callback) {
  wx.request({
    url: util.url + '/phone/userinfor/updatepasswd' , //
    data: {
      username: username,
      uid: uid,
      passwd: updatepw,
      nickname: nickname
    },
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    method: 'POST',
    success: function (res) {
      if (res.data.code == '1') {
        callback(res)
        wx.showToast({
          title: '密码更新成功,请返回登录体验吧',
          duration: 1500,
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

//密码更新
function getreset(username, uid, newpwd, oldpwd, nickname,callback) {
  wx.request({
    url: util.url + '/phone/userinfor/resetpasswd', //
    data: {
      username: username,
      uid: uid,
      newpwd: newpwd,
      oldpwd: oldpwd,
      nickname: nickname
    },
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    method: 'POST',
    success: function (res) {
      if (res.data.code == '1') {
        callback(res)
        wx.showToast({
          title: '密码更新成功,请返回登录体验吧',
          duration: 1500,
        })
      } else if(res.data.code == '-1') {
        wx.showToast({
          title: '登录密码错误,请重新确认',
          duration: 1500,
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
function getregist(regname, regpw,nickname) {
  wx.request({
    url: util.url + '/phone/userinfor/reguser', //
    data: {
      username: regname,
      passwd: regpw,
      nickname: nickname
    },
    header: {
      'content-type': 'application/x-www-form-urlencoded'
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

//密码重置接口登录确认
function getconfirmlogin(loginname, loginpw,callback) {
  wx.request({
    url: util.url + '/phone/userinfor/login?username='
    + loginname + '&passwd=' + loginpw, //
    header: {
      'content-type': 'application/json'
    },
    method: 'POST',
    success: function (res) {
      if (res.data.code == '1') {
        callback(res);
      } else if (res.data.code == '-1') {
        wx.showToast({
          title: '用户名或密码有误',
          duration: 1500,
        })
      }
    },
    fail(res) {
      wx.showToast({
        title: '登录确认时异常,请重新确认',
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
  getupdate: getupdate,
  getreset: getreset
} 