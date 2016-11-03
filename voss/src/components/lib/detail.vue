<template>
	 <!--detail-->
      <modal :title="title" :show.sync="modalshow" :callback="modalCfg.callback" effet="fade" :btnshow="btnShow" big paddb>
        <div slot="modal-body" class="modal-body modal-detail">
          <div class="form-group">
            <span class="col-sm-3 control-label text-right">用户ID:</span>
            <div class="col-sm-9" v-text="details.uid"></div>
          </div>
          <div class="form-group">
            <span class="col-sm-3 control-label text-right">用户昵称:</span>
            <div class="col-sm-9" v-text="details.nickname"></div>
          </div>
          <div class="form-group">
            <span class="col-sm-3 control-label text-right">历史充值:</span>
            <p class="col-sm-9" v-text="details.cost"></p>
          </div>
          <div class="form-group">
            <span class="col-sm-3 control-label text-right">U币余额:</span>
            <p class="col-sm-9" v-text="details.balance"></p>
          </div>
          <div class="form-group">
            <span class="col-sm-3 control-label text-right">蜜糖:</span>
            <p class="col-sm-9" v-text="details.recv"></p>
          </div>
          <div class="form-group">
            <span class="col-sm-3 control-label text-right">累计提现金额:</span>
            <p class="col-sm-9" v-text="details.withdraw"></p>
          </div>
          <div class="form-group">
            <span class="col-sm-3 control-label text-right">累计播放时长:</span>
            <p class="col-sm-9">{{details.minutes}}分钟</p>
          </div>
          <div class="form-group">
            <span class="col-sm-3 control-label text-right">手机型号:</span>
            <p class="col-sm-9" v-text="details.model"></p>
          </div>
          <div class="form-group">
            <span class="col-sm-3 control-label text-right">平台:</span>
            <p class="col-sm-9" v-text="details.term ? 'ios' : 'android'"></p>
          </div>
          <div class="form-group">
            <span class="col-sm-3 control-label text-right">UDID:</span>
            <p class="col-sm-9" v-text="details.udid"></p>
          </div>
          <div class="form-group">
            <span class="col-sm-3 control-label text-right">注册IP:</span>
            <p class="col-sm-9" v-text="details.registerip"></p>
          </div>
          <div class="form-group">
            <span class="col-sm-3 control-label text-right">登录IP:</span>
            <p class="col-sm-9" v-text="details.loginip"></p>
          </div>
          <div class="form-group">
            <span class="col-sm-3 control-label text-right">登录地址:</span>
            <p class="col-sm-9" v-text="details.larea"></p>
          </div>
          <img :src="details.head" class="img120 det_img">
        </div>
      </modal>
</template>
<script>
import modal from './Modal.vue';
export default {
	data() {
		return {
        title: '详情',
        btnShow: false,
		}
	},
	components: {
		modal
	},
	props: {
		details: Object,
		modalshow: Boolean,
	},
}
</script>