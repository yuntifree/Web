var util = require('../../utils/util.js')

var app = getApp();
var uid,token,URL;
var failText = app.globalData.failText;
//获取应用实例
var app = getApp()
Page({
  data: {
    inquiry: false,
    info: {
      phone:'',
      name: '',
      mcard: '',
      age: Number,
      gender: 1, //1是男，2是女
    },
    tipMsg: '',
    tipShow: false,
    nameFocus: true,
    phoneFocus: false,
    ageFocus: false,
    manSel: true,
    female: false
  },
  //事件处理函数
  onLoad: function () {
    uid = app.globalData.uid;
    token = app.globalData.token;
    URL = app.globalData.reqUrl;
    if (app.globalData.editPt.name) {
      var mcard = "info.mcard"
      this.setData({
        info: app.globalData.editPt,
        [mcard]: app.globalData.editPt.mcard ? app.globalData.editPt.mcard : ''
      })
    }
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
  saveInfo: function(e) {
    var value = e.detail.value;
    var _this = this;
    if (this.makeParam(value)) {
      var param = this.data.info;
      param.uid = uid;
      param.token = token;
      param.age = ~~param.age;
      //param.gender = this.data.info.gender;
      var action = 'add_patient_info';
      if (param.id) {
        action = 'mod_patient_info';
      }
      console.log(JSON.stringify(param));
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
            if (action && !app.globalData.haspatient) {
              app.globalData.haspatient = 1;
            }
            if (param.id) {
              wx.redirectTo({
                url: '/pages/patientinfo/patientinfo'
              })
            } else {
              app.globalData.ptcid = resp.data.id;
              wx.redirectTo({
                url: '/pages/pay/pay'
              })
            }
          } else {
            _this.tip(resp.desc);
          }
        },
        fail: function(res) {
          _this.tip(failText);
        }
      })
    }
  },
  makeParam(p) {
    var ret = true;
    if (p.phone.length <=0) {
      this.tip('请输入联系电话');
      ret = false;
    } else if (!(util.checkTel(p.phone))) {
      this.tip('请输入正确的电话号码');
      var phone = 'info.phone';
      this.setData({
        [phone]: '',
        phoneFocus: true
      })
      ret = false;
    }

    if (p.age.length <=0) {
      this.tip('请输入年龄');
      this.setData({
        ageFocus: true
      })
      ret = false;
    }

    if (p.name.length <=0) {
      this.tip('请输入姓名');
      this.setData({
        nameFocus: true
      })
      ret = false;
    }
    if (ret) {
      var name = 'info.name';
      var age = 'info.age';
      var phone = 'info.phone';
      this.setData({
        [name]: p.name,
        [age]: ~~p.age,
        [phone]: p.phone
      })
      if (p.mcard.length >0) {
        var mcard = 'info.mcard'
        this.setData({
          [mcard]: p.mcard
        })
      }
    }
    return ret;
  },
  selectMan(e) {
    var sex = ~~e.currentTarget.dataset.gender;
    var gender = 'info.gender'
    if (sex) {
      this.setData({
        [gender]: sex
      })
    }
  },
  selectFemale(e) {
    var sex = ~~e.currentTarget.dataset.gender;
    var gender = 'info.gender'
    if (sex) {
      this.setData({
        [gender]: sex
      })
    }
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
