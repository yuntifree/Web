var ajax = require('./ajax');

module.exports = {
    HOST: __DEV__ ? '' : 'http://120.25.133.234/',
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
            uid: ~~param.uid,
            data: param,
            web: 1,
            term: 2
        };

        var url = this.CGI + action;

        try {
            ajax({
                type: 'POST',
                url: url,
                contentType: 'application/json',
                dataType: 'json',
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
    setData: function(key, val) {
        key += '_yctv';
        localStorage.setItem(key, JSON.stringify(val));
    },

    //读取cookie
    getData: function(name) {
        name += '_yctv';
        var ret;
        try {
            ret = JSON.parse(localStorage.getItem(name));
        } catch (e) {
            console.log('JSON parse error');
        }
        return ret;
    },

    removeData: function(name) {
        name += '_yctv';
        localStorage.removeItem(name);
    },

    dateFormat: function(date, fmt) {
        var d = new Date(date);
        var o = {
            'M+': d.getMonth() + 1, //月份
            'd+': d.getDate(), //日
            'h+': d.getHours(), //小时
            'm+': d.getMinutes(), //分
            's+': d.getSeconds(), //秒
            'q+': Math.floor((d.getMonth() + 3) / 3), //季度
            //'S': d.getMilliseconds() //毫秒
        };

        //o['S'] = ('000' + o['S']).substr(('' + o['S']).length);

        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (d.getFullYear() + '').substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp('(' + k + ')').test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
        return fmt;
    },
    query: (function() {
        var url = window.document.location.href.toString();
        var u = url.split('?');
        if (typeof(u[1]) === 'string') {
            u = u[1].split('&');
            var get = {};
            for (var i in u) {
                var j = u[i].split('=');
                get[j[0]] = j[1];
            }
            return get;
        } else {
            return {};
        }
    })(),
};
