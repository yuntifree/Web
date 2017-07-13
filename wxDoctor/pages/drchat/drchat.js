//index.js
//获取应用实例
var util = require('../../utils/util.js')
var dateFormat = util.dateFormat;
var app = getApp()
var ptid,uid,token,URL,drHead,ptHead,timer;
var failText = app.globalData.failText;
var sending = false;
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
    ptInfo: {},
    patientShow: false,
    endShow: false,
    end: false,
    mounted: false,
    ptColor: '#1ed2af',
    chkCamera: '../../images/patient/ico_camera.png',
    reachBottom: true,
    bottomHeight: 0
  },
  //事件处理函数
  onHide: function() {
    clearInterval(timer);
    timer = null;
  },
  onUnload: function() {
    clearInterval(timer);
    timer = null;
  },
  onShow: function() {
    ptid = app.globalData.ptid;
    if (timer == null) {
      this.checkTimer();
    }
  },
  onLoad: function () {
    //页面五层处理
    ptid = app.globalData.ptid;
    uid = app.globalData.uid;
    token = app.globalData.token;
    URL = app.globalData.reqUrl;
    var userInfo = app.globalData.rawUserInfo.userInfo
    if (userInfo) {
      drHead = userInfo.avatarUrl
    } else {
      drHead = '../../images/doctor/ico_personal.png'
    }
    ptHead = app.globalData.ptHead;
    var _this = this;
    //wx.clearStorage();
      //获取咨询者头像
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
      key: 'msg'+uid+'-'+ptid,
      success: function(res) {
        msg = res.data;
        _this.data.chatLists = msg;
        if (msg.length > 0) {
          _this.getData(msg[msg.length-1].seq);
        }
      },
      fail: function(res) {
        _this.getData(-1,true);
      }
    })
  },
  checkTimer: function() {
    var _this = this;
    wx.getStorage({
      key: 'endInquiry'+ptid,
      success: function(res) {
        _this.data.end = res.data
      },
      complete: function() {
        _this.startTimer();
      }
    })
  },
  startTimer() {
    //3秒拉一次
    var _this = this;
    if (!this.data.end && !timer) {
      timer = setInterval(function() {
        var len = _this.data.chatLists.length-1;
        if (len >= 0) {
          _this.getData(_this.data.chatLists[len].seq, true);
        }
      },3000)
    }
  },
  getData(seq, t) {
    var _this = this;
    var param = {
      uid: uid,
      token: token,
      tuid: ptid, //对方id
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
          var tempStatus = data.status == 2 ? true : false;
          _this.setData({
            end: tempStatus,
          })
          try {
            wx.setStorageSync("endInquiry"+ptid, tempStatus)
          } catch (e) {

          }
        } else {
          _this.tip(resp.desc);
        }
      },
      fail: function(res) {
        _this.tip(failText);
      },
      complete: function() {
        if (!_this.data.mounted) {
          _this.setData({
            mounted: true
          })
          wx.hideLoading()
          _this.checkTimer()
        }
      }
    })
  },
  saveMsg(serverMsg, t) {
    var _this = this;
    var localMsg = [];
    wx.getStorage({
      key: 'msg'+uid+'-'+ptid,
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
        //重置数据
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
      this.setMsg()
      if (msgList.length > 0 && this.data.reachBottom) {
        this.setData({
          toView: 'list' + msgList[msgList.length-1].id
        })
      }
    } else {
      console.log('fillAndScroll empty')
    }
  },
  setMsg: function() {
    wx.setStorage({
      key:"msg"+uid+'-'+ptid,
      data: this.data.chatLists,
      success: function(res) {
        console.log('suc'+res)
      },
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
      tuid: ptid,
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
    var addInfo = [{
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
    var _this = this;
    var param = {
      tuid: ptid,
      uid: uid,
      token: token
    }
    wx.request({
      url: URL + 'fin_inquiry',
      method: 'POST',
      data: {
        data: param
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        _this.setData({
          endShow: false
        })
        wx.switchTab({
          url: '/pages/drpatient/drpatient'
        })
      },
      fail: function(res) {
        _this.tip(failText)
      }
    })
  },
  getPatient(e) {
    var _this = this;
    if (this.data.ptInfo.name) {
      this.setData({
        patientShow: !this.data.patientShow,
      })
      this.setData({
        ptColor: this.data.patientShow ? '#dcdcdc' : '1ed2af'
      })
    } else {
      wx.getStorage({
        key: 'ptInfo'+ptid,
        success: function(res) {

          _this.setData({
            ptInfo: res.data,
            patientShow: true
          })
        },
        fail: function(res) {
          var param = {
            tuid: ptid,
            uid: uid,
            token: token
          }
          wx.request({
            url: URL +'get_patient_info',
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
                _this.setData({
                  ptInfo: resp.data,
                  patientShow: true
                })
                wx.setStorage({
                  key: 'ptInfo'+ptid,
                  data: resp.data,
                  success: function(ress) {
                    console.log(JSON.stringify(ress))
                  },
                  fail: function(ress) {
                    console.log(JSON.stringify(ress))
                  }
                })
              } else {
                _this.tip(resp.desc);
              }
            },
            fail: function(res){
              _this.tip(failText);
            }
          })
        }
      })
    }
  },
  changeCm(e){
    if (!sending) {
      this.setData({
        chkCamera: '../../images/patient/ico_camera_press.png'
      })
    }
  },
  makImg(e) {
    var file = '';
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
  makeClip(e) {
    var val = e.currentTarget.dataset.clip;
    wx.setClipboardData({
      data: val,
      success: function(res) {
        console.log(res);
      }
    })
  },
  upper: function(e) {
    //console.log(e)
  },
  lower: function(e) {
    // 到底了
    this.data.reachBottom = true
    this.data.bottomHeight = this.data.scrollTop
  },
  scroll: function(e) {
    if (this.data.bottomHeight - e.detail.scrollTop > 50) {
      this.data.reachBottom = false
      console.log('reachBottom = false')
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
