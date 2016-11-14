<style lang="scss">
@import './assets/css/reset.css','./assets/css/common.scss';
.invalid-goods {
  @include containerSize(2.12rem, 2.12rem);
  margin: 4.4rem auto 0;
  overflow: hidden;
}
.invalid-goods img{
  @include containerSize(100%, auto);
}
.error-text {
  font-size: 0.28rem;
  color: #434343;
  margin:0.1rem auto;
}
.error-desc {
  font-size: 0.24rem;
  color: #434343;
  line-height: 150%;
}
.return-index {
  display: block;
  font-size: 0.24rem;
  color: #3ac2f2;
  margin:0.4rem auto;
}
</style>
<template>
  <div id="err">
    <div class="invalid-goods"><img src="../static/error.png"></div>
    <p class="error-text g-tac">{{errortext}}</p>
    <p class="error-desc g-tac">{{errorDesc}}</p>
    <a class="return-index g-tac" href="/dgwifi/">&lt;&lt;返回首页</a>
  </div>
</template>
<script>
import CGI from './lib/cgi.js'

var query = CGI.query();
var num = ~~(query.errcode) || 1;
var text = ['出错了'];
var desc = ['The page or journal you are looking for cannot be found.']
var title = ['404'];
var errortext = text[num-1];
var errorDesc = desc[num-1];
export default {
  data() {
    return {
      errortext: errortext,
      errorDesc: errorDesc
    }
  },
  mounted() {
    document.title = title[num-1];
  },
}
  
</script>