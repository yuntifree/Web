<style>
.maptip {
  padding: 5px 0;
  z-index: 9999;
  position: absolute;
}
.maptip-arrow {
  width: 0;
  height: 0;
  border-color: transparent;
  border-style: solid;
  border-width: 5px 5px 0;
  border-top-color: #000;
  position: absolute;
  bottom: 1px;
  left: 50%;
  margin-left: -5px;
  border-width: 5px 5px 0;
  border-top-color: #000;
}
.maptip-inner {
  max-width: 200px;
  padding: 3px 8px;
  color: #fff;
  text-align: center;
  background-color: #000;
  border-radius: 4px;
}
</style>

<template>
<div class="maptip" v-show="info.show" :style="{top:info.top+'px',left:info.left+'px'}">
  <div class="maptip-arrow"></div>
  <div class="maptip-inner">
    <slot name="content">{{info.msg}}</slot>
  </div>
</div>
</template>

<script>
export default {
  props: {
    info: {
      msg: String,
      show: Boolean,
      top: Number,
      left: Number,
    }
  },
}
</script>