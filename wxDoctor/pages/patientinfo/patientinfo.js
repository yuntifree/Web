//index.js
//获取应用实例
var app = getApp()
var uid,token,URL;

Page({
  data: {
    info: [],
    tipShow: false,
    tipMsg: ''
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    this.getData();
  },
  getData: function() {
    uid = app.globalData.uid;
    token = app.globalData.token;
    URL = app.globalData.reqUrl;
    var _this = this;
    var param = {
      uid: uid,
      token: token
    }
    wx.request({
      url: URL + 'get_my_patients',
      method: 'POST',
      data: {
        data: param
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res){
        var resp =res.data;
        if (resp.errno === 0) {
          var data = resp.data
          _this.setData({
            info: data.infos
          })
        } else {
          _this.tip(resp.desc);
        }
      }
    })
  },
  delPt(e) {
    var _this = this;
    var idx = e.currentTarget.dataset.index;
    wx.showModal({
      title: '删除',
      content: '确认要删除' + this.data.info[idx].name +'吗？',
      success: function(res) {
        if (res.confirm) {
          _this.delConfirm(idx);
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
  },
  delConfirm(idx) {
    var _this = this;
    var param = this.data.info[idx];
    param.deleted = 1;
    param.uid = uid;
    param.token = token;
    param.mcard = this.data.info[idx].mcard ? this.data.info[idx].mcard : '';
    wx.request({
      url: URL + 'mod_patient_info',
      method: 'POST',
      data: {
        data: param
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res){
        var resp = res.data;
        if (resp.errno === 0) {
          _this.data.info.splice(idx,1);
          _this.setData({
            info: _this.data.info
           });
          _this.tip('删除成功');
        } else {
          _this.tip(resp.desc);
        }
      }
    })
  },
  addPt() {
    app.globalData.editPt = {};
    wx.navigateTo({
      url: '../writepatient/writepatient'
    })
  },
  editPt(e) {
    var _this = this;
    var idx = e.currentTarget.dataset.index;
    app.globalData.editPt = this.data.info[idx];
    wx.navigateTo({
      url: '../writepatient/writepatient'
    })
  },
  goPay(e) {
    var idx = e.currentTarget.dataset.index;
    app.globalData.ptid = this.data.info[idx].id;
    console.log(app.globalData.ptid);
    wx.navigateTo({
      url: '../pay/pay'
    })
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
