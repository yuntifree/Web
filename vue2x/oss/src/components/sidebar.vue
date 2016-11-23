<template>
  <aside id="sidebar" class="column">
    <template v-for="menu in sidebars">
      <h3>{{menu.title}}</h3>
      <ul class="toggle">
        <li v-for="item in menu.menus" :class="{checked: selItem == item.title}" @click="onSelect(menu.title, item.title, item.name)">
          <i :class="['iconfont', 'icon-' + item.icon]"></i>
          <a :href="item.url">{{item.title}}</a>
        </li>
        <!--router-link v-for="item in menu.menus" :to="foo">
          <li  :class="{checked: selItem == item.title}" @click="onSelect(menu.title, item.title, item.name)">
            <i :class="['iconfont', 'icon-' + item.icon]"></i>
            <a :href="item.url">{{item.title}}</a>
          </li>
        </router-link-->
      </ul>
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
          menus: [{
          title: "用户信息",
          name: "getUsers",
          icon: "user"
          }]
        },{
          title: "运营管理",
          menus: [{
          title: "新闻审核",
          name: "newsReview",
          icon: "user"
          },{
          title: "视频审核",
          name: "videoReview",
          icon: "user"
          },/*{
          title: "模板管理",
          name: "templateReview",
          icon: "user"
          },*/{
          title: "AP监控",
          name: "apReview",
          icon: "user"
          }]
        }
      ]
    }
  },
  methods: {
    onSelect(title, subtitle, view) {
      this.$store.state.view = view;
      this.$store.state.paths = [title, subtitle];
      sessionStorage.menus = JSON.stringify({
        view: view,
        paths: [title, subtitle]
      });
      this.selItem = subtitle;
      //this.$dispatch('view-change', view, subtitle);
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
