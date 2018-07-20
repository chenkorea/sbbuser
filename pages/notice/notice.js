//index.js

//获取应用实例
var app = getApp();
var noticeutil = require('./util/datarequest.js');
Page({
  data: {
    // titleText: '锁具修理工国家职业标准',
    // contentText: '1.职业概况\n1.1 职业名称\n锁具修理工。\n1.2 职业定义\n从事锁具安装、修配和技术开启工作的人员。\n1.3 职业等级\n本职业共\n四个等级，分别为：初级（国家职业资格五级）、中级（国家职业资格四级）、高级（国家职业资格三级）、技师（国家职业资格二级）。\n1.4 职业环境\n室内、外，常温。\n1.5 职业能力特征\n具有正常的学习、表达和计算能力；手指、手臂灵活，动作协调。\n1.6 基本文化程度初中毕业。\n1.7 培训要求\n1.7.1 培训期限\n全日制职业学校教育，根据其培训目标和教学计划确定。晋级培训期限：初级不少于240标准学时；中级不少于200标准学时；高级不少于160标准学时;技师不少于120标准学时。\n 1.7.2 培训教师\n培训初级、中级的教师应具有本职业高级及以上职业资格证书或相关专业中级及以上专业技术职务任职资格；培训高级的教师应具有本职业资格证书或相关专业中级及以上专业技术职务任职资格；培训技师的教师应具有本职业技师职业资格证书3年以上或相关专业高级专业技术职务任职资格。\n    1.7.3 培训场地\n理论培训应在配有投影仪、电视机等教学设备的标准教室进行。实际操作培训场地应不少于40平方米，有相应的设备、仪器和必要的工具，通风条件良好、光线充足、安全设施完善。\n    1.8 鉴定要求\n1.8.1 适应对象\n从事或准备从事本职业的人员。\n    1.8.2 申报条件\n    ——初级（具备以下条件之一者）\n(1) 经本职业初级正规培训达规定标准学时数, 并取得结业证书。\n(2) 在本职业连续见习1年(含1年)以上。\n——中级（具备以下条件之一者）\n  (1) 取得本职业初级职业资格证书后，连续从事本职业3年以上，经本职业中级正规培训达规定标准学时数, 并取得结业证书。\n  (2) 取得本职业初级职业资格证书后，连续从事本职业工作5年以上。\n  (3) 连续从事本职业工作7年以上。\n  ——高级（具备以下条件之一者）\n  (1) 取得本职业中级职业资格证书后，连续从事本职业4年以上，经本职业高级正规培训达规定标准学时数, 并取得结业证书。\n   (2) 取得本职业中级职业资格证书后，连续从事本职业工作7年以上。\n  ——技师（具备以下条件之一者）\n  (1) 取得本职业高级职业资格证书后，连续从事本职业5年以上，经本职业技师正规培训达标准学时数, 并取得结业证书。\n  (2) 取得本职业高级职业资格证书后，连续从事本职业工作8年以上。',
    noticecontent: []
  },
  onLoad: function (e) {
    var that = this
    if (e.notice) {
      var res = JSON.parse(e.notice)
      that.setData({
        noticecontent: res
      })
    }

    //获取通知消息
    var uid = wx.getStorage({
      key: 'uid',
      success: function (res) {
        noticeutil.getnotice(res.data, function (e) {
          if (e.data.code == '1') {
            for (var i = 0; i < e.data.content.length; i++) {
              e.data.content[i].send_time = that.formatTime(new Date(e.data.content[i]
                .send_time))
            }
            console.log('e.data.content', e)
            that.setData({
              noticecontent: e.data.content
            })
          }
        })
      },
    })
  },
  godetail: function (e) {
    wx.navigateTo({
      url: './noticedetail/noticedetail?detail=' + JSON.stringify(e.currentTarget.dataset.detail),
    })
  },
  formatTime: function (date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()

    return [year, month, day].map(this.formatNumber).join('-') + ' ' + [hour, minute, second]
      .map(this.formatNumber).join(':')
  },
  //数据转化
  formatNumber: function (n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }
})
