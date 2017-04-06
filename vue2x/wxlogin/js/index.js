var ads = {
  img: 'images/act_banner.png',
  url: 'http://a.app.qq.com/o/simple.jsp?pkgname=com.yunxingzh.wireless',
  portalUrl: '',
}

//倒计时
var timer;

var query = CGI.query();
var wlanacname = query.wlanacname || ''; //'2043.0769.200.00';
var wlanuserip = query.wlanuserip || ''; //'10.96.72.28';
var wlanacip = query.wlanacip || ''; //'120.197.159.10';
var wlanusermac = query.wlanusermac || ''; //'f45c89987347';
var wlanapmac = query.wlanapmac || '';
var firsturl = query.wlanuserfirsturl || 'http://www.baidu.com'; //'http://www.baidu.com';
var autologin = 0;
//var useragent = navigator.userAgent;
var canClick = true;

//
var appId = "";
var secretkey = "";
var extend = [wlanacname, wlanuserip, wlanacip, wlanusermac, wlanapmac].join(',');　　　 //开发者自定义参数集合
var timestamp = new Date().getTime();　　　　 //时间戳(毫秒)
var shop_id = "";　　 //AP设备所在门店的ID
var authUrl = ""; //认证服务端URL
var mac = query.wlanusermac || '';　　　 //用户手机mac地址 安卓设备必需
var ssid = ""; //AP设备信号名称，非必须
var bssid = "";
var jumpUrl = "";
var connected = false;


var loginParam = {
  wlanacname: wlanacname,
  wlanuserip: wlanuserip,
  wlanacip: wlanacip,
  wlanusermac: wlanusermac,
  wlanapmac: wlanapmac
};

function errorJump() {
  if (jumpUrl.length > 0) {
    location.replace(jumpUrl);
  }
}

//判断浏览器类型
var JPlaceHolder = {
  //检测
  _check: function() {
    return 'placeholder' in document.createElement('input');
  },
  //初始化
  init: function() {
    if (!this._check()) {
      this.fix();
    }
  },
  //修复
  fix: function() {
    jQuery(':input[placeholder]').each(function(index, element) {
      var self = $(this),
        txt = self.attr('placeholder');
      self.wrap($('<div></div>').css({
        position: 'relative',
        zoom: '1',
        border: 'none',
        background: 'none',
        padding: 'none',
        margin: 'none'
      }));
      var pos = self.position(),
        h = self.outerHeight(true),
        paddingleft = self.css('padding-left');
      var holder = $('<span></span>').text(txt).css({
        position: 'absolute',
        left: pos.left,
        top: pos.top,
        height: h,
        lienHeight: h + 'px',
        paddingLeft: paddingleft,
        paddingTop: 5 + 'px',
        color: '#c8c8c8'
      }).appendTo(self.parent());
      self.focusin(function(e) {
        holder.hide();
      }).focusout(function(e) {
        if (!self.val()) {
          holder.show();
        }
      });
      holder.click(function(e) {
        holder.hide();
        self.focus();
      });
    });
  }
};

function font(bFont) {
  if (document && window) {
    // init font
    if (bFont) {
      var docEl = document.documentElement;
      var isIOS = navigator.userAgent.match(/iphone|ipod|ipad/gi);
      var dpr = isIOS ? Math.min(window.devicePixelRatio, 3) : 1;
      dpr = window.top === window.self ? dpr : 1; //被iframe引用时，禁止缩放
      var scale = 1 / dpr;
      var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';

      $(docEl).data('dpr', dpr);
      var recalc = function() {
        var width = docEl.clientWidth;
        if (width / dpr > 640) {
          width = 640 * dpr;
        }
        docEl.style.fontSize = 100 * (width / 750) + 'px';
      };
      recalc();
      if (!document.addEventListener) return;
      window.addEventListener(resizeEvt, recalc, false);
    }
  }
}

