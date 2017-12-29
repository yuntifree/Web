/*var ads = {
  img: '../../images/act_banner.png',
  url: 'http://a.app.qq.com/o/simple.jsp?pkgname=com.yunxingzh.wireless',
  portalUrl: '',
}*/

//倒计时
var timer,
    query = CGI.query(),
    wlanacname = query.wlanacname || '', //'2043.0769.200.00';
    wlanuserip = query.wlanuserip || '', //'10.96.72.28';
    wlanacip = query.wlanacip || '', //'120.197.159.10';
    wlanusermac = query.wlanusermac || '',  //'f45c89987347';
    wlanapmac = query.wlanapmac || '',
    firsturl = query.wlanuserfirsturl || 'http://www.baidu.com', //'http://www.baidu.com';
    wlanssid = query.ssid || '',
    autologin = 0,
    taobao = 0,
    logintype = 0,  //1 微信  2淘宝  3App
    delay = 5,
    useragent = navigator.userAgent,
    canClick = true,
    appId = "",
    secretkey = "",
    timestamp = new Date().getTime(),　　　　 //时间戳(毫秒)
    shop_id = "",　　 //AP设备所在门店的ID
    authUrl = "", //认证服务端URL
    mac = query.wlanusermac || '',　　　 //用户手机mac地址 安卓设备必需
    ssid = "", //AP设备信号名称，非必须
    bssid = "",
    jumpUrl = "",
    connected = false,
    taobaoCover = {},
    data = {},
    notWxUrl = "",
    BtnHeight = 50;

var loginParam = {
  wlanacname: wlanacname,
  wlanuserip: wlanuserip,
  wlanacip: wlanacip,
  wlanusermac: wlanusermac,
  wlanapmac: wlanapmac,
  ssid: wlanssid
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
      var isIOS = useragent.match(/iphone|ipod|ipad/gi);
      var dpr = isIOS ? Math.min(window.devicePixelRatio, 3) : 1;
      dpr = window.top === window.self ? dpr : 1; //被iframe引用时，禁止缩放
      var scale = 1 / dpr;
      var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';

      $(docEl).data('dpr', dpr);
      var recalc = function() {
        var width = docEl.clientWidth;
        if (width / dpr > 750) {
          width = 750 * dpr;
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
    ssid: wlanssid
  };
  var screenWidth = document.documentElement.clientWidth;
  CGI.get('check_login', param, function(resp) {
    if (resp.errno == 0) {
      data = taobaoCover = resp.data;
      data.imgs = [];
      autologin = data.autologin;
      logintype = data.logintype;
      //autologin=1;
      //logintype = 3;
      appId = data.wxappid || 'wxbf43854270af39aa';
      shop_id = data.wxshopid || '4040455';
      secretkey = data.wxsecret || 'f1d41ba80597ee59b142032e16f801d9';
      authUrl = data.wxauthurl || 'http://wx.yunxingzh.com/auth';
      if (logintype !==1) notWxUrl = data.dst;
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
          var ads = false
          if (data.ads && data.ads.length>0) {
            data.imgs = data.ads;
            console.log(data.imgs);
            /*data.imgs1 = data.ads.splice(2,2);
            data.imgs2 = data.ads.splice(4,4);
            ads = true;*/
          }
          $('.login').append(template('tplOnelogin', data));
          setLognBtn(logintype);
          BtnHeight = $('.oneclick-bottom').outerHeight();
          /*$('.login-view').css('padding-bottom',BtnHeight);
          if (ads) {
            for(var i=0,len=data.imgs.length; i<len; i++) {
              swipe('#slide0',0,false);
            }
            for(var i=0,len=data.imgs1.length; i<len; i++) {
              swipe('#slideImgs'+i,i,true);
            }
            for (var i=0,leng=data.imgs2.length;i<leng;i++) {
              swipe('#slideview'+i,i,true);
            }
          }*/
        } else {
          //密码登录
          $('.login').append(template('tplIptlogin', data));
            //$('.login').append(template('tplBottom', ads));
            setLognBtn(logintype);
        }
        /*setTimeout(function() {
          setHeight()
        }, 300);*/
      }
      initUI();
    } else {
      tipShow(resp.desc);
    }
  });
})()
//设置轮播
function swipe(swipeName,idx,imgName) {
  $(swipeName).swipeSlide({
    lazyLoad : true,
    speed: 3000,
    firstCallback : function(i,sum,me){
        me.find('.dot').children().first().addClass('cur');
    },
    callback : function(i,sum,me){
        me.find('.dot').children().eq(i).addClass('cur').siblings().removeClass('cur');
    }
  })
}
//设置图片高度
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
//设置登录方式
function setLognBtn(type) {
  switch (type) {
    case 1:
      $('.hold-btn').css('background-color','#88d887');
      $('.btn-img-wechat').css('display','block');
      $('.btn-text').text('微信连WiFi');
      $('.btn').addClass('wx-btn');
      break;
    case 2:
      $('.hold-btn').css('background-color','#f7b069');
      $('.btn-text').text('淘宝连WiFi');
      $('.btn').addClass('tb-btn');
      break;
    case 3:
      $('.hold-btn').css('background-color','#6cc6f9');
      $('.btn-text').text('官方APP连WiFi');
      $('.btn').addClass('app-btn');
      $('.app-text-tip').css({'display': 'block'});
      $('.has-ques').addClass('g-tac')
      break;
  }
}

