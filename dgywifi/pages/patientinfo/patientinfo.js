//index.js
//获取应用实例
var app = getApp()
var uid,token,URL,ptcid;
var failText = app.globalData.failText;
Page({
  data: {
    info: [],
    tipShow: false,
    tipMsg: '',
    hasmore: 0,
    selId: -1,
    btnBg: '#78e4cf'
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '/pages/logs/logs'
    })
  },
  onLoad: function () {
    this.getData();
  },
  getData: function() {
    //页面五层处理
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
          var data = resp.data;
          if (data.infos && data.infos.length > 0) {
            var infos = data.infos;
            for (var i=0,len=infos.length;i<len;i++) {
              infos[i].delBg = '#78e4cf',
              infos[i].editBg = '#78e4cf'
            }
            _this.setData({
              info: infos,
              hasmore: data.hasmore ? data.hasmore : 0
            })
          }
        } else {
          _this.tip(resp.desc);
        }
      },
      fail: function(res){
        _this.tip(failText);
      }
    })
  },
  changeBg(e) {
    var data = e.currentTarget.dataset;
    var idx = data.index;
    var text = data.text;
    var bg = ''
    if (text == 'del') {
      bg = "info["+idx+"].delBg"
    } else {
      bg = "info["+idx+"].editBg"    
    }
    this.setData({
      [bg]: '#1ed2af'
    })
  },
  delPt(e) {
    var _this = this;
    var idx = e.currentTarget.dataset.index;
    var bg = "info["+idx+"].delBg";
    _this.setData({
      [bg]: '#78e4cf'
    })
    wx.showModal({
      title: '删除',
      content: '确认要删除' + this.data.info[idx].name +'吗？',
      success: function(res) {
        if (res.confirm) {
          _this.delConfirm(idx);
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      },
      fail: function(res) {
        console.log(res)
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
          if (_this.data.info.length <=0) {
            app.globalData.haspatient = 0;
          }
          _this.tip('删除成功');
        } else {
          _this.tip(resp.desc);
        }
      },
      fail: function(res){
        _this.tip(failText);
      }
    })
  },
  addPt() {
    app.globalData.editPt = {};
    wx.redirectTo({
      url: '/pages/writepatient/writepatient',
      success: function(res){
        console.log(res);
      },
      fail: function(res){
        console.log(res);
      }
    })
  },
  editPt(e) {
    var _this = this;
    var idx = e.currentTarget.dataset.index;
    var bg = "info["+idx+"].editBg";
    app.globalData.editPt = this.data.info[idx];
    _this.setData({
      [bg]: '#78e4cf'
    })
    wx.redirectTo({
      url: '/pages/writepatient/writepatient'
    })
  },
  changeViewBg: function(e) {
    var idx = ~~e.currentTarget.dataset.index;
    if (idx == undefined) {
      return;
    }
    this.setData({
      viewBg: true
    })
  },
  changeBtnBg: function(e) {
    this.setData({
      btnBg: '1ed2af'
    })
  },
  goPay: function(e) {
    var idx = ~~e.currentTarget.dataset.index;
    if (idx == undefined) {
      return;
    }
    this.setData({
      viewBg: false,
      btnBg: '#78e4cf'
    })
    app.globalData.ptcid = this.data.info[idx].id;
    wx.redirectTo({
      url: '/pages/pay/pay',
      success: function(res){
        console.log(res);
      },
      fail: function(res){
        console.log(res);
      },
    })
  },
  upper: function(e) {
    console.log(e)
  },
  lower: function(e) {
    if (this.data.hasmore) {
      var len = this.data.info.length-1;
      if (len >= 0) {
        var seq = this.data.info[len].seq;
        this.getData(seq);
      }
    }
  },
  scroll: function(e) {
    console.log(e)
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
