//index.js
//获取应用实例
var app = getApp();
var uid,token,URL;
var failText = app.globalData.failText;
Page({
  data: {
    lists: [{
      title: '什么是健康莞家？',
      text: '健康莞家是一个面向东莞地区的在线医疗咨询平台。为了保障信息真实可靠，平台上的所有医生都来自您在医院看病时接触到的本地医生。'
    },{
      title: '如何使用健康莞家咨询医生？',
      text: '您需要先绑定医生，在医院就诊结束时，扫描医生的《健康莞家》个人二维码，即可绑定为您就诊的医生。绑定医生后可通过点击医生对话框并支付相应的咨询费用（咨询费用由医生制定）即可开启聊天，开始咨询。'
    },{
      title: '为什么要支付咨询费用？',
      text: '咨询费用由医生根据个人实际情况制定，有的医生可能不会收取咨询费。',
    },{
      title: '不扫描二维码就不能咨询医生吗？',
      text: '为确保您咨询的医生是真实可靠的，对您病历了解，《健康莞家》中，医生必须先通过扫描二维码的方式才能与您连接。这样，才能确保该医生是在医院为您就诊的医生。'
    },{
      title: '怎么找到医生的二维码？',
      text: '只有当面能获取医生的二维码，所以在医院就诊时记得扫码添加医生噢。',
    },{
      title: '小程序是什么？会窃取我的个人信息吗？',
      text: '微信小程序，简称小程序，是一种不需要下载安装即可使用的应用，它实现了应用“触手可及”的梦想，用户扫一扫或搜一下即可打开应用。\n不会窃取个人信息。\n小程序发布时微信开发团队都会进行严格的审核，以确保小程序安全合法，如有窃取个人信息的小程序无法通过审核发布。'
    }],
    selIdx: -1,
    btnBg: '#1ed2af',
    areaVal: ''
  },
  //事件处理函数
  onLoad: function () {
    //页面五层处理
    uid = app.globalData.uid;
    token = app.globalData.token;
    URL = app.globalData.reqUrl;
    //this.getData();
  },
  setIdx: function(e) {
    var idx = e.currentTarget.dataset.idx;
    if (this.data.selIdx == idx) {
      this.setData({
        selIdx: -1
      })
    } else {
      this.setData({
        selIdx: idx
      })
    }
  },
  changeColor: function() {
    this.setData({
      btnBg: '#0ABF9C'
    })
  },
  postQuestion: function(e) {
    var _this = this;
    this.setData({
      btnBg: '#1ed2af'
    })
    var content = e.detail.value.textarea;
    if (content.length <=0) {
      _this.tip('请先输入您的问题');
      return;
    } 
    var param = {
      token: token,
      uid: uid,
      content: content
    }
    wx.request({
      url: URL + 'feedback',
      method: 'POST',
      data: {
        data: param
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        var resp = res.data;
        if (resp.errno ===0) {
          _this.setData({
            areaVal: ''
          })
          _this.tip('提交成功')
        } else {
          _this.tip(resp.desc);
        }
      },
      fail: function() {
        _this.tip(failText);
      }
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
