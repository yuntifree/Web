window.wxutil = {


  init: function(callback) {
    // check wx


    if (window.wx === undefined || window.wx_cfg === undefined) {
      console.log('wx init failed');
      return null;
    }

    wx_cfg.debug = true;
    wx_cfg.jsApiList = [
      'checkJsApi',
      'onMenuShareTimeline',
      'onMenuShareAppMessage',
      'onMenuShareQQ',
      //'getLocation',
      // 'onMenuShareWeibo',
      // 'onMenuShareQZone',
      // 'chooseImage',
      // 'previewImage',
      // 'uploadImage',
      // 'downloadImage',
      //'chooseWXPay'
    ];
    wx.config(wx_cfg);
    console.log(callback);
    if (callback) {
      // 设置一个标记
      wx.ok = false;
      wx.ready(callback);
    }

    wx.error(function(res) {
      if (wx_cfg.debug) {
        alert(res.errMsg);
      }
    });
    return this;


  },
};