// -----------------------------------
(function() {
  font(true);
  String.prototype.trim = function() {
    return this.replace(/(^\s*)|(\s*$)/g, "");
  }
  var param = {
    wlanusermac: wlanusermac,
    wlanacname: wlanacname,
    wlanapmac: wlanapmac,
  };
  var screenWidth = document.documentElement.clientWidth;
  CGI.get('check_login', param, function(resp) {
    if (resp.errno == 0) {
      var data = resp.data;
      autologin = data.autologin;
      appId = data.wxappid;
      shop_id = data.wxshopid;
      secretkey = data.wxsecret;
      authUrl = data.wxauthurl
      if (isPC()) {
        if (autologin) {
          $('.login').append(template('tplPhone', {}));
        } else {
          $('.login').append(template('tplPc', {}));
        }
        var height = document.documentElement.clientHeight;
        $('html').css('height', height);
        $('.login').css('height', '100%');
      } else {
        if (autologin) {
          $('.login').append(template('tplOnelogin', data));
          $('.login').append(template('tplBottom', ads));
        } else {
          //验证码登录
          /*$('.login').append(template('tplIptlogin', data));
          $('.login').append(template('tplBottom', ads));*/
          $('.login').append(template('tplOnelogin', data));
          $('.login').append(template('tplBottom', ads));
        }
        setTimeout(function() {
          setHeight()
        }, 300);
      }
      initUI();
    } else {
      tipShow(resp.desc);
    }
  });
})()

function setHeight() {
  var height = document.documentElement.clientHeight;
  var htmlHeight = $('html').height();
  if (height > htmlHeight) {
    $('html').css('height', height);
    $('.login-bottom').css('position', 'absolute');
    $('.login-bottom').css('left', 0);
    $('.login-bottom').css('bottom', 0);
  }
}

function initUI() {
  $('.ipt-phone').focus();
  JPlaceHolder.init();
  $('.query-code').click(getCode);
  if (isPC()) {
    $('.pc-one-btn').click(pcOneClick);
    $('.pc-reg-btn').click(pcRegClick);
  } else {
    if (autologin) {
      $('.wx-btn').get(0).addEventListener('touchstart', touchStart, false);
      $('.wx-btn').get(0).addEventListener('touchend', mobOneClick, false);
      // 发送自动认证请求, 不调用微信
      // oneClickLogin(true, false);
    } else {
      $('.wx-btn').get(0).addEventListener('touchstart', touchStart, false);
      $('.wx-btn').get(0).addEventListener('touchend', mobOneClick, false);
      //验证码登录
     /* $('.mob-btn').get(0).addEventListener('touchstart', touchStart, false);
      $('.mob-btn').get(0).addEventListener('touchend', mobRegClick, false);*/
    }
  }
  $('.has-ques').click(getQues)
}

function isPC() {
  var userAgentInfo = navigator.userAgent;
  var Agents = ["Android", "iPhone",
    "SymbianOS", "Windows Phone",
    "iPad", "iPod"
  ];
  var flag = true;
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
}

function tipShow(val) {
  $('.tip-info').text(val);
  $('.tip-info').show();
  setTimeout(function() {
    $('.tip-info').hide();
  }, 1500);
}

function checkPhone(phone) {
  var ret = false;
  if (phone.length <= 0) {
    tipShow('请先输入手机号');
  } else {
    ret = CGI.checkTel(phone);
    if (!ret) {
      tipShow('请输入正确的手机号');
    }
  }
  return ret;
}

//获取手机验证码
function getCode() {
  //alert('验证码')
  var phone = $('.ipt-phone').val().trim();
  if (!checkPhone(phone)) return;
  var param = {
    phone: phone,
    wlanacname: wlanacname
  };
  CGI.get('get_check_code', param, function(resp) {
    if (resp.errno === 0) {
      tipShow('获取成功');
      var seconds = 60;
      timer = setInterval(function() {
        seconds--;
        var timeTxt = ((seconds < 10) ? "0" + seconds : seconds) + "s"
        $('.query-code').text(timeTxt);
        if (seconds == 0) {
          $('.query-code').text('获取验证码');
          clearInterval(timer);
        };
      }, 1000)
    } else {
      tipShow(resp.desc);
    }
  });
}

