
// 获取用户地址信息
function getUserAddress(callback, uid) {
  // http://192.200.200.21:9000/sbb-web/phone/openkey/getUserAddress
  var remoteUrl = getApp().globalData.serverIp + "openkey/getUserAddress?uid="+ uid;
  wx.request({
    url: remoteUrl,
    success: function (res) {
      console.log(res);
      callback(res);
    }
  })
}

// 保存用户地址信息
function addUserAddress(callback, uid, popedom, address, is_default) {
  // http://192.200.200.21:9000/sbb-web/phone/openkey/getUserAddress
  var remoteUrl = getApp().globalData.serverIp + "openkey/addUserAddress";
  // ?uid=" + uid + 
  // "&popedom=" + popedom + 
  // "&address=" + address +
  // "&is_default=" + is_default;"
  wx.request({
    url: remoteUrl,
    data: {
      uid: uid,
      popedom: popedom,
      address: address,
      is_default: is_default
    },
    method: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    success: function (res) {
      console.log(res);
      callback(res);
    }
  })
}

// 保存用户地址信息
function updateUserAddress(callback, uid, addressId) {
  // http://192.200.200.21:9000/sbb-web/phone/openkey/getUserAddress
  var remoteUrl = getApp().globalData.serverIp + "openkey/updateUserAddress";
  wx.request({
    url: remoteUrl,
    data: {
      uid: uid,
      addressId: addressId
    },
    method: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    success: function (res) {
      console.log(res);
      callback(res);
    }
  })
}

// 删除用户地址信息
function deleteUserAddress(callback, addressId) {
  // http://192.200.200.21:9000/sbb-web/phone/openkey/getUserAddress
  var remoteUrl = getApp().globalData.serverIp + "openkey/deleteUserAddress";
  wx.request({
    url: remoteUrl,
    data: {
      addressId: addressId
    },
    method: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    success: function (res) {
      console.log(res);
      callback(res);
    }
  })
}

// 获取服务类别信息
function getServiceType(callback, serviceType) {
  var remoteUrl = getApp().globalData.serverIp + "openkey/getServiceType";
  wx.request({
    url: remoteUrl,
    data: {
      serviceType: serviceType
    },
    method: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    success: function (res) {
      console.log(res);
      callback(res);
    }
  })
}


// 创建订单
function createUserOrder(callback, userOrder) {
  var remoteUrl = getApp().globalData.serverIp + "openkey/createUserOrder";
  wx.request({
    url: remoteUrl,
    data: userOrder,
    method: 'POST',
    header: { 'content-type': 'application/json' },
    success: function (res) {
      console.log(res);
      callback(res);
    }
  })
}

// 获取用户订单
function getUserOrders(callback, uid, status) {
  var remoteUrl = getApp().globalData.serverIp + "openkey/getUserOrders";
  wx.request({
    url: remoteUrl,
    data: {
      uid: uid,
      status: status
    },
    method: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    success: function (res) {
      console.log(res);
      callback(res);
    }
  })
}

// 用户支付订单更新状态
function updateOrderPayStatus(callback, uid, uname, orderId) {
  var remoteUrl = getApp().globalData.serverIp + "openkey/updateOrderPayStatus";
  wx.request({
    url: remoteUrl,
    data: {
      uid: uid,
      uname: uname,
      orderId: orderId
    },
    method: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    success: function (res) {
      console.log(res);
      callback(res);
    }
  })
}

// 评论
function addServiceComment(callback, uid, uname, orderId, dispatching_id, evaluate, content) {
  var remoteUrl = getApp().globalData.serverIp + "openkey/addServiceComment";
  wx.request({
    url: remoteUrl,
    data: {
      uid: uid,
      uname: uname,
      orderId: orderId,
      dispatching_id: dispatching_id,
      evaluate: evaluate,
      content: content
    },
    method: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    success: function (res) {
      console.log(res);
      callback(res);
    }
  })
}

function getUserOrdersProcess(callback, orderId) {
  var remoteUrl = getApp().globalData.serverIp + "openkey/getUserOrdersProcess";
  wx.request({
    url: remoteUrl,
    data: {
      orderid: orderId
    },
    method: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    success: function (res) {
      console.log(res);
      callback(res);
    }
  })
}

function getUserOrderComment(callback, dispatching_id) {
  var remoteUrl = getApp().globalData.serverIp + "openkey/getUserOrderComment";
  wx.request({
    url: remoteUrl,
    data: {
      dispatching_id: dispatching_id
    },
    method: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    success: function (res) {
      console.log(res);
      callback(res);
    }
  })
}


function getUserOrderAllPrice(callback, dispatching_id) {
  var remoteUrl = getApp().globalData.serverIp + "openkey/getUserOrderAllPrice";
  wx.request({
    url: remoteUrl,
    data: {
      dispatching_id: dispatching_id
    },
    method: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    success: function (res) {
      console.log(res);
      callback(res);
    }
  })
}

function gettechqual(callback, tech_id) {
  var remoteUrl = getApp().globalData.serverIp + "openkey/gettechqual";
  wx.request({
    url: remoteUrl,
    data: {
      tech_id: tech_id
    },
    method: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    success: function (res) {
      console.log(res);
      callback(res);
    }
  })
}

