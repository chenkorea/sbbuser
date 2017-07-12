//index.js

//获取应用实例
// fuwuType服务类型  0：开锁服务  1：换锁服务  2：报修服务  3：汽车解匙  4：民用解匙
var app = getApp()
Page({
  data: {
    titleAr: ['开锁服务', '换锁服务', '报修服务', '汽车解匙', '民用解匙'],  // 导航栏显示
    index: 0,       // 保修选择索引
    bxarray: ['保修期内', '保修期外'],  // 保修类型数据
    fdmindex: 0,   // 服务类别选择索引
    fdmarray: [],  // 服务类别数据
    fuwuType: 0,  // 服务类型
    isShowBx:0,   // 是否显示保修选择
    oneTypeTitle: '',   // 开锁类别title
    twoTypeTitle: ''   // 开锁图片title
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
    wx.chooseImage({
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        // wx.uploadFile({
        //   url: 'http://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
        //   filePath: tempFilePaths[0],
        //   name: 'file',
        //   formData: {
        //     'user': 'test'
        //   },
        //   success: function (res) {
        //     var data = res.data
        //     //do something
        //   }
        // })
      }
    })
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
  onLoad: function (options) {
    console.log('onLoad')
    // 获取传送过来的值
    var that = this;

    that.setData({
      fuwuType: options.fuwuType
    })

    // 是否显示保修期
    if (that.data.fuwuType == 2) {
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
    if (type == 0 || type == 1 || type == 2) {
       that.setData({
         fdmarray: ['防盗门锁', '汽车锁', '保险柜锁', '其他锁具']
       })
    } else if (type == 3) {
      that.setData({
        fdmarray: ['钥匙增加', '钥匙丢失', '折叠钥匙改装', '电池更换']
      })
    } else if (type == 4) {
      that.setData({
        fdmarray: ['配车库电动门钥匙', '配小区门禁卡']
      })
    }

    if (type == 0) {
      that.setData({
        oneTypeTitle: '开锁类别',
        twoTypeTitle: '开启锁具图片'
      })
    } else if (type == 1) {
      that.setData({
        oneTypeTitle: '换锁类别',
        twoTypeTitle: '更换锁具图片'
      })
    } else if (type == 2) {
      that.setData({
        oneTypeTitle: '保修锁具类别',
        twoTypeTitle: '保修锁具图片'
      })
    } else if (type == 3) {
      that.setData({
        oneTypeTitle: '服务类别',
        twoTypeTitle: '钥匙车辆图片'
      })
    } else if (type == 4) {
      that.setData({
        oneTypeTitle: '服务类别',
        twoTypeTitle: '配置钥匙图片'
      })
    }

    // 设置标题
    wx.setNavigationBarTitle({
      title: that.data.titleAr[that.data.fuwuType],
    })
  }
})
