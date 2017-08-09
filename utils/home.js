var urlutil = require('./util.js');
var PageItems =
  [
    {
      id: '1',
      text: '开锁服务',
      icon: 'iconfont icon-yaochi',
      bac: 'top-icon',
      url: '../openkey/openkey?fuwuType=01',
      imagepath: '../images/unlock.png'
    },
    {
      id: '2',
      text: '换锁服务',
      icon: 'iconfont icon-suo',
      bac: 'top-icon',
      url: '../openkey/openkey?fuwuType=02',
      imagepath: '../images/lock-help.png'
    },
    {
      id: '3',
      text: '报修服务',
      icon: 'iconfont icon-dianhua',
      bac: 'top-icon',
      url: '../openkey/openkey?fuwuType=03',
      imagepath: '../images/online_support.png'
    },
    {
      id: '4',
      text: '锁具商城',
      icon: 'iconfont icon-gouwucheman',
      bac: 'mid-icon',
      url: '../keymarkets/keymarkets',
      imagepath: '../images/购物.png'
    },
    {
      id: '5',
      text: '汽车解匙',
      icon: 'iconfont icon-fahuo',
      bac: 'mid-icon',
      url: '../openkey/openkey?fuwuType=04',
      imagepath: '../images/CarRental.png'
    },
    {
      id: '6',
      text: '民用解匙',
      icon: 'iconfont icon-fangwuqiuzu',
      bac: 'mid-icon',
      url: '../openkey/openkey?fuwuType=05',
      imagepath: '../images/data_encryption.png'
    },
    {
      id: '7',
      text: '法律法规',
      icon: 'iconfont icon-boshimao',
      bac: 'bottom-icon',
      url: '../index/law/law?lawType=1',
      imagepath: '../images/CustomsOfficer.png'
    },
    {
      id: '8',
      text: '安防知识',
      icon: 'iconfont icon-icsaving48px',
      bac: 'bottom-icon',
      url: '../index/law/law?lawType=2',
      imagepath: '../images/rules.png'
    },
    {
      id: '9',
      text: '资质查询',
      icon: 'iconfont icon-chaxun',
      bac: 'bottom-icon',
      url: '../index/search/search',
      imagepath: '../images/diploma_2.png'
    }
  ];
  
  function getLocationInfo (callback) {
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        getLocationCityByLatLon(res.latitude, res.longitude, function(data) {
          callback(data);
        })
      }
    })
  }

  function getLocationCityByLatLon(lat, lon, callback) {
    var appkey = "NONBZ-2VT33-DOI3A-35PVY-CZ7M6-ZRBFR";
    // http://apis.map.qq.com/ws/geocoder/v1/?location=39.984154,116.307490&key=NONBZ-2VT33-DOI3A-35PVY-CZ7M6-ZRBFR
    var locationUrl = "https://apis.map.qq.com/ws/geocoder/v1/?location="+ lat + "," + lon +"&key=" + appkey;
    wx.request({
      url: locationUrl,
      success: function (res) {
        var locationData = res.data.result;
        callback(locationData);
      }
    });
  }

  function getCityName (callback) {
    getLocationInfo(function (data) {
      callback(data);
    })
  }

  function updateLocation(longitude, latitude,uid){
    wx.request({
      url: urlutil.url + '/phone/userinfor/recordcurloc', //
      data: {
        longitude: longitude,
        latitude: latitude,
        uid: uid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      complete:function(e){
        console.log('++++updateLocation complete+++' + JSON.stringify(e))
      }
    })
  }
module.exports = {
  PageItems: PageItems,
  getLocationInfo: getLocationInfo,
  getLocationCityByLatLon: getLocationCityByLatLon,
  getCityName: getCityName,
  updateLocation: updateLocation
} 
