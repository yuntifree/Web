import Main from '@/views/Main.vue';
import home from '@/views/home/home.vue';
import widthdraw from '@/views/group/page1/widthdraw.vue';
import balance from '@/views/group/page1/balance.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: resolve => { require(['@/views/login.vue'], resolve); }
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: resolve => { require(['@/views/error-page/404.vue'], resolve); }
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: resolve => { require(['@//views/error-page/403.vue'], resolve); }
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: resolve => { require(['@/views/error-page/500.vue'], resolve); }
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    component: Main,
    children: [
        { path: 'home', title: {i18n: 'home'}, name: 'home_index', component: home  }
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    {
        path: '/account',
        icon: 'ios-folder',
        name: 'account',
        title: '账户管理',
        component: Main,
        children: [
            {
                path: 'income',
                icon: 'ios-paper-outline',
                name: 'income',
                title: '收益记录',
                component: resolve => { require(['@/views/group/page1/page1.vue'], resolve); }
            },
            {
                path: 'withdraw',
                icon: 'ios-list-outline',
                name: 'account_withdraw',
                title: '提现记录',
                component: widthdraw 
            },
            {
                path: 'balance',
                icon: 'ios-paper-outline',
                name: 'account_balance',
                title: '余额管理',
                component: balance
            }
        ]
    },
    {
        path: '/videos',
        icon: 'ios-folder',
        title: '视频管理',
        name: 'videos',
        component: Main,
        children: [
            { path: 'add', icon: 'ios-list-outline', title: '新开直播', name: 'videos_add', component: resolve => { require(['@/views/page/page.vue'], resolve); } },
            { path: 'list', icon: 'ios-list-outline', title: '视频列表', name: 'videos_list', component: resolve => { require(['@/views/page/page.vue'], resolve); } },
            { path: 'channel', icon: 'ios-list-outline', title: '频道管理', name: 'videos_channel', component: resolve => { require(['@/views/page/page.vue'], resolve); } },
            { path: 'stat', icon: 'ios-list-outline', title: '视频统计', name: 'videos_stat', component: resolve => { require(['@/views/page/page.vue'], resolve); } },
        ]
    }
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    ...appRouter,
    page500,
    page403,
    page404
];