//渲染页面
function initUI() {
  $('.ipt-phone').focus();
  JPlaceHolder.init();
  $('.query-code').click(getCode);
  if (isPC()) {
    $('.pc-one-btn').click(pcOneClick);
    $('.pc-reg-btn').click(pcRegClick);
  } else {
    if (autologin) {
      var btnText = $('#btn-login').text()
      if (delay) {
        var t = setInterval(function() {
          delay--;
          $('#btn-login').text('(' + delay + ')')
          if (delay == 0) {
            $('.login-view').css('padding-bottom',0);
            $('.min5-view').css('display','block');
            $('.min5-view').css('padding-bottom',BtnHeight);
            $('#btn-login').text('')
            $('.min5-btn').get(0).addEventListener('touchstart', touchStart, false);
            $('.min5-btn').get(0).addEventListener('touchend', mobOneClick, false);
          }
        },1000);
      } else {
        $('.min5-btn').get(0).addEventListener('touchstart', touchStart, false);
        $('.min5-btn').get(0).addEventListener('touchend', mobOneClick, false);
      }
      // 发送自动认证请求, 不调用微信
      // oneClickLogin(true, false);
    } else {
      $('.mob-btn').get(0).addEventListener('touchstart', touchStart, false);
      $('.mob-btn').get(0).addEventListener('touchend', mobRegClick, false);
    }
  }
  $('.has-ques').click(getQues)
}
//判断客户端 pc
function isPC() {
  //var userAgentInfo = navigator.userAgent;
  var Agents = ["Android", "iPhone",
    "SymbianOS", "Windows Phone",
    "iPad", "iPod"
  ];
  var flag = true;
  for (var v = 0; v < Agents.length; v++) {
    if (useragent.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
}
//tip 显示
function tipShow(val) {
  $('.tip-info').text(val);
  $('.tip-info').show();
  setTimeout(function() {
    $('.tip-info').hide();
  }, 1500);
}
//验证手机号
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
//点击颜色变色
function touchStart(e) {
  var startColor,endColor;
  switch (logintype) {
    case 1:
     startColor = '#42bd40';
     endColor = '#19A717';
     break;
    case 2:
      startColor = '#f93';
      endColor = '#F5800B';
      break;
    case 3:
      startColor = '#0099f0';
      endColor = '#3bb6fc';
      break;
  }
  $('.btn').css('backgroundColor', endColor);
  setTimeout(function() {$('.btn').css('backgroundColor', startColor);}, 300);
}

function pcRegClick(e) {
  if (canClick) {
    disableButton();
    regClick(false);
  }
}

function mobRegClick(e) {
  if (canClick) {
    disableButton();
    switch (logintype) {
      case 1:
        regClick(true);
        break;
      case 2:
      case 3:
        regClick(false);
    }
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
    switch (logintype) {
      case 1:
        oneClickLogin(false, true);
        break;
      case 2:
      case 3:
        oneClickLogin(false, false);
        break;
    }
  }
}

function regClick(wx) {
  var phone = $('.ipt-phone').val().trim();
  var code = $('.ipt-code').val().trim();
  if (checkPhone(phone)) {
    var param = loginParam;
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
      if (isPC()) {
        if (CGI.isIE()) {
          location.replace(firsturl);
        } else {
          location.replace(jumpUrl);
        }
      } else {
        if (wx) {
          callWeixin();
        } else if (logintype==2){
          countdown();
        } else if (logintype == 3) {
          callApp();
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
  CGI.get('one_click_login', loginParam, function(resp) {
    if (resp.errno === 0) {
      // 局部刷新，通知iOS能上网了
      genJumpUrl(resp.data);
      sendTest();
      connected = true;
      if (!auto) {
        // 如果需要，调用微信
        if (isPC()) {
          if (CGI.isIE()) {
            location.replace(firsturl);
          } else {
            location.replace(jumpUrl);
          }
        } else {
          if (callWX) {
            callWeixin();
          } else if (logintype == 2) {
            countdown()
          } else if (logintype == 3) {
            callApp();
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

//按钮是否可点击
function disableButton() {
  canClick = false;
  setTimeout(function() {
    canClick = true;
  }, 3000)
}

// 淘宝登录 图片显示倒计时
function countdown() {
  $('.login-view').css('display','none');
  $('.login').css('top','0');
  $('.login').append(template('tplCover', taobaoCover));
  var text = 3;
  var timer = setInterval(function() {
    if (text > 0) {
      text--;
      $('.time-count').text(text);
      if(text == 1) {
        callTaobao()
      }
    }
  },1000);
  $('.tao-link').click(function() {
    clearInterval(timer);
    callTaobao();
  })
}
//taobao
function callTaobao() {
  location.replace(notWxUrl);
}
//App登录
function callApp() {
  var isAndroid = useragent.indexOf('Android') > -1 || useragent.indexOf('Adr') > -1; //android终端
  var isiOS = !!useragent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  if (isAndroid) {
    var ifr = document.createElement('iframe');
    ifr.src = 'dgwireless://';
    ifr.style.display = 'none';
    document.body.appendChild(ifr);
    window.setTimeout(function(){
        document.body.removeChild(ifr);
        location.replace(notWxUrl);
    },2000)
  }
  if (isiOS) {
    location.replace('dgwireless://');
    window.setTimeout(function() {
      location.replace(notWxUrl);
    }, 2000)
  }
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
  var extend = [wlanacname, wlanuserip, wlanacip, wlanusermac, wlanapmac,appId].join(',');　　　 //开发者自定义参数集合
  var sign = md5(appId + extend + timestamp + shop_id + authUrl + mac + ssid + bssid + secretkey);
  Wechat_GotoRedirect(appId, extend, timestamp, sign, shop_id, authUrl, mac, ssid, bssid);
}

function getQues() {
  var url = 'http://120.76.236.185/wx/h5/question.html?wlanacname=' + wlanacname +
    '&wlanusermac=' + wlanusermac + '&wlanapmac=' + wlanapmac + '&ts=' + (new Date()).getTime();
  location.href = url;
}
