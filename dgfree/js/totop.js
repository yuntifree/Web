(function() {
  var screenHeight = window.screen.availHeight;
    window.onscroll = function(){ 
      var t = document.documentElement.scrollTop || document.body.scrollTop; 
      var top_div = document.getElementById( "toTop" ); 
      if( t >= 200 ) { 
          top_div.style.display = "block"; 
          top_div.onclick = function() {
            document.getElementById('nav').scrollIntoView();
          }
      } else { 
          top_div.style.display = "none"; 
      } 
    }
  $('.contact-btn').click(function() {
    $(this).css({'background-color':'#447fe4'})
    //$(this).css({'color':'#5097f5'});
    var wifi = $('input[name="wifi"]:checked').val();
    var ads = $('.ipt-ads').val().trim();
    var phone = $('.ipt-phone').val().trim();
    console.log(ads + ',' +phone);
    if (ads.length <= 0) {
        tipShow('请输入单位地址')
    } else {
      if (phone.length <=0 ) {
        tipShow('请输入联系方式')
      } else {
        if (CGI.checkTel(phone)) {
          var param = {
            wifi: ~~wifi,
            address: ads,
            phone: phone
          }
          CGI.post('submit_unit_info', param, function(resp) {
            if (resp.errno === 0) {
              $('.ipt-ads').val('');
              $('.ipt-phone').val('');
              tipShow('提交成功')
            } else {
              tipShow(resp.desc)
            }
          })
        } else {
          console.log('124');
          tipShow('请输入正确的联系方式')
        }
      }
    }
    setTimeout(function() {
      $('.contact-btn').css({'background-color':'#5097f5'});
    },1000)
  })
})()

function tipShow(val) {
  $('.tip-text').text(val);
  $('.tip-text').addClass('block');
  setTimeout(function() {
    $('.tip-text').text('');
    $('.tip-text').removeClass('block');
  },3000)
}