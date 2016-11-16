<style scope>
@import '../../assets/css/reset.css';
.maptip {
  width: 4.86rem;
  height: auto;
  position: absolute;
  top:0;
  left: 50%;
  transform:translateX(-50%);
  margin-top:1rem;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.5);
  border-radius:0.12rem;
}
.maptip-tit {
  padding: 0.36rem 0.32rem 0.2rem 1.1rem;
  position: relative;
  color:#313131;
  font-size: 0.24rem;
}
.maptip-tit:before {
  display: block;
  content: '';
  width: 0.7rem;
  height: 0.7rem;
  background: url('../../assets/images/icon_WiFi.png');
  background-size: contain;
  position: absolute;
  top:0.32rem;
  left:0.32rem;
}
.maptip-info {
  width: 100%;
  padding: 0.36rem 0.32rem 0.2rem 0.32rem;
  line-height: 0.4rem;
}
.maptip-msg {
  width: 65%;
  padding-left: 0.4rem;
  position: relative;
  font-size: 0.2rem;
  color:#b4b4b4;
}
.maptip-msg:before {
  display: block;
  content: '';
  width: 0.4rem;
  height: 0.4rem;
  background: url('../../assets/images/ico_location.png');
  background-size: contain;
  position: absolute;
  top:0;
  left:0;
}
.maptip-dist {
  padding-left:0.4rem;
  position: relative;
}
.maptip-dist:before {
  display: block;
  content: '';
  width: 0.4rem;
  height: 0.4rem;
  background: url('../../assets/images/ico_walk.png');
  background-size: contain;
  position: absolute;
  top:0;
  left:0;
}
.tip-val {
  line-height: 0.4rem;
  font-size: 0.2rem;
  color: #b4b4b4;
  background-color: #e5f3fb;
}
/*.map-triangle{
  display: inline-block;
  width: 0.4rem;
  height: 0.4rem;
  position: absolute;
  bottom: -0.36rem;
  left: 50%;
  margin-left: -0.2rem;
}

.map-triangle em,
.map-triangle b{
  width: 0;
  height: 0;
  border-width:.2rem .2rem  0 .2rem;
  border-style: solid dashed dashed dashed ;
  border-color: #e5f3fb transparent transparent  transparent;
  position: absolute;
  top: .03rem;
  left: .2rem;
}*/

</style>

<template>
<div class="maptip" v-show="show" transition="fade">
  <p class="maptip-tit">东莞免费WIFI</p>
  <div class="maptip-info g-clearfix">
    <p class="maptip-msg g-ellipsis g-fl">{{tipinfo.msg || '暂无地理位置信息'}}</p>
    <p class="maptip-dist g-fr g-tar">{{dist}}</p>
  </div>
  <p class="tip-val g-tac">前往此处，在WIFI列表里有免费WIFI可连</p>
  <!--span class="map-triangle"><b></b><em></em></span-->
</div>
</template>

<script>
export default {
  props: {
    tipinfo: {
      msg: String,
      duration: Number,
      show: Boolean,
      distance: Number,
    }
  },
  computed: {
    show() {
      return this.tipinfo.show;
    },
    dist() {
      var ret;
      if (this.tipinfo.distance>1000) {
        ret = (this.tipinfo.distance/1000).toFixed(2) + 'km';
      } else {
        ret = this.tipinfo.distance+'m';
      }
      return ret;
    }
  },
  watch: {
    show(val) {
      console.log(val);// +','+!!this.tipinfo.duration)
      if (this._timeout) clearTimeout(this._timeout);
      if (val && !!this.tipinfo.duration) {
          //this._timeout = setTimeout(()=> this.show = false, this.duration);
          this._timeout = setTimeout(()=> {
            this.$emit('tip-show');
            console.log(this.tipinfo.duration);
          }, this.tipinfo.duration);
      }
    }
  }
}
</script>
