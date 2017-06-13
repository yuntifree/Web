//index.js
//获取应用实例
var util = require('../../utils/util.js')
var dateFormat = util.dateFormat;
var app = getApp()
var tuid = app.globalData.tuid
var uid = app.globalData.uid
var token = app.globalData.token
var URL = app.globalData.reqUrl
var drHead = app.globalData.drHead
var ptHead = ''
Page({
  data: {
    scrollTop: 100,
    chatLists: [],
    iptVal: '',
    subInfo: {
      content: '',
      ctime: '',
      flag: 1,
      type: 1,
      timeshow: false
    },
    patientInfo: {
      name: '赵五',
      card: '0000001',
      phone: '13100000000'
    },
    patientShow: false,
    endShow: false,
    userInfo: {},
    iptFocus: false
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../scancode/scancode'
    })
  },
  onLoad: function () {
    //this.makeTime();
    var _this = this;
    app.getUserInfo(function(userInfo){
      //获取患者头像
      ptHead = app.globalData.userInfo.avatarUrl;
      _this.getData(0);
    })
    //this.getData(0);
  },
  getData(seq) {
    var _this = this;
    var param = {
      uid: uid,
      token: token,
      tuid: tuid,
      seq: seq,
      num: 50
    }
    wx.request({
      url: URL + 'get_chat',
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
          var data = resp.data;
          if (data.infos && data.infos.length >0) {
            _this.setData({
              chatLists: data.infos
            })
            var len = _this.data.chatLists.length;
            for (var i=0; i<len; i++) {
              var flag = "chatLists["+i+"].flag";
              var ptHead2 = "chatLists["+i+"].ptHead";
              var drHead2 = "chatLists["+i+"].drHead"
              if (uid == _this.data.chatLists[i].uid) {
                _this.setData({
                  [flag]: true
                })
              } else {
                _this.setData({
                  [flag]: false
                })
              }
              _this.setData({
                [ptHead2]: ptHead,
                [drHead2]: drHead
              })
            }
            _this.makeTime();
          }
        } else {
          _this.tip(resp.desc);
        }
      }
    })
  },
  makeTime: function() {
    var len = this.data.chatLists.length;
    var text1,text2;
    var date = new Date(dateFormat(new Date(), 'yyyy-MM-dd')).getTime();
    for(var i=0;i <len;i++) {
      if (i>0) {
        text1 = new Date(this.data.chatLists[i-1].ctime).getTime();
        text2 = new Date(this.data.chatLists[i].ctime).getTime();
        if (text2-text1 >= 300000) {
          var timeshow = "chatLists["+i+"].timeshow";
          this.setData({
            [timeshow]: true //key只需要用中括号括起来就变成变量啦,如
          })
        }
      }
      var ctime = "chatLists["+i+"].ctime"
      var nowDate = new Date(dateFormat(this.data.chatLists[i].ctime,'yyyy-MM-dd')).getTime();
      if (date === nowDate) {
        this.setData({
          [ctime]: dateFormat(this.data.chatLists[i].ctime,'hh:mm')
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
    if (this.data.iptVal.length <=0) {
      this.setData({
        iptFocus: true
      })
      this.tip('请输入发送内容');
      return;
    }
    var ctime = "subInfo.ctime";
    var content = "subInfo.content";
    var timeshow = "subInfo.timeshow";
    var type = "subInfo.type"
    var flag = "subInfo.flag"
    var date = dateFormat(new Date(),'hh:mm')
    this.setData({
      [ctime]: date,
      [content]: this.data.iptVal,
      [type]: 1,
      [flag]: 1,
      [timeshow]: false
    });
    var len = this.data.chatLists.length;
    var time1 = new Date().getTime();
    if (len >0) {
      var time2 = new Date(this.data.chatLists[len-1].ctime);
      if (time2 == 'Invalid Date') {
        time2 = new Date(dateFormat(new Date(),'yyyy-MM-dd') + ' ' +this.data.chatLists[len-1].ctime).getTime();
      }
      if (time1-time2 >= 300000) {
        this.setData({
          [timeshow]: true //key只需要用中括号括起来就变成变量啦,如
        })
      }
    } else {
      this.setData({
        [timeshow]: true //key只需要用中括号括起来就变成变量啦,如
      })
    }
    var param = {
      tuid: tuid,
      type: 1,
      content: this.data.subInfo.content,
      uid: uid,
      token: token
    }
    var _this = this;
    wx.request({
      url: URL + 'send_chat',
      method: 'POST',
      data: {
        data: param,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        var resp = res.data;
        if (resp.errno == 0) {
          _this.addChat(1);
        } else {
          _this.tip(resp.desc);
        }
      }
    })
  },
  addChat(type) {
    var len = this.data.chatLists.length;
    var content2 = "chatLists["+len+"].content";
    var ctime2 = "chatLists["+len+"].ctime";
    var type2 = "chatLists["+len+"].type";
    var flag2 = "chatLists["+len+"].flag";
    var timeshow2 = "chatLists["+len+"].timeshow";
    var ptHead2 = "chatLists["+len+"].ptHead";
    var drHead2 = "chatLists["+len+"].drHead"
    this.setData({
      [content2]: this.data.subInfo.content,
      [ctime2]: this.data.subInfo.ctime,
      [type2]: type,
      [flag2]: 1,
      [timeshow2]: this.data.subInfo.timeshow,
      [ptHead2]: ptHead,
      iptVal: ''
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
  makeImg(e) {
    var _this = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFile = res.tempFilePaths
        console.log(JSON.stringify(res));
        wx.uploadFile({
          url: URL + 'upload_img', //仅为示例，非真实的接口地址
          filePath: tempFile[0],
          name: 'file',
          success: function(resp){
            var data = resp.data
            //do something
            var param = {
              tuid: tuid,
              type: 2,
              content: tempFile[0],
              uid: uid,
              token: token
            }
            var _this = this;
            wx.request({
              url: URL + 'send_chat',
              method: 'POST',
              data: {
                data: param,
              },
              header: {
                'content-type': 'application/json'
              },
              success: function(res) {
                var resp = res.data;
                if (resp.errno == 0) {
                  //_this.addChat(2)
                } else {
                  _this.tip(resp.desc);
                }
              }
            })
          }
        })
      },
      fail: function(res) {
        _this.tip(res);
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
