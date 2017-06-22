//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    this.getUserInfo();
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo;
              console.log(res.userInfo);
              typeof cb == "function" && cb(that.globalData.userInfo);
            },
            fail: function (res) {
              console.log(res)
            }
          })
        }
      })
    }
  },
  onShow: function() {
    wx.redirectTo({
      url: './pages/index/index',
      success: function(res){
        console.log(res);
      },
      fail: function(res) {
        console.log(res);
      }
    })
  },
  globalData:{
    userInfo:null,
    tuid: 1, //医生id
    uid: 2,  //用户id
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