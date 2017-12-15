import Vue from 'vue';
import iView from 'iview';
import Util from '../libs/util';
import VueRouter from 'vue-router';
import {routers} from './router';
import Cookies from 'js-cookie';

Vue.use(VueRouter);

// 路由配置
const RouterConfig = {
    // mode: 'history',
    routes: routers
};

export const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    // 非登录情况，跳转登录
    if (!Cookies.get('user') && to.name !== 'login') {
      next({
        name: 'login'
      })
    } else if (Cookies.get('user') && to.name === 'login') {
      // 登录情况访问登录页，跳转主页
      next({
        name: 'home_index'
      })
    } else {
      // 没有配置权限，通过
      //Util.toDefaultPage([...routers], to.name, router, next)
      next();
    }
});

router.afterEach((to) => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});