function touchStart(e) {
  $('.btn').css('backgroundColor', '#19A717');
  setTimeout(function() {$('.btn').css('backgroundColor', '#42bd40');}, 300);
}

function pcRegClick(e) {
  if (canClick) {
    disableButton();
    regClick(false);
  }
}

function mobRegClick(e) {
  if (canClick) {
    /*disableButton();
    regClick(true);*/
    disableButton();
    oneClickLogin(false, true);
  }
}

function pcOneClick(e) {
  if (canClick) {
    disableButton();
    oneClickLogin(false, false);
  }
}

function mobOneClick(e) {
  if (canClick) {
    disableButton();
    oneClickLogin(false, true);
  }
}

function regClick(wx) {
  var param = loginParam;
  var phone = $('.ipt-phone').val().trim();
  var code = $('.ipt-code').val().trim();
  if (checkPhone(phone)) {
    param.phone = phone;
    if (code.length <= 0) {
      tipShow('请输入验证码');
    } else {
      param.code = code;
      portalLogin(param, wx);
    }
  } else {
    // tip in checkphone
  }
}

function portalLogin(param, wx) {
  CGI.get('portal_login', param, function(resp) {
    if (resp.errno === 0) {
      genJumpUrl(resp.data);
      connected = true;
      sendTest();
      if (wx) {
        callWeixin();
      } else {
        if (CGI.isIE()) {
          location.replace(firsturl);
        } else {
          location.replace(jumpUrl);
        }
      }
    } else {
      // 验证码
      tipShow(resp.desc);
      $('.ipt-code').val('');
      $('.ipt-code').focus('');
      $('.query-code').text('获取验证码');
      clearInterval(timer);
    }
  })
}

/**
 * [oneClickLogin description]
 * @param  {[type]} auto   是否自动点击
 * @param  {[type]} callWX 是否调用微信
 */
function oneClickLogin(auto, callWX) {
  var param = loginParam;
  //CGI.get('one_click_login', param, function(resp) {
  CGI.get('unify_login', param, function(resp) {
    if (resp.errno === 0) {
      // 局部刷新，通知iOS能上网了
      genJumpUrl(resp.data);
      sendTest();
      connected = true;
      if (!auto) {
        // 如果需要，调用微信
        if (callWX) {
          callWeixin();
        } else {
          if (CGI.isIE()) {
            location.replace(firsturl);
          } else {
            location.replace(jumpUrl);
          }
        }
      } else {
        // do nothing
      }
    } else {
      tipShow(resp.desc);
    }
  })
}

function callWeixin() {
  if (connected) {
    callWechatBrowser();
    setTimeout(function() {
      errorJump();
    }, 3000)
  } else {
  }
}

function disableButton() {
  canClick = false;
  setTimeout(function() {
    canClick = true;
  }, 3000)
}

// make apple happy!
function sendTest() {
  $('body').append(template('apple', {}));
}

function genJumpUrl(info) {
  $('.ipt-phone').val('');
  $('.ipt-code').val('');
  var dir = info.portaldir;
  var paramCode = "?uid=" + info.uid + '&token=' + info.token + '&adtype=' + info.adtype + '&portaltype=' + info.portaltype + '&ts=' + ~~((new Date()).getTime() / 1000) + '&s=1'
  if (!info.portaltype) {
    if (dir.indexOf('.html') === -1) {
      dir = info.portaldir + '/wifilink.html'
    }
  }
  jumpUrl = dir + paramCode;
}

function callWechatBrowser() {
  var sign = md5(appId + extend + timestamp + shop_id + authUrl + mac + ssid + bssid + secretkey);
  Wechat_GotoRedirect(appId, extend, timestamp, sign, shop_id, authUrl, mac, ssid, bssid);
}

function getQues() {
  var url = 'http://120.76.236.185/wx/h5/question.html?wlanacname=' + wlanacname +
    '&wlanusermac=' + wlanusermac + '&wlanapmac=' + wlanapmac + '&ts=' + (new Date()).getTime();
  location.href = url;
}
