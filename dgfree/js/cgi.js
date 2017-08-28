var ajax = $.ajax;
//var __DEV__ = true;
window.CGI = {
  HOST: 'http://120.25.133.234/',
  CGI: '/',

  /**
   * HTTP Get for cgi
   */

  get: function(action, param, callback) {
    var  url = this.HOST + action + '?term=2&' +this.makeParam(param);
    var opt = {
      type: 'GET',
      url: url,
      contentType: 'application/json',
      cache: false,
      timeout: 5000,
      dataType: 'jsonp',
      //jsonp: 'callback',
      success: function(data) {
        callback(data);
      },
      error: function(req, text) {
        callback({
          errno: 99,
          desc: '网络有些慢，请稍后重试:' + text
        });
      }
    };
    // call ajax
    try {
      ajax(opt);
    } catch (e) {
      console.log(JSON.stringify(e));
    }
  },

  /**
   * HTTP Post
   */

  post: function(action, param, callback) {
    var p = {
      data: param
    };

    var url = this.CGI + action;

    try {
      ajax({
        type: 'POST',
        url: url,
        contentType: 'application/json',
        dataType: 'json',
        timeout: 5000,
        data: JSON.stringify(p),
        success: function(data) {
          callback(data);
        },
        error: function() {
          callback({
            errno: 99,
            desc: '网络有些慢，请稍后重试~'
          });
        }
      });
    } catch (e) {
      console.log(JSON.stringify(e));
    }
  },

  /**
   * make get param
   */

  makeParam: function(param) {
    var ret = [];
    for (var idx in param) {
      ret.push(idx + '=' + encodeURIComponent(param[idx]));
    }
    return ret.join('&');
  },
  checkTel: function(tel) {
    var isPhone = /^([0-9]{3,4})?[0-9]{7,8}$/;
    var isMob = /^((\+?86)|(\(\+86\)))?(1[0-9]{10})$/;
    //var isNum=/^\+?[1-9][0-9]||isNum.test(tel)*$/;
    var ret = isMob.test(tel) || isPhone.test(tel);
    return ret;
  }
}
