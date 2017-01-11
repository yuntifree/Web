require('./assets/css/index.css')
require('./common/zepto.min.js');
var CGI = require('./lib/cgi.js')
var template = require('./common/template.js');

var ads = {
  img: '../dist/static/images/act_banner.png',
  url: 'http://a.app.qq.com/o/simple.jsp?pkgname=com.yunxingzh.wireless'
}
//倒计时
var timer;

window.alert(1);
//console bug
window.console = window.console || {  
    log: function(){},
}

var query = CGI.query();
var wlanacname = query.wlanacname || '';  //'2043.0769.200.00';
var wlanuserip = query.wlanuserip || '';  //'10.96.72.28';
var wlanacip = query.wlanacip || ''; //'120.197.159.10';
var wlanusermac = query.wlanusermac || '';

//本地存储的号码与验证码
var sessionPhone = localStorage.portal_phone || '';
var sessionCode = localStorage.portal_code || '';

(function() {
	if (isPC()) {
		var height = $(window).height();
		$('html').css('height', height);
		if ((sessionPhone && sessionCode)) {
			$('.login').append(template('tplPcone',{}));
		} else {
			$('.login').append(template('tplPc',{}));
		}
	} else {
		var height = window.screen.availHeight;
		$('html').css('height', height);
		if ((sessionPhone && sessionCode)) {
			$('.login').append(template('tplOnelogin', {}));
			$('.login').append(template('tplBottom', ads));
		} else {
			$('.login').append(template('tplIptlogin', {}));
			$('.login').after(template('tplBottom', ads));
		}
	}
	//是否是一键登录
	initUI()
})()

function initUI() {
	font(true);
	$('.query-code').click(getCode);
	$('.btn').click(startTrip);
  $('.app-ads').click(appDownload)
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
	var phone = $('.ipt-phone').val().trim();
	if (!checkPhone(phone)) return;
  var param = {
  	phone: phone
  };
  CGI.post('get_check_code', param, (resp)=> {
    if (resp.errno === 0) {
      tipShow('获取成功');
      var seconds = 60;
      timer = setInterval(()=> {
        seconds--;
        var timeTxt = ((seconds < 10) ? "0" + seconds : seconds) + "s"
        $('.query-code').text(timeTxt);
        if (seconds == 0) {
          $('.query-code').text('获取验证码');
          clearInterval(timer);
        };
      }, 1000)
    } else  {
      this.alertInfo(resp.desc);
    }
  });
}

function startTrip() {
	var param = {
	  wlanacname: wlanacname,
	  wlanuserip: wlanuserip,
	  wlanacip: wlanacip,
	  wlanusermac: wlanusermac,
	};
	var phone = $('.ipt-phone').val().trim();
	var code = $('.ipt-code').val().trim();

	if (sessionPhone && sessionCode) {
	  param.phone = sessionPhone;
	  param.code = sessionCode;
	  portalLogin(param);
	} else {
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
	CGI.post('portal_login', param, (resp)=> {
	  if (resp.errno === 0) {
	  	if (window.localStorage) {
	  		localStorage.portal_phone = param.phone;
	  		localStorage.portal_code = param.code;
	  	}
	    var info = resp.data;
	    var url = "http://yunxingzh.com/dist/wifilink.html?loginfrom=true&uid=" + info.uid + '&token=' +info.token +'&s=1';
	    location.href = url;
	  } else {
	  	tipShow(resp.desc);
	  	$('.ipt-code').val('');
	  	$('.query-code').text('获取验证码');
	  	clearInterval(timer);
	  	$('.ipt-code').focus();
	  }
	})
}

function appDownload() {
  location.href = ads.url;
}


