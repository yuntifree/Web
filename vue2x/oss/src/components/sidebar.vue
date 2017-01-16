<template>
  <aside id="sidebar" class="column">
    <template>
      <div v-for="(menu,idx) in sidebars">
        <h3 @click="showMenu(idx,true)">{{menu.title}}</h3>
        <ul class="toggle" v-show="menu.show">
          <li v-for="item in menu.menus" :class="{checked: selItem == item.title}" @click="onSelect(menu.title, item.title, item.name)">
            <i :class="['iconfont', 'icon-' + item.icon]"></i>
            <a :href="item.url">{{item.title}}</a>
          </li>
        </ul>
      </div>
      <h3>{{yyqSidebars.title}}</h3>
      <div v-for="(menu,idx) in yyqSidebars.innermenus">
        <h3 class="yyq-title" @click="showMenu(idx,false)">{{menu.innertitle}}</h3>
        <ul class="toggle" v-show="menu.show">
          <li v-for="item in menu.menus" :class="{checked: selItem == item.title}" @click="onSelect(menu.innertitle, item.title, item.name)">
            <i :class="['iconfont', 'icon-' + item.icon]"></i>
            <a :href="item.url">{{item.title}}</a>
          </li>
        </ul>
      </div>
    </template>
    <footer class="sidebar-footer">
      <p><strong>Copyright &copy; 2016 云行智慧</strong></p>
      <p></p>
    </footer>
  </aside>
  <!-- end of sidebar -->
</template>
<script>
export default {
  data() {
    return {
      selItem: '',
      sidebars: [
        {
          title: "用户管理",
          show: true,
          menus: [{
          title: "用户信息",
          name: "getUsers",
          icon: "user"
          },{
          title: "白名单管理",
          name: "whiteList",
          icon: "user"
          },{
          title: "用户反馈",
          name: "feedback",
          icon: "user"
          }]
        },{
          title: "运营管理",
          show: false,
          menus: [{
            title: "新闻审核",
            name: "newsReview",
            icon: "user"
          },{
            title: "标签管理",
            name: "tagsReview",
            icon: "user"
          },{
            title: "视频审核",
            name: "videoReview",
            icon: "user"
          },{
            title: "AP监控",
            name: "apReview",
            icon: "user"
          },{
            title: "Banner管理",
            name: "setBanner",
            icon: "user"
          },{
            title: "闪屏广告管理",
            name: "adban",
            icon: "user"
          }]
        },{
          title:"后台管理",
          show: false,
          menus: [{
            title: "图片上传",
            name: "uploadImg",
            icon: "user"
          },{
            title: "活动配置",
            name: "setActivity",
            icon: "user"
          }]
        }
      ],
      yyqSidebars: {
        title: '一元抢',
        show: false,
        innermenus: [{
          innertitle: "用户数据",
          show: false,
          menus: [{
            title: "白名单管理",
            name: "yyqWhite",
            icon: "user"
          },{
            title: "用户活跃统计",
            name: "newsReview",
            icon: "user"
          },{
            title: "用户反馈",
            name: "newsReview",
            icon: "user"
          },{
            title: "用户公告",
            name: "newsReview",
            icon: "user"
          }]
        },{
          innertitle: "商品数据",
          show: false,
          menus: [{
            title: "商品详情",
            name: "newsReview",
            icon: "user"
          }]
        },{
          innertitle: "商品销售数据",
          show: false,
          menus: [{
            title: "开抢中商品",
            name: "newsReview",
            icon: "user"
          },{
            title: "等待开抢商品",
            name: "newsReview",
            icon: "user"
          },{
            title: "等待确认地址商品",
            name: "newsReview",
            icon: "user"
          },{
            title: "已确认地址商品",
            name: "newsReview",
            icon: "user"
          },{
            title: "待晒单商品",
            name: "newsReview",
            icon: "user"
          },{
            title: "已晒单商品",
            name: "newsReview",
            icon: "user"
          },{
            title: "已结束商品",
            name: "newsReview",
            icon: "user"
          }]
        },{
          innertitle: "充值数据",
          show: false,
          menus: [{
            title: "充值账单",
            name: "newsReview",
            icon: "user"
          },{
            title: "充值统计",
            name: "newsReview",
            icon: "user"
          },{
            title: "抢购统计",
            name: "newsReview",
            icon: "user"
          },{
            title: "商品抢购统计",
            name: "newsReview",
            icon: "user"
          }]
        },{
          innertitle: "晒单数据",
          show: false,
          menus: [{
            title: "晒单审核",
            name: "newsReview",
            icon: "user"
          },{
            title: "晒单图片审核",
            name: "newsReview",
            icon: "user"
          }]
        }]
      }
    }
  },
  methods: {
    onSelect(title, subtitle, view) {
      this.$store.state.view = view;
      this.$store.state.paths = [title, subtitle];
      /*sessionStorage.menus = JSON.stringify({
        view: view,
        paths: [title, subtitle]
      });*/
      this.selItem = this.$store.state.selItem = subtitle;
      this.$store.state.viewName = view;
    },
    showMenu(idx, type) {
      if (type) {
        this.sidebars[idx].show = !this.sidebars[idx].show;
      } else {
        this.yyqSidebars.innermenus[idx].show = !this.yyqSidebars.innermenus[idx].show;
      }
    }
  },
  mounted() {
    var initSelItem = this.$store.state.paths[1];
    this.selItem = initSelItem;
  }
}
</script>
<style lang="scss">
@import '../assets/iconfont/iconfont.css';
@import '../assets/css/common.scss';
aside#sidebar {
  @include containerSize(15%, 80%);
  background: #E0E0E3;
  float: left;
  box-shadow: 2px 2px 5px #B6B7B9;
  padding-bottom: 20px;
  overflow-y: auto;
}

#sidebar h3 {
  color: #1F1F20;
  text-transform: uppercase;
  text-shadow: 0 1px 0 #fff;
  font-size: 14px;
  margin: 0 0 0 6%;
  display: block;
  float: left;
  width: 90%;
  line-height: 32px;
}
#sidebar .yyq-title {
  margin: 0 0 0 10%;
  color: #666;
}
.toggleLink {
  color: #999999;
  font-size: 10px;
  text-decoration: none;
  display: block;
  float: right;
  margin-right: 2%;
}

#sidebar .toggleLink:hover {
  color: #77BACE;
  text-decoration: none;
}

#sidebar ul {
  clear: both;
  margin: 0;
  padding: 0;
}

#sidebar li {
  list-style: none;
  padding-left: 12%;
}

#sidebar li a {
  color: #666666;
  text-decoration: none;
  display: inline-block;
  height: 17px;
  line-height: 17px;
  text-shadow: 0 1px 0 #fff;
  margin: 2px 0;
  font-size: 14px
}

#sidebar p {
  color: #666666;
  padding-left: 6%;
  text-shadow: 0 1px 0 #fff;
}

#sidebar a {
  color: #666666;
  text-decoration: none;
}

#sidebar a:hover {
  text-decoration: underline;
}

.sidebar-footer {
  width: 15%;
  height: 7%;
  line-height: 40px;
  border-top: 1px solid #ccc;
  box-shadow: 0 1px 0 #f0f0f2 inset;
  position: absolute;
  left: 0;
  bottom: 0;
  background: #E0E0E3;
  box-shadow: 2px 2px 5px #B6B7B9;
  padding-bottom: 20px;
}

#sidebar .checked a,
#sidebar .checked i {
  color: blue;
  text-shadow: none;
}

.checked {
  background-color: #1aa3c8;
}
</style>
