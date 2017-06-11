/**
 * Created by Shiro on 2017/5/31.
 */
import Vue from 'vue';
import VueResource from 'vue-resource';
Vue.use(VueResource);

//dev
// const baseUrl1 = '/api/getData.php?type=';
// const baseUrl2 = '/api/getData.php?type=zone&content=';
//prod
const baseUrl1 = '/controller/getData.php?type=';
const baseUrl2 = '/controller/getData.php?type=zone&content=';

export default {
  init: Vue.resource(baseUrl1 + 'init'),
  search: Vue.resource(baseUrl1 + 'search'),
  scoreQuery: Vue.resource(baseUrl1 + 'score'),

  live: Vue.resource(baseUrl2 + 'live'),
  study: Vue.resource(baseUrl2 + 'study'),
  play: Vue.resource(baseUrl2 + 'eat'),
  daily: Vue.resource(baseUrl2 + 'daily'),
  info: Vue.resource(baseUrl2 + 'info'),
  intro: Vue.resource(baseUrl2 + 'intro'),
};
