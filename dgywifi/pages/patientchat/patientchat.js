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
    end: -1,
    userInfo: {},
    mounted: false,
    chkCamera: '../../images/patient/ico_camera.png',
    reachBottom: true,
    bottomHeight: 0,
    items: [
      {name: 1, value: '15分钟内'},
      {name: 2, value: '30分钟内', checked: 'true'},
      {name: 3, value: '1小时内'},
      {name: 4, value: '2小时内'},
      {name: 5, value: '超过2小时'},
    ],
    refundBtnBg: '#1ed2af',
    btnBg: '#1cc5a4',
    interval: 2,
    refundShow: true,
    rflag: -1,
    cancelBg: '#fff',
    sureBg: '#1cc5a4'
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

    wx.showLoading({
      title: '加载中...',
      complete: function() {
        setTimeout(function() {
          wx.hideLoading()
        }, 3000)
      }
    })

    wx.getStorage({
      key: 'msg'+uid+'-'+tuid,
      success: function(res) {
        msg = res.data;
        _this.data.chatLists = msg
        if (msg.length > 0) {
          _this.getData(msg[msg.length-1].seq);
        } else {
          _this.getData(-1)
        }
      },
      fail: function(res) {
        _this.getData(-1);
      }
    })
  },
  checkEnd: function() {
    var _this = this;
    wx.getStorage({
      key: 'endInquiry'+tuid,
      success: function(res) {
        _this.data.end = res.data
      },
      complete: function() {
        _this.startTimer();
      }
    })
    wx.getStorage({
      key: 'rflag'+tuid,
      success: function(res) {
        _this.data.rflag = res.data
      }
    })
  },
  startTimer: function() {
    //3秒拉一次
    var _this = this;
    if (this.data.end!==2 && !timer) {
      timer = setInterval(function() {
        var len = _this.data.chatLists.length-1;
        if (len >= 0) {
          _this.getData(_this.data.chatLists[len].seq, true);
        }
      }, 3000)
    }
  },
  getData(seq, t) {
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
              infos[i].timestr = infos[i].ctime.replace(/-/g,'/');
              infos[i].ctime = new Date(infos[i].timestr).getTime()
            }
          } else {
            infos = []
          }
          _this.saveMsg(infos, t);
          var tempStatus = data.status;
          var tempRflag = data.rflag
          _this.setData({
            end: tempStatus,
            rflag: tempRflag
          })
          try {
            wx.setStorageSync("endInquiry" + tuid, tempStatus);
            wx.setStorageSync("rflag" + tuid, data.rflag)
          } catch(e) {

          }
        } else {
          _this.tip(resp.desc);
        }
      },
      fail: function() {
        _this.tip(failText);
      },
      complete: function() {
        if (!_this.data.mounted) {
          _this.setData({
            mounted: true
          })
          wx.hideLoading()
          _this.checkEnd()
        }
      }
    })
  },
  saveMsg(serverMsg, t) {
    var _this = this;
    var localMsg = [];
    wx.getStorage({
      key: 'msg'+uid+'-'+tuid,
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
        if (serverMsg.length > 0 || !t) {
          _this.data.chatLists = _this.data.chatLists.concat(serverMsg);
          _this.fillAndScroll(_this.data.chatLists)
        }
      },
      fail: function() {
        _this.data.chatLists = _this.data.chatLists.concat(serverMsg);
        _this.fillAndScroll(_this.data.chatLists)
      }
    })
  },
  fillAndScroll: function(msgList) {
    if (msgList) {
      this.makeTime()
      this.setData({
        chatLists: msgList
      })
      this.setMsg();
      if (msgList.length > 0 && this.data.reachBottom) {
        this.setData({
          toView: 'list' + msgList[msgList.length-1].id
        })
      }
    } else {
      console.log('fillAndScroll empty')
    }
  },
  setMsg: function(repeat,serverMsg) {
    wx.setStorage({
      key:"msg"+uid+'-'+tuid,
      data: this.data.chatLists,
      success: function(res) {
        console.log('suc'+res)
      } ,
      fail: function(res) {
        console.log('fail'+res)
      }
    })
  },
  compareTime: function(time1, time2) {
    var today = dateFormat(new Date(), 'yyyy/MM/dd');
    var day = dateFormat(time1.ctime,'yyyy/MM/dd');
    if (time2) {
      if (time1.ctime - time2.ctime >= 300 * 1000) {
        time1.timeshow = true;
      }
    } else {
      time1.timeshow = true
    }
    if (day == today) {
      time1.timestr = dateFormat(time1.ctime,'hh:mm')
    } else {
      time1.timestr = dateFormat(time1.ctime, 'yyyy-MM-dd hh:mm')
    }
  },
  makeTime: function() {
    var _this = this;
    this.data.chatLists.forEach(function(item, i){
      if (i > 0) {
        _this.compareTime(item, _this.data.chatLists[i-1])
      } else {
        _this.compareTime(item)
      }
    })
  },
  bindKeyInput(e) {
    this.setData({
      iptVal: e.detail.value
    })
  },
  sendChat: function(type, content) {
    this.data.subInfo = {
      ctime: new Date().getTime(),
      timestr: dateFormat(new Date(),'yyyy/MM/dd hh:mm:ss'),
      content: content,
      type: type,
      flag: 1,
      timeshow: false
    }

    var len = this.data.chatLists.length;
    if (len >0) {
      this.compareTime(this.data.subInfo, this.data.chatLists[len-1])
    } else {
      this.compareTime(this.data.subInfo)
    }
    var param = {
      tuid: tuid,
      type: type,
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
          _this.addChat(type, resp.data.id);
        } else {
          _this.tip(resp.desc);
        }
      },
      fail: function(res) {
        _this.tip(failText)
      }
    })
  },
  tapSub() {
    if (this.data.iptVal.length <=0) {
      this.tip('请输入发送内容');
      return;
    }
    this.sendChat(1, this.data.iptVal)
  },
  addChat(type,id) {
    var len = this.data.chatLists.length;
    var addInfo =[{
      id: id,
      content: this.data.subInfo.content,
      ctime: this.data.subInfo.ctime,
      timestr: dateFormat(this.data.subInfo.ctime, 'hh:mm'),
      type: type,
      flag: 1,
      timeshow: this.data.subInfo.timeshow,
      ptHead: ptHead,
      drHead: drHead,
      seq: id,
    }]
    this.setData({
      chatLists: this.data.chatLists.concat(addInfo),
      iptVal: '',
      iptFocus: true
    })
    this.setMsg();
    this.setData({
      toView: 'list'+ id,
    })
  },
  changeCm(e){
    if (!sending) {
      this.setData({
        chkCamera: '../../images/patient/ico_camera_press.png'
      })
    }
  },
  makeImg(e) {
    var _this = this;
    if (sending) {
      return
    } else {
      sending = true
    }
    this.setData({
      chkCamera: '../../images/patient/ico_camera.png'
    })
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
            _this.sendChat(2, data.data.filename)
          }
        })
      },
      complete: function() {
        setTimeout(function() {
          sending = false
        }, 2000)
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
  makeClip(e) {
    var val = e.currentTarget.dataset.clip;
    wx.showToast({
      title: val,
      duration: 10000
    })
    this.tip(val)
  },
  upper: function(e) {
    //var i = 0;
  },
  lower: function(e) {
    // 到底了
    this.data.reachBottom = true
    this.data.bottomHeight = this.data.scrollTop
  },
  scroll: function(e) {
    if (this.data.bottomHeight - e.detail.scrollTop > 50) {
      this.data.reachBottom = false
    }
  },
  onFocus: function() {
    this.setData({
      iptFocus: true
    })
  },
  onBlur: function() {
    this.setData({
      iptFocus: false
    })
  },
  radioChange: function(e) {
    this.setData({
      interval: e.detail.value
    })
    console.log(e.detail.value)
  },
  changeColor: function() {
    this.setData({
      refundBtnBg: '#0abf9c'
    })
  },
  getRefund: function() {
    this.setData({
      btnBg: '#1ed2af',
      refundShow: false
    })
  },
  changebg: function() {
    this.setData({
      btnBg: '#0abf9c'
    })
  },
  hideRefund: function() {
    this.setData({
      refundShow: true
    })
  },
  makeRefund: function() {
    this.setData({
      btnBg: '#1cc5a4'
    })
    var param = {
      doctor: tuid,
      interval: this.data.interval,
      uid: uid,
      token: token
    }
    var _this = this;
    wx.request({
      url: URL + 'apply_refund',
      data: {
        data: param
      },
      method: 'POST',
      header: {
        'content-type': 'application/json' 
      },
      success: function(res) {
        var resp = res.data;
        if (resp.errno == 0) {
          _this.setData({
            refundShow: true,
            end: 3,
            rflag: 0
          })
          wx.setStorageSync("endInquiry" + tuid, 3)
          wx.setStorageSync("rflag" + tuid, 0)
          _this.tip('您已成功申请退款，请等待人工审核')
        } else {
          _this.tip(resp.desc)
        }
      }
    })
  },
  checkRefund: function() {
    this.setData({
      refundBtnBg: '#1ed2af',
      cancelShow: true
    })
  },
  cancelRefund: function() {
    this.setData({
      endBg: '#0abf9c'
    })
    var param ={
      doctor: tuid,
      uid: uid,
      token: token
    }
    var _this = this;
    wx.request({
      url: URL + 'cancel_refund',
      data: {
        data: param
      },
      method: 'POST',
      header: {
        'content-type': 'application/json' 
      },
      success: function(res) {
        var resp = res.data;
        if (resp.errno == 0) {
          _this.setData({
            end: 1,
            rflag: 1,
            cancelShow: false
          })
          wx.setStorageSync("endInquiry" + tuid, 1)
          wx.setStorageSync("rflag" + tuid, 1)
          _this.tip('您已成功申请退款，请等待人工审核')
        } else {
          _this.tip(resp.desc)
        }
      }
    })
  },
  changeCalcelBg: function() {
    this.setData({
      cancelBg: '#dcdcdc'
    })
  },
  checkCancel: function() {
    this.setData({
      cancelShow: false,
      cancelBg: "#fff"
    })
  },
  changeSureBg: function() {
    this.setData({
      endBg: '#0abf9c'
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
