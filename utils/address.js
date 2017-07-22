
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



module.exports = {
  getUserAddress: getUserAddress,
  addUserAddress: addUserAddress,
  updateUserAddress: updateUserAddress,
  deleteUserAddress: deleteUserAddress,
  getServiceType: getServiceType,
  createUserOrder: createUserOrder,
  getUserOrders: getUserOrders
} 