//index.js
//获取应用实例
var util = require('../../utils/util.js')
var dateFormat = util.dateFormat;
var app = getApp()
var ptid,uid,token,URL,drHead,ptHead,timer;
var textFail = app.globalData.textFail;
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
    ptColor: '#1ed2af'
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
    wx.showNavigationBarLoading();
  },
  onLoad: function () {
    //页面五层处理
    ptid = app.globalData.ptid;
    uid = app.globalData.uid;
    token = app.globalData.token;
    URL = app.globalData.reqUrl;
    drHead = app.globalData.drHead || '../../images/doctor/ico_personal.png';
    ptHead = app.globalData.ptHead;
    var _this = this;
    //wx.clearStorage();
      //获取就诊人头像
    var msg = [];
    wx.getStorage({
      key: 'msg'+ptid,
      success: function(res) {
        msg = res.data;
        _this.setData({
          chatLists: msg,
        })
        _this.setData( {
          toView: 'list' +msg[msg.length-1].id
          }
        )
        _this.getData(msg[msg.length-1].seq, true);
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
        _this.setData({
          end: res.data
        })
        wx.hideNavigationBarLoading();
        _this.startTimer();
      },
      complete: function() {
        _this.setData({
          mounted: true
        })
      }
    })
  },
  startTimer() {
    //3秒拉一次
    var _this = this;
    if (!this.data.end) {
      timer = setInterval(function() {
        var len = _this.data.chatLists.length-1;
        if (len > 0) {
          _this.getData(_this.data.chatLists[len].seq, true);
        }
      },1500)
    }
  },
  getData(seq,before) {
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
              infos[i].ctime = infos[i].ctime.replace(/-/g,'/');
            }
            _this.saveMsg(infos);
            //_this.makeTime();
          }
          var tempStatus = data.status == 2 ? true : false;
          _this.setData({
            end: tempStatus,
          })
          wx.setStorage({
            key:"endInquiry"+ptid,
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
      fail: function(res) {
        _this.tip(textFail);
      }
    })
  },
  saveMsg(serverMsg) {
    var _this = this;
    var localMsg = [];
    wx.getStorage({
      key: 'msg'+ptid,
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
        //重置数据
        _this.data.chatLists = _this.data.chatLists.concat(serverMsg);
        _this.fillAndScroll(_this.data.chatLists)
      },
      fail: function(res) {
        //重置数据
        _this.data.chatLists = _this.data.chatLists.concat(serverMsg)
        _this.fillAndScroll(_this.data.chatLists)
      }
    })
  },
  fillAndScroll: function(msgList) {
    if (msgList) {
      // 先保存，再处理时间
      this.setMsg()
      this.makeTime()
      this.setData({
        chatLists: msgList
      })
      this.setData({
        toView: 'list' + msgList[msgList.length-1].id
      })
    } else {
      console.log('fillAndScroll empty')
    }
  },
  setMsg: function() {
    wx.setStorage({
      key:"msg"+ptid,
      data: this.data.chatLists,
      success: function(res) {
        console.log('suc'+res)
      },
      fail: function(res) {
        console.log('fail'+res)
      }
    })
    //console.log(JSON.stringify(this.data.chatLists));
  },
  makeTime: function() {
    var len = this.data.chatLists.length;
    var text1,text2;
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
    }
    for (var i=0; i<len; i++) {
      var ctime = "chatLists["+i+"].ctime"
      var date = new Date(dateFormat(new Date(), 'yyyy/MM/dd')).getTime();
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
    var date = dateFormat(new Date(), 'yyyy/MM/dd hh:mm')
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
      tuid: ptid,
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
        _this.tip(textFail);
      }
    })
  },
  addChat(type,id) {
    var len = this.data.chatLists.length;
    var none = len<=0 ? true : false;
    var addInfo = [{
      id: id,
      content: this.data.subInfo.content,
      ctime: this.data.subInfo.ctime,
      type: type,
      flag: 1,
      timeshow: this.data.subInfo.timeshow,
      ptHead: ptHead,
      drHead: drHead,
      seq: none ? 1 :this.data.chatLists[len-1].id + 1,
    }]
    this.setData({
      chatLists: this.data.chatLists.concat(addInfo),
    })
    this.setData({
      iptVal: '',
      iptFocus: true,
      toView: 'list'+ (none ? 1 :this.data.chatLists[len-1].id + 1)
    })
    this.setMsg();
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
          url: '/pages/drpatient/drpatient',
          success: function(res) {
            console.log(JSON.stringify(res));
          },
          fail: function(res) {
            console.log(JSON.stringify(res));
          }
        })
      },
      fail: function(res) {
        _this.tip(textFail)
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
              _this.tip(textFail);
            }
          })
        }
      })
    }
  },
  makImg(e) {
    var file = '';
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
              tuid: ptid,
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
                var respp = res.data;
                if (respp.errno == 0) {
                  var con = "subInfo.content";
                  _this.setData({
                    [con]: data.data.filename
                  })
                  _this.addChat(2,respp.data.id)
                } else {
                  _this.tip(respp.desc);
                }
              }
            })
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
