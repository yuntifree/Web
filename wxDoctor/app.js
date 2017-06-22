//app.js
App({
  onLaunch: function() {
    //调用API从本地缓存中获取数据
  },
  init: function(cb) {
    var that = this
    if (this.globalData.rawUserInfo) {
      typeof cb == "function" && cb(this.globalData.rawUserInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function(res) {
          // 获取信息
          wx.getUserInfo({
            success: function(res) {
              that.globalData.rawUserInfo = res;
            },
            fail: function(res) {
              that.showErrMsg('获取微信信息失败，请稍后重试~')
            }
          })

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
                typeof cb == "function" && cb();
              } else {
                that.showErrMsg(resp.desc)
              }
            },
            fail: function(res) {
              that.showErrMsg('服务器傲娇了~')
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
    editPt: {}, //修改就诊人信息
    ptHead: '../../images/doctor/ico_personal.png', //就诊人头像
    drHead: '../../images/doctor/ico_personal.png', //医生头像
    ptid: 2, //被选就诊人id
    drid: 1, //被选择医生id
    ptcid: 0, //就诊人卡片id
    failText: '网络请求失败'
  }
})
