<style lang="less">
    @import "./main.less";
</style>
<template>
  <div class="main" :class="{'main-hide-text': shrink}">
    <div class="sidebar-menu-con" :style="{width: shrink?'60px':'200px', overflow: shrink ? 'visible' : 'auto'}">
      <shrinkable-menu
          :shrink="shrink"
          :menu-list="menuList">
          <div slot="top" class="logo-con">
              <img v-show="!shrink"  src="../images/logo.jpg" key="max-logo" />
              <img v-show="shrink" src="../images/logo-min.jpg" key="min-logo" />
          </div>
      </shrinkable-menu>
    </div>
    <div class="main-header-con" :style="{paddingLeft: shrink?'60px':'200px'}">
      <div class="main-header">
        <div class="navicon-con">
          <Button :style="{transform: 'rotateZ(' + (this.shrink ? '-90' : '0') + 'deg)'}" type="text" @click="toggleClick">
            <Icon type="navicon" size="32"></Icon>
          </Button>
        </div>
        <div class="header-middle-con">
          <div class="main-breadcrumb">
            <breadcrumb-nav :currentPath="currentPath"></breadcrumb-nav>
          </div>
        </div>
        <div class="header-avator-con">
          <div class="user-dropdown-menu-con">
            <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
              <Dropdown transfer trigger="click" @on-click="handleClickUserDropdown">
                <a href="javascript:void(0)">
                    <span class="main-user-name">{{ userName }}</span>
                    <Icon type="arrow-down-b"></Icon>
                </a>
                <DropdownMenu slot="list">
                    <DropdownItem name="home_index">个人中心</DropdownItem>
                    <DropdownItem name="loginout" divided>退出登录</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <Avatar icon="person" style="background: #619fe7;margin-left:10px;"></Avatar>
            </Row>
          </div>
        </div>
      </div>
    </div>
    <div class="single-page-con" :style="{left: shrink?'60px':'200px'}">
      <div class="single-page">
          <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import Cookies from 'js-cookie';
import shrinkableMenu from './main-components/shrinkable-menu/shrinkable-menu.vue';
import breadcrumbNav from './main-components/breadcrumb-nav.vue'

export default {
    components: {
      shrinkableMenu,
      breadcrumbNav
    },
    data () {
      return {
          shrink: false,
          userName: '',
      };
    },
    computed: {
      menuList () {
        return this.$store.state.app.menuList;
      },
      currentPath () {
        return this.$store.state.app.currentPath; // 当前面包屑数组
      },
    },
    methods: {
        init () {
            this.userName = Cookies.get('user');
        },
        toggleClick () {
            this.shrink = !this.shrink;
        },
        handleClickUserDropdown (name) {
            if (name == 'loginout') {
                Cookies.remove('user')
                this.$router.push({
                    name: 'login'
                });
            } else {
              this.$router.push({
                name: name
              })
            }
        }
    },
    mounted () {
        this.init();
        this.$nextTick(()=> {
          var height = document.body.clientHeight;
          this.$store.state.app.contentHeight = height - 80;
        })
    }
};
</script>
