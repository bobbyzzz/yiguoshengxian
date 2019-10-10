import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import { Tab, Tabs } from 'vant';
Vue.use(Tab).use(Tabs);

import { Sidebar, SidebarItem } from 'vant';
Vue.use(Sidebar);
Vue.use(SidebarItem);

import home from '../components/home.vue'
import sort from '../components/sort.vue'
import eat from '../components/eat.vue'
import shopcar from '../components/shopcar.vue'
import mine from '../components/mine.vue'
import login from '../components/login.vue'
import register from '../components/register.vue'
import agreement from '../components/agreement.vue'
import privacy from '../components/privacy.vue'
import forget from '../components/forget.vue'
import sortAll from '../components/sortAll.vue'
import sortCar from '../components/sortCar.vue'
// 这里是头部
import Makdeliciousfood from '../components/Makdeliciousfood.vue'
import Increaseknowledge from "../components/Increaseknowledge.vue"
import LivingHome from "../components/LivingHome.vue"
import Eatonatrialbasis from "../components/Eatonatrialbasis.vue"
// 这个是2级路由
import jinlu from "../components/jinlu.vue"

import set from "../components/set.vue"

const routes = [{
        path: '/',
        redirect: '/home',
        meta: {
            keepAlive: true
        }
    },
    {
        path: '/home',
        component: home,
        meta: {
            title: '易果生鲜',
            keepAlive: false
        }
    },
    {
        path: '/sort',
        component: sort,
        meta: {
            title: '商品分类',
            keepAlive: false
        }
    },
    {
        path: '/eat',
        component: eat,
        meta: {
            title: '吃饭吧—易果内容频道',
            keepAlive: false
        }
    },
    {
        path: '/shopcar',
        component: shopcar,
        meta: {
            title: '购物车',
            keepAlive: false
        }
    },
    {
        path: '/mine',
        component: mine,
        meta: {
            title: '个人中心',
            keepAlive: false
        }
    },
    {
        path: '/login',
        component: login,
        meta: {
            title: '登录',
            keepAlive: false
        }
    },
    {
        path: '/register',
        component: register,
        meta: {
            title: '注册',
            keepAlive: false
        }
    },
    {
        path: '/agreement',
        component: agreement,
        meta: {
            title: '易果服务协议',
            keepAlive: false
        }
    },
    {
        path: '/privacy',
        component: privacy,
        meta: {
            title: '易果隐私权政策',
            keepAlive: false
        }
    },
    {
        path: '/forget',
        component: forget,
        meta: {
            title: '找回密码',
            keepAlive: false
        }
    },
    {
        path: '/sortAll',
        component: sortAll,
        meta: {
            title: '分类列表',
            keepAlive: false
        }
    },
    {
        path: '/sortCar',
        component: sortCar,
        meta: {
            title: '商品详情',
            keepAlive: false
        }
    },
    // 这里是头部
    {
        path: '/Makdeliciousfood',
        component: Makdeliciousfood,
        meta: {
            title: '做美食',
            keepAlive: false
        } //Makdeliciousfood 做美食
    },
    {
        path: '/Increaseknowledge',
        component: Increaseknowledge,
        meta: {
            title: '涨知识',
            keepAlive: false
        } //Increaseknowledge  涨知识
    },
    {
        path: '/LivingHome',
        component: LivingHome,
        meta: {
            title: '生活家',
            keepAlive: false
        } //LivingHome  生活家 
    },
    {
        path: '/Eatonatrialbasis',
        component: Eatonatrialbasis,
        meta: {
            title: '爱试吃',
            keepAlive: false
        } //Eatonatrialbasis 爱试吃
    },
    // 这个是2级路由
    {
        path: '/jinlu',
        component: jinlu,
        meta: {
            title: '吃饭吧-详情中心',
            keepAlive: false
        } //jinlu 
    },
    {
        path: '/set',
        component: set,
        meta: {
            title: '设置',
            keepAlive: false
        } //jinlu 
    },
]

const router = new VueRouter({

    routes
})
export default router;