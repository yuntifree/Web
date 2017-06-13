var util = require('../../utils/util.js')

var app = getApp();
var tuid = app.globalData.tuid
var uid = app.globalData.uid
var token = app.globalData.token
var URL = app.globalData.reqUrl

//获取应用实例
var app = getApp()
Page({
  data: {
    inquiry: false,
    info: {
      phone:'',
      name: '',
      mcard: ''
    },
    tipMsg: '',
    tipShow: false,
    nameFocus: true,
    phoneFocus: false
  },
  //事件处理函数
  onLoad: function () {
    if (app.globalData.editPt.name) {
      var mcard = "info.mcard"
      this.setData({
        info: app.globalData.editPt,
        [mcard]: app.globalData.editPt.mcard ? app.globalData.editPt.mcard : ''
      })
    }
    console.log(JSON.stringify(this.data.info))
  },
  makeName: function(e){
    var name = "info.name"
    this.setData({
      [name]: e.detail.value
    })
  },
  makePhone: function(e){
    var phone = "info.phone"
    this.setData({
      [phone]: e.detail.value
    })
  },
  makeCard: function(e){
    var mcard = "info.mcard"
    this.setData({
      [mcard]: e.detail.value
    })
  },
  saveInfo: function() {
    var  _this = this;
    if (this.makeParam()) {
      var param = this.data.info;
      param.uid = uid;
      param.token = token;
      var action = 'add_patient_info';
      if (param.id) {
        action = 'mod_patient_info';
      }
      wx.request({
        url: URL + action,
        method: 'POST',
        data: {
          data: param
        },
        header: {
          'content-type': 'application/json'
        },
        success: function(res) {
          var resp = res.data;
          if (resp.errno === 0) {
            wx.navigateTo({
              url: '../patientinfo/patientinfo'
            })
          } else {
            _this.tip(resp.desc);
          }
        }
      })
    }
  },
  makeParam() {
    var ret = true;
    var phone = "info.phone";
    if (this.data.info.phone.length <=0) {
      this.tip('请输入联系电话');
      ret = false;
    } else if (!(util.checkTel(this.data.info.phone))) {
      this.tip('请输入正确的电话号码');
      this.setData({
        [phone]: '',
        phoneFocus: true
      })
      ret = false;
    }
    if (this.data.info.name.length <=0) {
      this.tip('请输入姓名');
      this.setData({
        nameFocus: true
      })
      ret = false;
    }
    return ret;
  },
  tip: function(val) {
    this.setData({
      tipMsg: val,
      tipShow: true
    })
    var _this = this;
    setTimeout(function() {
      _this.setData({
        tipMsg: '',
        tipShow: false
      })
    },1500)
  }
})
