//index.js
var util = require('../../utils/util.js')
var dateFormat = util.dateFormat;
//获取应用实例
var app = getApp()
var uid,token,URL;

Page({
  data: {
    inquiry: false,
    userInfo: {},
    scrollTop: 100,
    info: [],
    tipShow: false,
    tipMsg: ''
  },
  //事件处理函数
  onLoad: function () {
    uid = app.globalData.uid;
    token = app.globalData.token;
    URL =app.globalData.reqUrl;
    this.getData(0);
  },
  getData: function(seq) {
    var _this = this;
    var param = {
      uid: uid,
      token: token,
      seq: seq,
      num: 20
    }
    wx.request({
      url: URL + 'get_my_doctors',
      method: 'POST',
      data: {
        data: param
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        var resp = res.data;
        if (resp.errno == 0) {
          var data = resp.data;
          if (data.infos && data.infos.length >0) {
            _this.setData({
              info: data.infos
            })
            _this.makeTime();
          }
        } else {
          _this.tip(resp.desc);
        }
      }
    })
  },
  makeTime: function() {
    var len = this.data.info.length;
    var text1,text2;
    var date = new Date(dateFormat(new Date(), 'yyyy-MM-dd')).getTime();
    for(var i=0;i <len;i++) {
      if (this.data.info[i].flag) {
        var ctime = "info["+i+"].chat.ctime"
        var nowDate = new Date(dateFormat(this.data.info[i].chat.ctime,'yyyy-MM-dd')).getTime();
        if (date === nowDate) {
          this.setData({
            [ctime]: dateFormat(this.data.info[i].chat.ctime,'hh:mm')
          })
        }
      }
    }
  },
  goPt(e) {
    var idx = e.currentTarget.dataset.index;
    app.globalData.drid = this.data.info[idx].uid;
    console.log(app.globalData.drid);
    wx.navigateTo({
      url: '../patientinfo/patientinfo'
    })
  },
  upper: function(e) {
    //console.log(e)
  },
  lower: function(e) {
    //console.log(e)
  },
  scroll: function(e) {
    //console.log(e)
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
