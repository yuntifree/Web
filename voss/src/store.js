Vue.use(Vuex);
const state = {
  // 登录状态
  logined: false,
  // 右侧试图
  view: 'getUsers',
  // 试图路径
  paths: ['用户管理', '用户信息'],
  // 左侧菜单
  menus: [],
}

export default new Vuex.Store({
  state,
})