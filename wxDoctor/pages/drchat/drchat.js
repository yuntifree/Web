//index.js
//获取应用实例
var util = require('../../utils/util.js')
var dateFormat = util.dateFormat;
var app = getApp()
var URL = 'https://wxdev.yunxingzh.com/inquiry/'
Page({
  data: {
    scrollTop: 100,
    chatLists: [{
      text: '医生您好，请问我的诊断结果怎么样呢？',
      timer: '2017-05-01 12:22',
      dr: 1,
      head: '../../images/login/img_ownpic.png',
      timeshow: true
    },{
      text: '医生您好，请问我的诊断结果怎么样呢？',
      timer: '2017-05-01 12:30',
      dr: 0,
      head: '../../images/login/img_ownpic.png',
      timeshow: false
    },{
      text: '医生您好，请问我的诊断结果怎么样呢？',
      timer: '2017-05-01 12:30',
      dr: 0,
      head: '../../images/login/img_ownpic.png',
      timeshow: false
    },{
      text: '医生您好，请问我的诊断结果怎么样呢？',
      timer: '2017-05-01 12:30',
      dr: 0,
      head: '../../images/login/img_ownpic.png',
      timeshow: false
    },{
      text: '医生您好，请问我的诊断结果怎么样呢？',
      timer: '2017-05-01 12:30',
      dr: 0,
      head: '../../images/login/img_ownpic.png',
      timeshow: false
    },{
      text: '医生您好，请问我的诊断结果怎么样呢？',
      timer: '2017-05-01 12:30',
      dr: 0,
      head: '../../images/login/img_ownpic.png',
      timeshow: false
    },{
      text: '医生您好，请问我的诊断结果怎么样呢？',
      timer: '2017-05-01 12:35',
      dr: 0,
      head: '../../images/login/img_ownpic.png',
      timeshow: false
    },{
      text: '医生您好，请问我的诊断结果怎么样呢？',
      timer: '2017-05-01 12:36',
      dr: 1,
      head: '../../images/login/img_ownpic.png',
      timeshow: false
    },{
      text: '医生您好',
      timer: '2017-06-11 08:40',
      dr: 0,
      head: '../../images/login/img_ownpic.png',
      timeshow: false
    }],
    iptVal: '',
    subInfo: {
      text: '',
      timer: '',
      dr: 1,
      head: '../../images/login/img_ownpic.png',
      timeshow: false
    },
    patientInfo: {
      name: '赵五',
      card: '0000001',
      phone: '13100000000'
    },
    patientShow: false,
    endShow: false
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../scancode/scancode'
    })
  },
  onLoad: function () {
    this.makeTime();
    var len = this.data.chatLists.length;
    //调用应用实例的方法获取全局数据
    /*app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })*/
    //this.saveNote();
  },
  makeTime: function() {
    var len = this.data.chatLists.length;
    var text1,text2;
    var date = new Date(dateFormat(new Date(), 'yyyy-MM-dd')).getTime();
    for(var i=0;i <len;i++) {
      if (i>0) {
        text1 = new Date(this.data.chatLists[i-1].timer).getTime();
        text2 = new Date(this.data.chatLists[i].timer).getTime();
        if (text2-text1 >= 300000) {
          var timeshow = "chatLists["+i+"].timeshow";
          this.setData({
            [timeshow]: true //key只需要用中括号括起来就变成变量啦,如
          })
        }
      }
      var timer = "chatLists["+i+"].timer"
      var nowDate = new Date(dateFormat(this.data.chatLists[i].timer,'yyyy-MM-dd')).getTime();
      if (date === nowDate) {
        this.setData({
          [timer]: dateFormat(this.data.chatLists[i].timer,'hh:mm')
        })
      }
    }
  },
  bindKeyInput(e) {
    this.setData({
      iptVal: e.detail.value
    })
  },
  tapSub() {
    var timer = "subInfo.timer";
    var text = "subInfo.text";
    var timeshow = "subInfo.timeshow";
    var date = dateFormat(new Date(),'hh:mm')
    this.setData({
      [timer]: date,
      [text]: this.data.iptVal,
      [timeshow]: false
    });
    var len = this.data.chatLists.length;
    var time1 = new Date().getTime();
    var time2 = new Date(this.data.chatLists[len-1].timer);
    if (time2 == 'Invalid Date') {
      time2 = new Date(dateFormat(new Date(),'yyyy-MM-dd') + ' ' +this.data.chatLists[len-1].timer).getTime();
    }
    if (time1-time2 >= 300000) {
      this.setData({
        [timeshow]: true //key只需要用中括号括起来就变成变量啦,如
      })
    }
    var text = "chatLists["+len+"].text";
    var timer = "chatLists["+len+"].timer";
    var dr = "chatLists["+len+"].dr";
    var head = "chatLists["+len+"].head";
    var timeshow = "chatLists["+len+"].timeshow";
    this.setData({
      [text]: this.data.subInfo.text,
      [head]: this.data.subInfo.head,
      [timer]: this.data.subInfo.timer,
      [dr]: this.data.subInfo.dr,
      [timeshow]: this.data.subInfo.timeshow,
    })
  },
  endInquiry(e) {
    this.setData({
      endShow: true
    })
  },
  cancelEnd() {
    this.setData({
      endShow: false
    })
  },
  checkEnd() {
    this.setData({
      endShow: false
    })
  },
  getPatient(e) {
    this.setData({
      patientShow: !this.data.patientShow
    })
  },
  makImg(e) {
    var file = '';
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        file = res.tempFilePaths
      },
      fail: function(res) {
        console.log(res);
      }
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
})
