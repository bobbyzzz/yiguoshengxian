import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false

import VueWechatTitle from 'vue-wechat-title'
Vue.use(VueWechatTitle)

import router from './routers/index.js'

import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant);

import { Swipe, SwipeItem } from 'vant';
Vue.use(Swipe).use(SwipeItem);

import { Tab, Tabs } from 'vant';
Vue.use(Tab).use(Tabs);

import axios from 'axios'
axios.defaults.baseURL = ''
Vue.prototype.$axios = axios

import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload)

import { Popup } from 'vant';
Vue.use(Popup);

import { Area } from 'vant';
Vue.use(Area);

import { Search } from 'vant';
Vue.use(Search);

import { Button } from 'vant';
Vue.use(Button);

new Vue({
    render: h => h(App),
    router,
}).$mount('#app')