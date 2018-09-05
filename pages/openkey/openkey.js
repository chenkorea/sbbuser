//index.js
// 获取Util实例
var Util = require('../../utils/address.js')
var homeUtil = require('../../utils/home.js');

//获取应用实例
// fuwuType服务类型  01：开锁服务  02：换锁服务  03：报修服务  04：汽车解匙  05：民用解匙
var app = getApp()
Page({
  data: {
    titleAr: ['开锁服务', '换锁服务', '报修服务', '汽车钥匙', '民用钥匙'],  // 导航栏显示
    index: 0,       // 保修选择索引
    bxarray: ['保修期内', '保修期外'],  // 保修类型数据
    fdmindex: 0,   // 服务类别选择索引
    fdmarray: [],  // 服务类别数据
    fuwuType: '01',  // 服务类型
    isShowBx:0,   // 是否显示保修选择
    oneTypeTitle: '',   // 开锁类别title
    twoTypeTitle: '',   // 开锁图片dsdsdstitle
    address: {},
    serviceTime: '马上',
    remark:'',
    serviceAr: [],
    picnumStr: '点击上传',
    picnum: 0,
    filePaths: [],
    userId: '',
    uname: '',
    phone: '',
    longitude: '',
    latitude: '',
    showAddress:'',
    showRemark:'',
    updalodcount: 0,
    ableCity: [],
    city_name:''
  },
  /**
   * 监听普通picker选择器
   */
  listenerPickerSelected: function (e) {
    //改变index值，通过setData()方法重绘界面
    this.setData({
      index: e.detail.value
    });
  }, 
  listenerPickerFDMSelected: function (e) {
    //改变index值，通过setData()方法重绘界面
    this.setData({
      fdmindex: e.detail.value
    });
  }, 
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  // 选择锁的类型
  bindToKeyType: function () {
    wx.navigateTo({
      url: '../selectKeyType/selectKeyType',
    })
  },
  /**
  * 选择图片上传
  */
  selectPicAndUp: function () {
    
    var that = this;
    var pics = that.data.filePaths;
    //将json转成字符串
    let picsStr = JSON.stringify(pics);
    if (that.data.picnum != 0) {
      wx.navigateTo({
        url: '../openkey/newPic/newPic?picsStr=' + picsStr,
      })
    } else {
      wx.chooseImage({
        success: function (res) {
          var tempFilePaths = res.tempFilePaths
          that.setData({ filePaths: tempFilePaths});
          that.setData({ picnumStr: '已经选择' + tempFilePaths.length + '张图片' });
          that.setData({ picnum: tempFilePaths.length });
          
          // wx.uploadFile({
          //   url: getApp().globalData.serverIp + 'openkey/uploadFileToServer', //仅为示例，非真实的接口地址
          //   filePath: tempFilePaths[0],
          //   name: 'file',
          //   formData: {
          //     'user': 'test'
          //   },
          //   success: function (res) {
          //     var data = res.data
          //     console.log(data);
          //     //do something
          //   }
          // })
        }
      })
    }
  },
  /**
   * 选择服务地址
   */
  selectAddress: function () {
    wx.navigateTo({
      url: '../my/address/address',
    })
  },
  /**
   * 选择服务时间
   */
  selectTimeType: function () {
    wx.navigateTo({
      url: '../openkey/selectTimeType/selectTimeType',
    })
  },
  addNote: function () {
    wx.navigateTo({
      url: '../openkey/addNote/addNote',
    })
  },
  getAppAbleCity: function () {
    var that = this;
    Util.getAppAbleCity(function (data) {
      var code = data.data.code;
      if (code == "1") {

        // 订单生成成功，上传订单图片(获取订单ID)
        var ableCity = data.data.content;
        console.log(ableCity)
        that.setData({ ableCity: ableCity})
        console.log(that.data.ableCity)
      }
    });
  },
  isContains: function(str, substr) {
    return new RegExp(substr).test(str);
  },
  /**
   * 上传数据
   */
  saveData:function (e) {
    var that = this;
    var usersId = wx.getStorageSync('uid');
    that.convertDataUpload(e, usersId);
  },

  convertDataUpload: function (e, usersId) {
    var that = this;
    // 判断当前城市是否支持服务 取消区域限制
    // var is_able = false;

    // for (var i = 0; i < that.data.ableCity.length; i++) {
    //   var nowcity = that.data.ableCity[i];
    //   var city_name = nowcity.city;
    //   var city_able = nowcity.is_able;

    //   if (that.data.showAddress.indexOf(city_name) >= 0 && city_able == '1') {
    //     is_able = true;
    //     break;
    //   }
    // }
    // if (!is_able) {
    //   wx.showModal({
    //     title: '提示',
    //     content: '当前城市暂未开放服务！',
    //     showCancel: false
    //   })
    //   return;
    // }
    Util.saveLog(usersId, 'saveData-保存提交数据-开始', 'openkey');

    // 提交数据
    var fwindex = that.data.fdmindex;
    if (that.data.serviceAr != null && that.data.serviceAr.length > 0) {
      var service_item_id = that.data.serviceAr[fwindex].id;
    } else {
      wx.showModal({
        title: '提示',
        content: '请选择服务类别',
      })
      return;
    }

    var service_time = "01";
    if ("马上" != that.data.serviceTime) {
      service_time = "02";
    }
    // 保修期Index
    var fwtype = that.data.fuwuType;
    var guaran = "1";
    if (that.data.index != 0) {
      guaran = "2"
    }
    if (fwtype != '03') {
      guaran = '0'
    }
    if (that.data.address.address == undefined || "" == that.data.address.address || "undefined" == that.data.address.address) {
      wx.showModal({
        title: '提示',
        content: '请选择服务地址',
      })
      return;
    }
    if (wx.showLoading) {
      wx.showLoading({ title: '数据上传中...', })
    }

    // var uid = res.data;
    Util.saveLog(usersId, 'saveData-组合订单对象-开始', 'openkey');
    // 组合订单对象user_name: that.data.uname,
    var order = {
      user_id: usersId,
      user_name: that.data.uname,
      user_phone: that.data.phone,
      service_type: that.data.fuwuType,
      service_item_id: service_item_id,
      popedom_name: that.data.address.popedom,
      service_address: that.data.address.address,
      service_time: service_time,
      service_time_describe: that.data.serviceTime,
      guarantee_type: guaran,
      remarks: that.data.remark,
      order_type: '1'
    }

    Util.saveLog(usersId, 'saveData-提交订单数据-开始', 'openkey');
    // 提交数据
    Util.createUserOrder(function (data) {
      if (wx.hideLoading) {
        wx.hideLoading();
      }
      var code = data.data.code;
      if (code == "1") {
        Util.saveLog(usersId, 'saveData-提交订单数据-成功', 'openkey');
        // 订单生成成功，上传订单图片(获取订单ID)
        var orderID = data.data.content[0].id;
        that.uploadOrderPics(orderID);

        // 清空当前订单界面的数据
        wx.removeStorage({ key: 'remark', success: function (res) { }, })
        wx.removeStorage({ key: 'selectPics', success: function (res) { }, })
        wx.removeStorage({ key: 'serviceTime', success: function (res) { }, })

        that.saveWXOrderFormId(formId, orderID);
      } else {
        Util.saveLog(usersId, 'saveData-提交订单数据-失败', 'openkey');
        wx.showToast({
          title: '提交订单失败！',
        })
      }
    }, order);
    console.log(order);
    // 保存表单ID
    var formId = e.detail.formId;
    that.saveWXFormId(formId, usersId);
  },

  /**
   * 上传订单图片
   */
  uploadOrderPics: function (orderId) {
    var that = this;
    // 上传数据成功
    wx.showModal({
      title: '提交订单成功',
      content: '请稍等，将会有师傅和您联系！',
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          wx.navigateBack({
          })
        }
      }
    })
    
    var tempPics = this.data.filePaths;
    if (tempPics.length == 0) {
      if (wx.hideLoading) {
        wx.hideLoading();
      }
      
    } else {
      
      // header: { 'content-type': 'application/x-www-form-urlencoded' },
      var usersId = wx.getStorageSync('uid');
      Util.saveLog(usersId, 'saveData-保存图片数据-开始', 'openkey');

      for (var i = 0; i < tempPics.length; i++) {
        console.log(tempPics[i]);
        wx.uploadFile({
          url: getApp().globalData.serverIp + 'openkey/uploadMobileFile',
          filePath: tempPics[i],
          name: 'file',
          formData: {
            'file_type': encodeURI('5'),
            'parent_id': encodeURI(orderId)
          },
          header: { 'content-type': 'multipart/form-data' },
          success: function (res) {

            var alldata = {};
            alldata = JSON.parse(res.data);
            var code = alldata.code;

            console.log('上传成功了图片----------');
            // 成功
            that.setData({ updalodcount: that.data.updalodcount + 1 })
            if (that.data.updalodcount == that.data.filePaths.length) {
              that.setData({ updalodcount: 0 })
              

              var usersId = wx.getStorageSync('uid');
              Util.saveLog(usersId, 'saveData-保存图片数据-成功', 'openkey');
              
            }
          }
        })
      }
    }
  },
  /**
   * 保存form_id
   */
  saveWXFormId: function (form_id, uid) {
    Util.saveWXFormId(function (data) {
      // 不做任何操作
    }, form_id, uid);
  },

  saveWXOrderFormId: function (form_id, order_id) {
    Util.saveWXOrderFormId(function (data) {
      // 不做任何操作
    }, form_id, order_id, "1");
  },
  onLoad: function (options) {
    console.log('onLoad')
    // 获取传送过来的值
    var that = this;
    var phonesss = wx.getStorageSync('phone')
    if (phonesss == null || phonesss == undefined || phonesss == '') {
      // 不存在 需要绑定
      wx.navigateBack({
        
      })
      return;
    }

    // wx.removeStorage({
    //   key: 'selAddr',
    //   success: function(res) {},
    // })
    // wx.removeStorage({
    //   key: 'remark',
    //   success: function(res) {},
    // })
    // wx.removeStorage({
    //   key: 'serviceTime',
    //   success: function(res) {},
    // })
    // wx.removeStorage({
    //   key: 'selectPics',
    //   success: function (res) { },
    // })

    // 获取服务城市
    // that.getAppAbleCity();

    // 自动定位获取地理位置
    homeUtil.getCityName(function (locationData) {
      homeUtil.updateLocation(locationData.location.lng, locationData.location.lat, that.data.uid);
      console.log(locationData)
      that.setData({
        address: locationData,
        longitude: locationData.location.lng,
        latitude: locationData.location.lat,
        showAddress: locationData.address,
        city_name: locationData.address_component.city
      })
      
      if (locationData.address.length > 20) {
        that.setData({
          showAddress: locationData.address.substr(0, 20)
        })
      }
    })

    //获取昵称
    wx.getStorage({
      key: 'nickname',
      success: function (res) {
        that.setData({uname: res.data})
      },
    })

    // 获取uid
    wx.getStorage({
      key: 'uid',
      success: function (res) {
        that.setData({ userId: res.data })
      },
    })

    that.setData({
      fuwuType: options.fuwuType
    })

    // 查询服务列表
    that.getServiceType();

    // 是否显示保修期
    if (that.data.fuwuType == '03') {
      that.setData({
        isShowBx: 1
      })
    } else {
      that.setData({
        isShowBx: 0
      })
    }

    // 设置初始数据
    var type = that.data.fuwuType;

    if (type == '01') {
      that.setData({
        oneTypeTitle: '开锁类别',
        twoTypeTitle: '开启锁具图片'
      })
      wx.setNavigationBarTitle({ title: that.data.titleAr[0], })
    } else if (type == '02') {
      that.setData({
        oneTypeTitle: '换锁类别',
        twoTypeTitle: '更换锁具图片'
      })
      wx.setNavigationBarTitle({ title: that.data.titleAr[1], })
    } else if (type == '03') {
      that.setData({
        oneTypeTitle: '报修锁具类别',
        twoTypeTitle: '报修锁具图片'
      })
      wx.setNavigationBarTitle({ title: that.data.titleAr[2], })
    } else if (type == '04') {
      that.setData({
        oneTypeTitle: '服务类别',
        twoTypeTitle: '钥匙车辆图片'
      })
      wx.setNavigationBarTitle({ title: that.data.titleAr[3], })
    } else if (type == '05') {
      that.setData({
        oneTypeTitle: '服务类别',
        twoTypeTitle: '配置钥匙图片'
      })
      wx.setNavigationBarTitle({ title: that.data.titleAr[4], })
    }
    var userPhone = wx.getStorageSync('phone')
    that.setData({phone:userPhone})
  },
  onShow: function () {
    var that = this;
    // 地址
    wx.getStorage({
      key: 'selAddr',
      success: function(res) {
        console.log('地址-----------')
        console.log(res.data)
        console.log('地址-----------')
        var popedom = '' + res.data.popedom
        if ('undefined' == popedom) {
            popedom = ''
        }
        that.setData({ 
          address: res.data,
          showAddress: popedom + res.data.address,
          city_name: popedom + res.data.address
        })
        // city_name: locationData.address_component.city
        var adds = popedom + res.data.address
        if (adds.length > 20) {
          that.setData({
            showAddress: adds.substr(0, 20)
          })
        }
      },
    })
    // 服务时间
    wx.getStorage({
      key: 'serviceTime',
      success: function(res) {
        that.setData({ serviceTime: res.data})
      },
    })
    // 备注
    wx.getStorage({
      key: 'remark',
      success: function(res) {
        that.setData({ remark: res.data})

        if (res.data.length > 20) {
          that.setData({
            showRemark: res.data.substr(0, 20)
          })
        }
      },
    })
    // 选择图片
    wx.getStorage({
      key: 'selectPics',
      success: function(res) {
        that.setData({ filePaths: res.data })
        
        that.setData({ picnumStr: '已经选择' + res.data.length + '张图片' });
        that.setData({ picnum: res.data.length });
      },
    })
  },
  onUnload: function () {
    var that = this;
    that.setData({
      address: {},
      showAddress: '',
      city_name: ''
    })
  },
  /**
   * 获取服务类型
   */
  getServiceType: function (e) {
    var that = this;
    Util.getServiceType(function (data) {
      var code = data.data.code;
      if (code == "1") {
        var serAr = [];
        for (var i = 0; i < data.data.content.length; i++) {
          serAr[i] = data.data.content[i].service_item;
        }
        that.setData({ fdmarray: serAr});
        that.setData({ serviceAr: data.data.content });
      } else {
        wx.showToast({
          title: '获取服务类型失败！',
        })
      }
    }, that.data.fuwuType);
  },

  // 保存操作日志
  saveLog: function (phone, op_name, page_name) {
    app.request({
      url: "/phone/openkey/saveUserOpRecord",
      data: {
        user_id: phone,
        operate_name: op_name,
        page_name: page_name,
        user_type: '2'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      loading: false,
      successFn: function (res) {
      }, completeFn: function (res) {
      }
    })
  }
})
