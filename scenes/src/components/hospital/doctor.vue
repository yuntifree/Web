<style lang="scss" scoped>
@import '../../assets/css/common.scss';
.doctor {
  @include containerSize(100%, auto);
}
.doctor-list {
  padding: 0.3rem 5%;
  border-bottom: 1px solid #dcdcdc;
  position: relative;
}
.doctor-intro {
  width: 80%;
  max-width: 5.3rem;
  overflow: hidden;
} 
.doctor-img {
  @include containerSize(28%,1.9rem);
  line-height: 1.9rem;
  max-width: 1.56rem;
  overflow: hidden;
}
.doctor-img img {
  @include containerSize(100%, auto);
}
.doctor-inner-intro {
  padding: 0 0.3rem;
  @include containerSize(71%, auto);
}
.doctor-name {
  font-size: 0.32rem;
  color: #3c3c3c;
  line-height: 0.5rem;
}
.doctor-name span:first-child {
  padding-right: 0.24rem;
}
.doctor-title {
  font-size: 0.30;
  color: #969696;
  margin-top: 0.2rem;
}
.btn-intro {
  padding: 0.16rem 0.37rem;
  border-radius: 0.08rem;
  background-color: #5097f5;
  font-size: 0.30rem;
  color: #fff;
  position: absolute;
  top: 50%;
  right: 5%;
  transform: translateY(-50%);
}
</style>
<template>
  <div class="doctor">
    <div class="doctor-list g-clearfix" v-for="(item,index) in doctors">
      <dl class="doctor-intro g-clearfix g-fl">
        <dt class="doctor-img g-fl"><img :src="item.img"></dt>
        <dd class="g-fl doctor-inner-intro">
          <h2 class="doctor-name"><span v-text="item.name"></span><span v-text="item.title"></span></h2>
          <p class="doctor-title" v-text="item.desc"></p>
        </dd>
      </dl>
      <button class="g-fr btn-intro" @click="getDoctor(index)">介绍</button>
    </div>
  </div>
</template>

<script>
import tip from '../lib/tip.vue'
import CGI from '../../lib/cgi'

export default {
  name: 'doctor',
  data () {
    return {
      doctors: [{
        img: 'http://img.yunxingzh.com/3bff7f86-b266-4d49-a64c-0df6a8dcb901.jpg',
        name: '蔡西方',
        title: '儿科副主任医师',
        desc: '医疗专科：小儿呼吸',
      },{
        img: 'http://img.yunxingzh.com/819cee64-2002-465f-bf16-fb2a8d6c3e6f.jpg',
        name: '管宁',
        title: '儿科副主任医师',
        desc: '医疗专科：新生儿消化系统',
      },{
        img: 'http://img.yunxingzh.com/0edcb910-b4c8-437c-806c-6bc7be3ff49e.jpg',
        name: '刘晗',
        title: '儿科副主任医师',
        desc: '医疗专科：小儿消化、呼吸、泌尿内科',
      },{
        img: 'http://img.yunxingzh.com/97792d35-dab1-4b34-bef1-ed1990957855.jpg',
        name: '秦微',
        title: '儿科主治医师',
        desc: '',
      },{
        img: 'http://img.yunxingzh.com/ce2048ee-dfd5-4445-b523-1a68416fac17.jpg',
        name: '谭稻香',
        title: '儿科主治医师',
        desc: '',
      },{
        img: 'http://img.yunxingzh.com/aa5a7e87-c00a-4d6e-b72f-0649e179ab59.jpg',
        name: '谭稻香',
        title: '儿科主治医师',
        desc: '',
      },{
        img: 'http://img.yunxingzh.com/aa5a7e87-c00a-4d6e-b72f-0649e179ab59.jpg',
        name: '谭稻香',
        title: '儿科主治医师',
        desc: '',
      },{
        img: 'http://img.yunxingzh.com/aa5a7e87-c00a-4d6e-b72f-0649e179ab59.jpg',
        name: '谭稻香',
        title: '儿科主治医师',
        desc: '',
      },{
        img: 'http://img.yunxingzh.com/aa5a7e87-c00a-4d6e-b72f-0649e179ab59.jpg',
        name: '陈素容',
        title: '妇产科副主任医师',
        desc: '医疗专科：妇科、妇幼保健',
      },{
        img: 'http://img.yunxingzh.com/d40bdb4f-4c79-455f-9f43-51b7350458f1.jpg',
        name: '蓝清香',
        title: '妇科副主任  副主任医师',
        desc: '',
      }],
    }
  },
  components: {
    tip,
  },
  mounted() {
    this.$nextTick(()=> {
    })
  },
  methods: {
    getDoctor(idx) {
      this.$store.state.doctorIdx = idx;
      this.$router.push({name: 'doctorItem'});
    },
    tipBox(val) {
      this.tips.msg = val;
      this.tips.show = true;
    },
  }
}
</script>

