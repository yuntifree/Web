<style>
.tooltip {
  position: absolute;
  padding:.2rem;
  background-color: #000;
  border-radius: .12rem;
  color: #fff;
}
</style>

<template>
<div class="tooltip g-font14" v-show="show" transition="fade"
    :style="{top:tipinfo.top,left:tipinfo.left}"
    @click="mapHide">
  {{tipinfo.msg}}
</div>
</template>

<script>
export default {
  props: {
    tipinfo: {
      msg: String,
      show: Boolean,
      top: String,
      left: String,
    }
  },
  computed: {
    show() {
      return this.tipinfo.show;
    }
  },
  methods: {
    mapHide() {
      this.$emit('tip-show');
    }
  }
}
</script>