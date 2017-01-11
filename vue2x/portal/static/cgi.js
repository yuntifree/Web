var ajax = $.ajax;
var __DEV__ = true;
window.CGI = {
    HOST: __DEV__ ? '' : 'http://120.76.236.185/',
    CGI: '/',

    /**
     * HTTP Get for cgi
     */

    get: function(action, param, callback) {
        var url = this.HOST + this.CGI + action + '?' + this.makeParam(param);
        var opt = {
            type: 'GET',
            url: url,
            contentType: 'application/json',
            cache: false,
            timeout: 2000,
            dataType: 'jsonp',
            jsonp: 'callback',
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
        } catch(e) {
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
        } catch(e) {
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
    query: function() {
        //var url = window.document.location.search.toString().substr(1);
        var url = window.document.location.href.toString();
        url = url.substr(url.indexOf('?')+1);
        if (typeof(url) === 'string') {
            var u = url.split('&');
            var get = {};
            for (var i in u) {
                if (typeof(u[i]) === 'string') {
                    var j = u[i].split('=');
                    get[j[0]] = j[1];
                }
            }
            return get;
        } else {
            return {};
        }
    },
    checkTel: function(tel) {
      //var isPhone = /^([0-9]{3,4})?[0-9]{7,8}$/;
      var isMob = /^((\+?86)|(\(\+86\)))?(1[0-9]{10})$/;
      //var isNum=/^\+?[1-9][0-9]||isNum.test(tel)*$/;
      var ret = isMob.test(tel);
      return ret;
    },

    setCookie: function(key, val, min) {
        var t = new Date();
        t.setTime(t.getTime() + min * 60 * 1000);
        document.cookie = key + "=" + escape(val) + ";path=/" + (min === 0 ? "" : ";expires=" + t.toGMTString());
    },

    //读取cookie
    getCookie: function(name) {
        var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
        if (arr !== null)
            return unescape(arr[2]);
        return null;
    }
};
