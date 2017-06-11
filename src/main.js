// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import HttpApi from './httpApi';
import FastClick from 'fastclick';
import VueRouter from 'vue-router';
import routes from './routes';
import App from './App';
import {Masker, Swiper, Search, Toast, Panel, LoadingPlugin} from 'vux';
import BottomBtn from './components/BottomBtn.vue';


Vue.prototype.httpApi = HttpApi;
Vue.component('masker',Masker);
Vue.component('swiper',Swiper);
Vue.component('search',Search);
Vue.component('toast',Toast);
Vue.component('panel',Panel);

Vue.component('bottom-btn', BottomBtn);

Vue.use(VueRouter);
Vue.use(LoadingPlugin);
global.router = new VueRouter({
    routes,
});

FastClick.attach(document.body);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    router,
    render: h => h(App),
}).$mount('#app-box');
