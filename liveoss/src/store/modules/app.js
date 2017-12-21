import {otherRouter, appRouter} from '@/router/router';

const app = {
  state: {
    contentHeight: 0,
    currentPath: [
      {
        title: '首页',
        path: '',
        name: 'home_index'
      }
    ], // 面包屑数组
    menuList: [],
    routers: [
      otherRouter,
      ...appRouter
    ]
  },
  mutations: {
    updateMenulist (state) {
      state.menuList = appRouter;
    }
  }
};

export default app;
