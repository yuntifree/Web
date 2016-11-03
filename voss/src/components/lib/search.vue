<template>
	 <modal :title="title" :show.sync="modalsearchshow" :callback="timecallback" effet="fade" width="300" auto>
     <div slot="modal-body" class="modal-body">
       <form class="form-horizontal">
        <div class="form-group">
         <label class="col-sm-3 control-label">性别</label>
         <div class="col-sm-9 sex-padding">
           <label class="sex-margin">
             <input type="radio" class="form-control radio-sex sex-outline" :value="2" v-model="modalsearch.sex">不限</label>
           <label class="sex-margin">
             <input type="radio" class="form-control radio-sex sex-outline" :value="1" v-model="modalsearch.sex">男</label>
           <label class="sex-margin">
             <input type="radio" class="form-control radio-sex sex-outline" :value="0" v-model="modalsearch.sex">女</label>
         </div>
       </div>
       <div class="form-group" v-if="termshow">
         <label class="col-sm-3 control-label">平台</label>
         <div class="col-sm-9 sex-padding">
           <label class="sex-margin">
             <input type="radio" class="form-control radio-sex sex-outline" :value="2" v-model="modalsearch.term">不限</label>
           <label class="sex-margin">
             <input type="radio" class="form-control radio-sex sex-outline" :value="1" v-model="modalsearch.term">ios</label>
           <label class="sex-margin">
             <input type="radio" class="form-control radio-sex sex-outline" :value="0" v-model="modalsearch.term">android</label>
         </div>
       </div>
       <div class="form-group">
             <label class="col-sm-3 control-label" for="stime">开始时间</label>
             <div class="col-sm-9">
               <input v-el:stime class="form-control" type="text" v-model="modalsearch.stime">
               <i class="iconfont icon-rili datetime"></i>
             </div>
         </div>
         <div class="form-group">
             <label class="col-sm-3 control-label" for="etime">结束时间</label>
             <div class="col-sm-9">
               <input v-el:etime class="form-control" type="text" v-model="modalsearch.etime">
               <i class="iconfont icon-rili datetime"></i>
             </div>
         </div>
       </form>
     </div>
   </modal>
</template>
<script>
import modal from './Modal.vue';
import CGI from '../../lib/cgi.js';
export default {
	data() {
		return {
        title: '高级搜索',
		}
	},
	components: {
		modal
	},
	props: {
		modalsearchshow: Boolean,
    termshow: Boolean,
    modalsearch: Object,
    timecallback: Function,
    page: Object,
	},
  events: {
    'date-time': function() {
       $(this.$els.stime).datetimepicker();
       $(this.$els.etime).datetimepicker();
    },
    'call-back': function() {
      var stime = this.modalsearch.stime.trim();
      var etime= this.modalsearch.etime.trim();
      var sex = this.modalsearch.sex;
      var term = this.modalsearch.term;
      if (this.termshow) {
        if (term == 2 && sex == 2 && !!(!stime) && !!(!etime)) {
          this.modalsearchshow = false;
          return;
        }
      } else {
        if (sex == 2 && !!(!stime) && !!(!etime)) {
          this.modalsearchshow = false;
          return;
        }
      }
      var ret = CGI.compareTime(stime, etime);
      if (ret) {
        this.$dispatch('tip-time', ret);
        return;
      }
      var param = {
          start: this.page.start,
          limit: this.page.limit,
      };
      if (stime !== '' && etime !== '') {
        stime = CGI.dateFormat(stime, 'yyyy-MM-dd hh:mm:ss');
        etime = CGI.dateFormat(etime, 'yyyy-MM-dd hh:mm:ss');
        if (stime == 'Invalid date' || etime == 'Invalid date') {
          this.$dispatch('tip-time','请输入有效时间');
          return;
        } 
      } 

      if (stime && etime) {
         param.tstart = stime;
         param.tend = etime;
      }
      
      if (sex !== 2) {
        param.sex = sex;
      }
      
      if (term !== 2) {
        param.term = term;
      }   
      this.modalsearchshow = false;
      this.$dispatch('search-param',param);
    }
  }
}
</script>