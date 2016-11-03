<template>
  <template v-if="logined">
    <uheader welcome="欢迎来到管理后台"></uheader>
    <secondarybar :user="user" path="首页"></secondarybar>
    <sidebar :sidebars="sidebars"></sidebar>
    <section id="main" class="column" v-el:container>
      <components :is="currentView" transition="fade" transition-mode="out-in"></components>
    </section>
  </template>
  <template v-else>
    <login></login>
  </template>
</template>
<script>
import uheader from './components/header.vue'
import secondarybar from './components/secondarybar.vue'
import sidebar from './components/sidebar.vue'
import Login from './login.vue'

// import views
import getUsers from './components/views/getUsers.vue'
import newsReview from './components/views/newsReview.vue'
/*import video from './components/views/video.vue'
import reviewInfo from './components/views/reviewInfo.vue'
import reviewAuth from './components/views/reviewAuth.vue'
import reviewHead from './components/views/reviewHead.vue'
import reviewReport from './components/views/reviewReport.vue'
import gift from './components/views/gift.vue'
import giftRecord from './components/views/giftRecord.vue'
import anchor from './components/views/anchor.vue'
import balance from './components/views/balance.vue'
import regData from './components/views/regData.vue'
import dauData from './components/views/dauData.vue'
import retentionData from './components/views/retentionData.vue'
import widthdraw from './components/views/withdraw.vue'
import widthdrawPW from './components/views/withdraw_pw.vue'
import edition from './components/views/edition.vue'
import profile from './components/views/profile.vue'
import notice from './components/views/notice.vue'
import pushData from './components/views/pushData.vue'
import payBill from './components/views/payBill.vue'
import payRequest from './components/views/payRequest.vue'
import addReview from './components/views/addReview.vue'
import adminPay from './components/views/adminPay.vue'
import monthIncome from './components/views/monthIncome.vue'
import Commodity from './components/views/Commodity.vue'
import whitelist from './components/views/whitelist.vue'
import block from './components/views/block.vue'
import live from './components/views/live.vue'
import historyLive from './components/views/historyLive.vue'
import adjustRate from './components/views/adjustRate.vue'
import business from './components/views/business.vue'
import busiAccount from './components/views/busiAccount.vue'*/

export default {
  data() {
    return {}
  },

  computed: {
    currentView() {
      return this.$store.state.view || 'getUsers';
    },
    logined() {
      return this.$store.state.logined;
    },
    user() {
      console.log('user:'+this.$store.state.username);
      return this.$store.state.username + ' 你好';
    },
    sidebars() {
      return (this.$store.state.sidebar);
    }
  },
  components: {
    uheader,
    secondarybar,
    sidebar,
    getUsers,
    Login,
    newsReview,
    /*feedback,
    video,
    reviewInfo,
    reviewAuth,
    reviewHead,
    reviewReport,
    gift,
    giftRecord,
    anchor,
    balance,
    regData,
    dauData,
    retentionData,
    widthdraw,
    widthdrawPW,
    edition,
    profile,
    notice,
    pushData,
    payBill,
    payRequest,
    addReview,
    adminPay,
    monthIncome,
    Commodity,
    whitelist,
    block,
    live,
    historyLive,
    adjustRate,
    business,
    busiAccount,*/
  },
  // for share components View using.
  ready() {
    this.$emit('view-change', this.currentView, this.$store.state.paths[1]);
  },
  events: {
    'view-change': function(view, title) {
      this.$nextTick(() => {
        this.$broadcast('view-change', view, title);
      })
    }
  },
}
</script>
<style lang="scss">
@import './assets/css/css.css',
'./assets/iconfont/iconfont.css';
html,
body {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

ul,
li,
ol {
  list-style: none;
}

.fade-transition {
  transition: opacity .2s ease;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.fade-enter,
.fade-leave {
  opacity: 0;
}

section#main {
  width: 85%;
  height: 87%;
  float: left;
  margin-top: -2px;
  padding: 10px 1% 0;
}

#main h3 {
  color: #1F1F20;
  text-shadow: 0 1px 0 #fff;
  font-size: 14px;
}

.module {
  width: 100%;
  height: 100%;
  padding: 40px 0 35px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.tabs {
  padding: 0;
  float: right;
  list-style: none;
  border-radius: 5px;
  margin: 0;
}

.tabs li {
  float: left;
  margin: 0;
  padding: 0;
  margin-left: 10px;
}

.app_header {
  min-height: 40px;
  margin: -40px 0 0;
  display: flex;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
}

.quick_search {
  text-align: center;
  -webkit-border-radius: 20px;
  -moz-border-radius: 20px;
  border-radius: 20px;
  border: 1px solid #bbb;
  height: 26px;
  width: 200px;
  -webkit-box-shadow: inset 0 2px 2px #ccc, 0 1px 0 #fff;
  -moz-box-shadow: inset 0 2px 2px #ccc, 0 1px 0 #fff;
  box-shadow: inset 0 2px 2px #ccc, 0 1px 0 #fff;
  padding-left: 5px;
  position: relative;
  font-weight: normal;
  line-height: 24px;
  display: inline-block;
}

.quick_search .iconfont {
  font-size: 14px;
  color: #ccc;
}

#main .module header h3.tabs_involved {
  display: block;
  float: left;
  margin-left: 20px;
  margin-top: 15px;
}

.mana_header .btn {
  padding: 0;
  padding: 3px 10px;
  border: 0;
  box-sizing: border-box;
}

.btn {
  border: 0;
}

.btn:hover {
  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #fefefe), color-stop(1, #E5E6EC));
  background-image: gradient(linear, left top, left bottom, color-stop(0, #fefefe), color-stop(1, #E5E6EC));
}

.choosed {
  background-color: #99bce8 !important;
}

button>i {
  margin-right: 3px;
}

.head-ops {
  padding: 0;
}

.outline-none {
  border-color: transparent;
}

.red {
  color: red;
}

.img120 {
  width: 120px;
  height: 120px;
}

.img50 {
  width: 50px;
  height: 50px;
}

.search-tip {
  background-color: #444;
  border-color: #444;
  color: #fff;
  width: auto;
  height: auto;
}

.search-tip .close {
  color: #fff;
  text-shadow: none;
  opacity: 1;
}

.tips {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.btn:hover {
  background-image: none;
}
</style>
