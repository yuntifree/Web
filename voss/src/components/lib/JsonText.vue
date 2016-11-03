<template>
  <div class="jsonlint">
    <textarea class="form-control" rows="10" v-model="lintcfg.json"></textarea>
    <i class="iconfont icon-accept icon-confirm red" @click="check"></i>
  </div>
  <div class="lintrest" v-if="lintcfg.result" v-text="lintcfg.message"></div>
</template>
<script>
import CGI from '../../lib/cgi'
export default {
  props: {
    lintcfg: Object,
  },
  created() {
    CGI.loadScript('http://cdn.bootcss.com/jsonlint/1.6.0/jsonlint.min.js', 'jsonlint');
  },
  methods: {
    check() {
      try {
        var ret = '';
        var result = jsonlint.parse(this.lintcfg.json);
        if (result) {
          ret = 'OK'
          this.lintcfg.json = JSON.stringify(result, null, "  ");
          this.lintcfg.result = result;
        }
      } catch (e) {
        ret = e.message;
      }
      this.lintcfg.message = ret;
    }
  },
}
</script>
<style lang="scss">
@import '../../assets/css/common.scss';
.jsonlint {
  position: relative;
}

.jsonlint textarea {
  width: 100%;
}

.icon-confirm {
  @include pos(right, 5px, top, 5px);
  font-size: 20px;
  cursor: pointer;
}

.lintrest {
  background-color: #f5f5f5;
  margin: 10px 0;
  padding: 5px;
}

.green {
  color: green;
}
</style>
