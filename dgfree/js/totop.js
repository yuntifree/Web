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
})()