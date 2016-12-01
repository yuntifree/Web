<template>
  <div class="mana_container">
    <article class="module width_3_quarter">
      <div class="upload-img-box">
        <uploader></uploader>

        <div class="container-flow">
          <div class="row">
            <div class="col-sm-2">图片地址：</div>
            <div class="clo-sm-10">{{imgUrl}}</div>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>
<script>
  import uploader from '../lib/uploader.vue'
  import CGI from '../../lib/cgi.js'

  export default{
    data(){
      return {
        imgUrl: '',
      }
    },
    components: {
      uploader,
    },
    /*events: {
      'upload-done': function(imageUrl) {
        this.imgUrl = imageUrl;
      },
    }*/
  }
</script>
<style>
  .upload-img-box {
    padding: 20px 50px;
  }
  .upload-img-box .container-flow {
    margin-top: 20px;
  }
</style>
