var query = CGI.query();
var wlanacname = query.wlanacname || '';//'2043.0769.200.00';
var wlanusermac = query.wlanusermac || '';//'f45c89987347';
var wlanapmac = query.wlanapmac || ''; 

var val = [];
var ids = '';
(function() {
  font(true);
  getIds();
  reportQues();
})()

function getIds() {
  $('.ipt-chk').bind('change', function(e) {
    var value = ~~($(this).get(0).value);
    if ($(this).get(0).checked) {
      val.push(value);
    } else {
      if (val.length > 0) {
        val.forEach(function(item,idx) {
          if (item === value) {
            val.splice(idx,1);
          } 
        })
      }
    }
  })
}

function reportQues() {
  $('.btn').click(function() {
    if (val.length <= 0) {
      tipShow('请至少选择一种您存在的问题');
      return false;
    }
    var contact = $('.ipt-contact').val().trim();
    if (contact.length <= 0) {
      tipShow('请输入您的联系方式');
      $('.ipt-contact').focus();
      return false;
    } else {
      if (!(~~contact)) {
        tipShow('请输入正确的联系方式');
        $('.ipt-contact').val('');
        $('.ipt-contact').focus();
        return false;
      }
    }
    var content = $('.ipt-content').val().trim();
    var param = {
      wlanapmac: wlanapmac,
      wlanusermac: wlanusermac,
      wlanacname: wlanacname,
      contact : contact,
      content: content,
      ids: val.join(',')
    }
    CGI.get('report_issue', param, function(resp) {
      if (resp.errno === 0) {
        tipShow('提交成功，谢谢您的反馈！');
        window.history.go(-1);
      } else {
        tipShow(resp.desc);
      }
    })
  })
}
function tipShow(val) {
  $('.tip-info').text(val);
  $('.tip-info').show();
  setTimeout(function() {
    $('.tip-info').hide();
  }, 1500);
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


