//index.js
//获取应用实例
var util = require('../../utils/util.js')
var dateFormat = util.dateFormat;
var app = getApp()
var tuid,uid,token,URL,drHead,ptHead,timer;
var failText = app.globalData.failText;
var sending = false
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
    iptFocus: false,
    toView: '',
    end: false,
    userInfo: {},
    mounted: false
  },
  onHide: function() {
    clearInterval(timer);
    timer = null;
   //事件处理函数
  },
  onShow: function() {
    if (timer == null) {
      this.checkEnd()
    }
  },
  onUnload: function() {
    clearInterval(timer);
    timer = null;
  },
  //事件处理函数
  onLoad: function () {
    wx.showNavigationBarLoading()
    var userInfo = app.globalData.rawUserInfo.userInfo
    if (userInfo) {
      ptHead = userInfo.avatarUrl
    } else {
      ptHead = '../../images/doctor/ico_personal.png'
    }

    tuid = app.globalData.drid;
    uid = app.globalData.uid;
    token = app.globalData.token;
    URL = app.globalData.reqUrl;
    drHead = app.globalData.drHead;
    var _this = this;
    var msg = [];

    //wx.clearStorage();
    wx.getStorage({
      key: 'msg'+tuid,
      success: function(res) {
        msg = res.data;
        _this.fillAndScroll(msg)
        _this.getData(msg[msg.length-1].seq);
      },
      fail: function(res) {
        _this.getData(-1);
      }
    })

    this.checkEnd()
  },
  checkEnd: function() {
    var _this = this;
    wx.getStorage({
      key: 'endInquiry'+tuid,
      success: function(res) {
        _this.setData({
          end: res.data,
        })
        _this.startTimer();
      },
      complete: function() {
        _this.setData({
          mounted: true
        })
      }
    })
  },
  startTimer: function() {
    //3秒拉一次
    console.log(this.data.end);
    var _this = this;
    if (!this.data.end && timer == null) {
      timer = setInterval(function() {
        var len = _this.data.chatLists.length-1;
        if (len > 0) {
          _this.getData(_this.data.chatLists[len].seq, true);
        }
        _this.setData({
          date: new Date().getTime() + ' '
        })
      },1500)
    }
  },
  getData(seq) {
    var _this = this;
    var param = {
      uid: uid,
      token: token,
      tuid: tuid, //对方id
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
          var infos = data.infos;
          var pre = false;
          if (infos && infos.length >0) {
            if (param.seq == -1) {
              infos = data.infos.reverse();
            }
            var len = infos.length;
            for (var i=0; i<len; i++) {
              if (uid == infos[i].uid) {
                infos[i].flag = true;
              } else {
                infos[i].flag = false;
              }
              infos[i].ptHead = ptHead;
              infos[i].drHead = drHead;
              infos[i].timeshow = false;
              infos[i].ctime = infos[i].ctime.replace(/-/g,'/');
            }
            _this.saveMsg(infos);
          }
          var tempStatus = data.status == 2
          _this.setData({
            end: tempStatus,
            status: data.status
          })
          wx.setStorage({
            key:"endInquiry" + tuid,
            data: tempStatus,
            success: function(res) {
              console.log('suc endInquiry'+res)
            } ,
            fail: function(res) {
              console.log('fail endInquiry'+res)
            }
          })
        } else {
          _this.tip(resp.desc);
        }
      },
      fail: function() {
        _this.tip(failText);
      },
      complete: function() {
        wx.hideNavigationBarLoading()
      }
    })
  },
  saveMsg(serverMsg) {
    var _this = this;
    var localMsg = [];
    wx.getStorage({
      key: 'msg'+tuid,
      success: function(res) {
        localMsg = res.data;
        for (var i=0; i<serverMsg.length; i++) {
          for(var j=0; j<localMsg.length; j++) {
            if (serverMsg[i].id == localMsg[j].id) {
              serverMsg.splice(i,1);
              i--;
              break;
            }
          }
        }
        _this.data.chatLists = _this.data.chatLists.concat(serverMsg);
        _this.fillAndScroll(_this.data.chatLists)
        //setStorage
        _this.setMsg();
      },
      fail: function(res) {
        _this.data.chatLists = _this.data.chatLists.concat(serverMsg)
        _this.fillAndScroll(_this.data.chatLists)
        _this.setMsg()
      }
    })
  },
  fillAndScroll: function(msgList) {
    if (msgList) {
      this.makeTime()
      this.setData({
        chatLists: msgList
      })
      this.setData({
        toView: 'list' + msgList[msgList.length-1].seq
      })
    } else {
      console.log('fillAndScroll empty')
    }
  },
  setMsg: function(repeat,serverMsg) {
    wx.setStorage({
      key:"msg"+tuid,
      data: this.data.chatLists,
      success: function(res) {
        console.log('suc'+res)
      } ,
      fail: function(res) {
        console.log('fail'+res)
      }
    })
  },
  makeTime: function() {
    var len = this.data.chatLists.length;
    var text1,text2;
    for(var i=1;i<len;i++) {
      text1 = new Date(this.data.chatLists[i-1].ctime).getTime();
      text2 = new Date(this.data.chatLists[i].ctime).getTime();
      //this.tip(new Date(this.data.chatLists[i-1].ctime));
      if (text2-text1 >= 300000) {
        var timeshow = "chatLists["+i+"].timeshow";
        //this.tip(timeshow);
        this.setData({
          [timeshow]: true //key只需要用中括号括起来就变成变量啦,如
        })
      }
    }
    for(var i=0; i<len; i++) {
      var date = new Date(dateFormat(new Date(), 'yyyy/MM/dd')).getTime();
      var ctime = "chatLists["+i+"].ctime";
      var nowDate = new Date(dateFormat(this.data.chatLists[i].ctime,'yyyy/MM/dd')).getTime();
      if (date === nowDate) {
        this.setData({
          [ctime]: dateFormat(this.data.chatLists[i].ctime,'hh:mm')
        })
      }
    }
    var timeshow0 = "chatLists[0].timeshow";
    this.setData({
      [timeshow0]: true //key只需要用中括号括起来就变成变量啦,如
    })
  },
  bindKeyInput(e) {
    this.setData({
      iptVal: e.detail.value
    })
  },
  tapSub() {
    if (this.data.iptVal.length <=0) {
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
        time2 = new Date(dateFormat(new Date(),'yyyy/MM/dd') + ' ' +this.data.chatLists[len-1].ctime).getTime();
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
          _this.addChat(1,resp.data.id);
        } else {
          _this.tip(resp.desc);
        }
      },
      fail: function(res) {
        _this.tip(failText)
      }
    })
  },
  addChat(type,id) {
    var len = this.data.chatLists.length;
    var none = len<=0 ? true : false;
    var addInfo =[{
      id: id,
      content: this.data.subInfo.content,
      ctime: this.data.subInfo.ctime,
      type: type,
      flag: 1,
      timeshow: this.data.subInfo.timeshow,
      ptHead: ptHead,
      drHead: drHead,
      seq: none ? 1 :this.data.chatLists[len-1].seq + 1,
    }]
    this.setData({
      chatLists: this.data.chatLists.concat(addInfo),
      iptVal: '',
      iptFocus: true
    })
    this.setMsg();
    this.setData({
      toView: 'list'+ (none ? 1 :this.data.chatLists[len-1].seq + 1)
    })
  },
  makeImg(e) {
    var _this = this;
    if (sending) {
      return
    } else {
      sending = true
    }

    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFile = res.tempFilePaths;
        wx.uploadFile({
          url: URL + 'upload_img', //仅为示例，非真实的接口地址
          filePath: tempFile[0],
          name: 'file',
          success: function(resp){
            var data = JSON.parse(resp.data);
            //do something
            var param = {
              tuid: tuid,
              type: 2,
              content: data.data.filename,
              uid: uid,
              token: token
            }
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
                  var con = "subInfo.content";
                  _this.setData({
                    [con]: data.data.filename
                  })
                  _this.addChat(2,data.id)
                } else {
                  _this.tip(resp.desc);
                }
              },
              complete: function() {
                sending = false
              }
            })
          },
          complete: function() {
            sending = false
          }
        })
      },
      complete: function() {
        sending = false
      }
    })
  },
  previewImg:function(e){
    wx.previewImage({
      current: e.currentTarget.dataset.src, // 当前显示图片的http链接
      urls: [e.currentTarget.dataset.src] // 需要预览的图片http链接列表
    })
  },
  reInquiry() {
    wx.redirectTo({
      url: '../patientinfo/patientinfo'
    })
  },
  upper: function(e) {
    //var i = 0;
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
