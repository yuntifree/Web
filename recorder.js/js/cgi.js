var ajax = $.ajax;
//var __DEV__ = true;
window.CGI = {
  //HOST: 'http://120.25.133.234/',
  HOST: 'http://120.76.236.185/',
  CGI: '/',

  /**
   * HTTP Get for cgi
   */

  get: function(action, param, callback) {
    var  url = this.HOST + action +'?' +this.makeParam(param);
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
      data: param,
      term: 2,
      version: 1
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
  }
};
