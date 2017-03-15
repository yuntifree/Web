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
var wlanusermac = query.wlanusermac || '';
var wlanapmac = query.wlanapmac || '';
var firsturl = query.wlanuserfirsturl || 'http://www.baidu.com';
var autologin = 0;

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

(function() {
  font(true);
  String.prototype.trim = function() {
    return this.replace(/(^\s*)|(\s*$)/g, "");
  }
  var param = {
    wlanusermac: wlanusermac,
    wlanacname: wlanacname
  };
  var screenWidth = document.documentElement.clientWidth;
  CGI.get('check_login', param, function(resp) {
    if (resp.errno == 0) {
      var data = resp.data;
      autologin = data.autologin;
      if (isPC()) {
        if (autologin) {
          $('.login').append(template('tplPhone', {}));
        } else {
          $('.login').append(template('tplPc', {}));
        }
        var height = document.documentElement.clientHeight;
        $('html').css('height',height);
        $('.login').css('height','100%');
       } else {
        var height = 0.0;
        if (autologin) {
          $('.login').append(template('tplOnelogin', {}));
          $('.login').append(template('tplBottom', ads));
          height = screenWidth * (460/750);
        } else {
          $('.login').append(template('tplIptlogin', {}));
          $('.login').after(template('tplBottom', ads));
          height = screenWidth * (240/750);
        }  
        $('.login-top').css('height',height);
        setTimeout(function(){setHeight()},300);
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
   /*if(height < 500) {
       height = 520;
    }*/   
   $('html').css('height',height);
    $('.login-bottom').css('position','absolute');
    $('.login-bottom').css('left', 0);
    $('.login-bottom').css('bottom', 0);
  }
}


function initUI() {
  $('.ipt-phone').focus();
  JPlaceHolder.init();
  $('.query-code').click(getCode);
  if (isPC()) {
    $('.pc-btn').click(tripEnd);
  } else {
    $('.mob-btn').get(0).addEventListener('touchstart', tripStart, false);
    $('.mob-btn').get(0).addEventListener('touchend', tripEnd, false);
  }
}

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

function tripStart(e) {
  $('.btn').css('backgroundColor', '#0187ee');
}

function tripEnd(e) {
  $('.btn').css('backgroundColor', '#00a0fb');
  var param = {
    wlanacname: wlanacname,
    wlanuserip: wlanuserip,
    wlanacip: wlanacip,
    wlanusermac: wlanusermac,
    wlanapmac: wlanapmac
  };

  if (autologin) {
    oneClickLogin(param);
  } else {
    var phone = $('.ipt-phone').val().trim();
    var code = $('.ipt-code').val().trim();
    if (checkPhone(phone)) {
      param.phone = phone;
      if (code.length <= 0) {
        tipShow('请输入验证码');
      } else {
        param.code = code;
        portalLogin(param);
      }
    }
  }
}

function portalLogin(param) {
  CGI.get('portal_login', param, function(resp) {
    if (resp.errno === 0) {
      loginDone(resp.data);
    } else {
      //test
      tipShow(resp.desc);
      $('.ipt-code').val('');
      $('.ipt-code').focus('');
      $('.query-code').text('获取验证码');
      clearInterval(timer);
    }
  })
}

function oneClickLogin(param) {
  CGI.get('one_click_login', param, function(resp) {
    if (resp.errno === 0) {
      loginDone(resp.data);
    } else {
      //test
      tipShow(resp.desc);
    }
  })
}

function loginDone(info) {
  $('.ipt-phone').val('');
  $('.ipt-code').val('');
  var url = info.portaldir+"wifilink.html?uid=" + info.uid + '&token=' + info.token + '&wlanuserip='+ wlanuserip + '&wlanusermac='+ wlanusermac + '&wlanapmac='+ wlanapmac+'&ts=' + ~~((new Date()).getTime()/1000) + '&s=1';
  if (CGI.isIE()) {
    location.replace(firsturl);
    //window.open(firsturl, '_blank');
  } else {
    location.replace(url);
    //window.open(url, '_blank');
  }
}
