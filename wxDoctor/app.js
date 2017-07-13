//app.js
App({
  onLaunch: function(option) {
    //调用API从本地缓存中获取数据
    this.globalData.scene = ~~option.scene
  },
  onShow: function(option) {
    this.globalData.scene = ~~option.scene
  },
  init: function(cb) {
    var that = this
    if (this.globalData.rawUserInfo) {
      typeof cb == "function" && cb()
    } else {
      //调用登录接口
      wx.login({
        success: function(res) {
          // 提交code
          wx.request({
            url: that.globalData.reqUrl + 'submit_code',
            method: 'POST',
            header: {
              'content-type': 'application/json'
            },
            data: {
              data: {
                code: res.code
              }
            },
            success: function(res) {
              var resp = res.data;
              if (resp.errno ===0) {
                that.globalData.userData = resp.data;
                typeof cb == "function" && cb()
              } else {
                that.showErrMsg(resp.desc)
              }
            },
            fail: function(res) {
              that.showErrMsg('服务器傲娇了~')
            }
          })
          // 获取头像
          wx.getUserInfo({
            success: function(res) {
              that.globalData.rawUserInfo = res;
            },
            fail: function(res) {
              that.showErrMsg('获取微信信息失败，请稍后重试~')
            }
          })
        },
        fail: function() {
          that.showErrMsg('微信登陆失败，请稍后重试~')
        }
      })
    }
  },
  showErrMsg: function(msg) {
    console.log('微信登陆失败，请稍后重试~')
    wx.showToast({
      title: msg,
      icon: 'fail',
      duration: 1500
    })
  },
  globalData: {
    rawUserInfo: null,
    userData: null,
    tuid: 1, //医生id
    uid: 2, //用户id
    token: 'test',
    reqUrl: 'https://api.yunxingzh.com/inquiry/',
    hasrelation: 0, //是否有绑医生/病人
    haspatient: 0, //是否有绑病患卡片（病人端）
    editPt: {}, //修改咨询者信息
    ptHead: '../../images/doctor/ico_personal.png', //咨询者头像
    drHead: '../../images/doctor/ico_personal.png', //医生头像
    ptid: 2, //被选咨询者id
    drid: 1, //被选择医生id
    ptcid: 0, //咨询者卡片id
    failText: '网络请求失败',
    scene: 0
  }
})