function getcompany(callback, tech_id) {
  var remoteUrl = getApp().globalData.serverIp + "userinfor/getCompanyInforByTech";
  wx.request({
    url: remoteUrl,
    data: {
      tech_id: tech_id
    },
    method: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    success: function (res) {
      console.log(res);
      callback(res);
    }
  })
}



/**
 * 获取技师位置
 */
function gettechlocation(callback, tech_id) {
  var remoteUrl = getApp().globalData.serverIp + "openkey/gettechlocation";
  wx.request({
    url: remoteUrl,
    data: {
      tech_id: tech_id
    },
    method: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    success: function (res) {
      console.log(res);
      callback(res);
    }
  })
}

/**
 * 保存微信表单ID
 */
function saveWXFormId(callback, form_id, uid) {
  var remoteUrl = getApp().globalData.serverIp + "openkey/saveWXFormId";
  wx.request({
    url: remoteUrl,
    data: {
      form_id: form_id,
      uid: uid
    },
    method: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    success: function (res) {
      console.log(res);
      callback(res);
    }
  })
}

function saveWXOrderFormId(callback, form_id, order_id, utype) {
  var remoteUrl = getApp().globalData.serverIp + "openkey/saveWXOrderFormId";
  wx.request({
    url: remoteUrl,
    data: {
      form_id: form_id,
      order_id: order_id,
      utype: utype
    },
    method: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    success: function (res) {
      console.log(res);
      callback(res);
    }
  })
}

function cancelOrders(order_id, callback) {
  var remoteUrl = getApp().globalData.serverIp + "userinfor/cancelOrder";

  wx.request({
    url: remoteUrl,
    data: {
      order_id: order_id,
    },
    method: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    success: function (res) {
      callback(res);
    }
  })
}

function getAppAbleCity(callback) {
  var remoteUrl = getApp().globalData.serverIp + "openkey/getAppAbleCity";

  wx.request({
    url: remoteUrl,
    method: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    success: function (res) {
      callback(res);
    }
  })
}

// 发送极光推送通知
function sendJPushMsg(user_id, status, callback) {
  var remoteUrl = getApp().globalData.serverIp + "openkey/sendJPushMsg";

  wx.request({
    url: remoteUrl,
    data: {
      user_id: user_id,
      status: status
    },
    method: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    success: function (res) {
      callback(res);
    }
  })
}


function saveLog(phone, op_name, page_name) {

  var remoteUrl = getApp().globalData.serverIp + "openkey/saveUserOpRecord";

  wx.request({
    url: remoteUrl,
    data: {
      user_id: phone,
      operate_name: op_name,
      page_name: page_name,
      user_type: '1'
    },
    method: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    success: function (res) {
    }
  })
}

//获取验证码
function getuserverifycode(callback, phone) {
  var remoteUrl = getApp().globalData.serverIp + "userinfor/getverifycode";
  wx.request({
    url: remoteUrl,
    data: {
      phone: phone
    },
    method: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    success: function (res) {
      console.log(res);
      callback(res);
    }
  })
}

//用户注册
function registerUser(callback, regname, regpw, nickname) {
  var remoteUrl = getApp().globalData.serverIp + "userinfor/reguser";
  wx.request({
    url: remoteUrl,
    data: {
      username: regname,
      passwd: regpw,
      nickname: nickname
    },
    method: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    success: function (res) {
      console.log(res);
      callback(res);
    }
  })
}

//用户注册优惠券
function getUserFristCoupon(callback, regname) {
  var remoteUrl = getApp().globalData.serverIp + "userinfor/getUserFristCoupon";
  wx.request({
    url: remoteUrl,
    data: {
      username: regname
    },
    method: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    success: function (res) {
      console.log(res);
      callback(res);
    }
  })
}

//用户注册优惠券
function getCompanyInfor(callback, company_id) {
  var remoteUrl = getApp().globalData.serverIp + "userinfor/getCompanyInfor";
  wx.request({
    url: remoteUrl,
    data: {
      company_id: company_id
    },
    method: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    success: function (res) {
      console.log(res);
      callback(res);
    }
  })
}



module.exports = {
  getUserAddress: getUserAddress,
  addUserAddress: addUserAddress,
  updateUserAddress: updateUserAddress,
  deleteUserAddress: deleteUserAddress,
  getServiceType: getServiceType,
  createUserOrder: createUserOrder,
  getUserOrders: getUserOrders,
  updateOrderPayStatus: updateOrderPayStatus,
  addServiceComment: addServiceComment,
  getUserOrdersProcess: getUserOrdersProcess,
  getUserOrderComment: getUserOrderComment,
  getUserOrderAllPrice: getUserOrderAllPrice,
  gettechqual: gettechqual,
  gettechlocation: gettechlocation,
  saveWXFormId: saveWXFormId,
  saveWXOrderFormId: saveWXOrderFormId,
  cancelOrders: cancelOrders,
  getAppAbleCity: getAppAbleCity,
  sendJPushMsg: sendJPushMsg,
  saveLog: saveLog,
  getuserverifycode: getuserverifycode,
  registerUser: registerUser,
  getUserFristCoupon: getUserFristCoupon,
  getcompany: getcompany,
  getCompanyInfor: getCompanyInfor
} 