
var util = require('../../../utils/util.js');
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
          wx.setStorage({
            key: 'is_vip',
            data: res.data.content[0].is_vip,
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
function getupdate(username, updatepw,callback) {
  wx.request({
    url: util.url + '/phone/userinfor/updatepasswd' , //
    data: {
      username: username,
      user_type:'1',
      passwd: updatepw,
    },
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    method: 'POST',
    success: function (res) {
      if (res.data.code == '1') {
        callback(res)
      }
    },
  })
}

//密码更新
function getreset(username, newpwd, oldpwd, usertype,callback) {
  wx.request({
    url: util.url + '/phone/userinfor/resetpasswd', //
    data: {
      username: username,
      newpwd: newpwd,
      oldpwd: oldpwd,
      usertype: usertype
    },
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    method: 'POST',
    success: function (res) {
      if (res.data.code == '1') {
        callback(res)
      }
    },
    fail(res) {
      wx.showModal({
        title: '提示',
        content: '密码找回异常...',
        showCancel: false
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
      wx.setStorage({
        key: 'phone',
        data: regname,
      });
      if (res.data.code == '1') {
        wx.showModal({
          title: '提示',
          content: '注册成功,请登录体验吧',
          showCancel:false,
          success:function(e){
            if(e.confirm){
              wx.navigateBack({

              })
            }
          }
        })
      } else if (res.data.code == '-1') {
        wx.showModal({
          title: '提示',
          content: '账号已经注册过了，请直接登录吧',
          success: function (e) {
            if (e.confirm) {
              wx.navigateBack({

              })
            }
          }
        })
      }
      
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
function getverifycode(phone, callback) {
  wx.request({
    url: util.url + '/phone/userinfor/getverifycode', //
    data: {
      phone: phone,
    },
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    method: 'POST',
    success: function (res) {
      if(res.data.code == '-1'){
        wx.showModal({
          title: '提示',
          content: res.data.errmsg,
          showCancel:false
        })
      }else{
        callback(res)
      }
    },
    fail(res) {
      wx.showToast({
        title: '获取验证码异常...',
        duration: 1500,
      })
    },
    complete: function (res){
    }
  })
}

//查询会员等级
function getuserlevel(uid, callback) {
  wx.request({
    url: util.url + '/phone/userinfor/getuserlevel', //
    data: {
      uid: uid,
    },
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    method: 'POST',
    success: function (res) {
      if (res.data.code == '1') {
        callback(res)
      }
    },
  })
}

module.exports = {
  getlogin: getlogin,
  getregist: getregist,
  getverifycode: getverifycode,
  getupdate: getupdate,
  getreset: getreset,
  getuserlevel: getuserlevel
} 