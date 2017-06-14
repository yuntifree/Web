//index.js
//获取应用实例
var util = require('../../utils/util.js')
var dateFormat = util.dateFormat;
var app = getApp()
var tuid,uid,token,URL,drHead;
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
    patientShow: false,
    endShow: false,
    userInfo: {},
    iptFocus: false,
    toView: ''
  },
  //事件处理函数
  onLoad: function () {
    tuid = app.globalData.tuid;
    uid = app.globalData.uid;
    token = app.globalData.token;
    URL = app.globalData.reqUrl;
    drHead = app.globalData.drHead;
    var _this = this;
    //wx.clearStorage();
    app.getUserInfo(function(userInfo){
      //获取患者头像
      ptHead = app.globalData.userInfo.avatarUrl;
      var msg = [];
      wx.getStorage({
        key: 'msg',
        success: function(res) {
          msg = res.data;
          _this.setData({
            chatLists: msg,
          })
          _this.setData( {
            toView: 'list' +msg[msg.length-1].seq
            }
          )
          //_this.getData(-1 || 0, true);
        },
        fail: function(res) {
          _this.getData(-1,true);
        } 
      })
      /*setInterval(function() {
        console.log(_this.data.chatLists[len].seq);
        _this.getData(_this.data.chatLists[len].seq || 0, true);
      },1500)*/
    })
    //this.getData(0);
  },
  getData(seq,before) {
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
          var infos = data.infos;
          var pre = false;
          if (infos && infos.length >0) {
            var len = infos.length;
            for (var i=0; i<len; i++) {
              if (uid == infos[i].uid) {
                infos[i].flag = true;
              } else {
                infos[i].flag = false;
              }
              infos[i].ptHead = ptHead;
              infos[i].drHead = drHead;
            }
            _this.saveMsg(infos);
            //_this.makeTime();
          }
        } else {
          _this.tip(resp.desc);
        }
      }
    })
  },
  saveMsg(serverMsg) {
    var _this = this;
    var localMsg = [];
    wx.getStorage({
      key: 'msg',
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
        //重置数据
        _this.setData({
          chatLists: _this.data.chatLists,
          toView: 'list'+(_this.data.chatLists.last.seq)
        })
        //setStorage
        _this.setMsg(true,serverMsg);
      },
      fail: function(res) {
        //重置数据
        _this.setData({
          chatLists: _this.data.chatLists.concat(serverMsg),
          toView: 'list'+serverMsg[serverMsg.length-1].seq
        })
        //setStorage
        _this.setMsg(false)
      }
    })
  },
  setMsg: function(repeat,serverMsg) {
    wx.setStorage({
      key:"msg",
      data: repeat ? this.data.chatLists.concat(serverMsg) : this.data.chatLists,
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
    var drHead2 = "chatLists["+len+"].drHead";
    var seq = "chatLists["+len+"].seq"
    this.setData({
      [content2]: this.data.subInfo.content,
      [ctime2]: this.data.subInfo.ctime,
      [type2]: type,
      [flag2]: 1,
      [timeshow2]: this.data.subInfo.timeshow,
      [ptHead2]: ptHead,
      [seq]: this.data.chatLists[len-1].seq + 1,
      iptVal: '',
    })
    this.setData({
      toView: 'list'+ (this.data.chatLists[len-1].seq+1)
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
                  _this.addChat(2)
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
  previewImg:function(e){
    wx.previewImage({
      current: e.currentTarget.dataset.src, // 当前显示图片的http链接
      urls: [e.currentTarget.dataset.src] // 需要预览的图片http链接列表
    })
  },
  upper: function(e) {
    var i = 0;
    /*wx.getStorage({
      key: 'msg',
      success: function(res) {
        var msg = JSON.parse(res.data);
        var temMsg;
        var idx = (msg.length-1) - i*5
        if (msg.length>5) {
          temMsg = msg.splice(idx, 5);
        } else{
          temMsg = msg.splice(idx, msg.length);
        }
        /*this.setData({
          info: temMsg
        })
        console.log(temMsg)
        this.getData(msg[msg.length-1].seq,true);
      },
      fail: function(res) {
        this.tip('全都在这没有更多了');
      } 
    })*/
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
