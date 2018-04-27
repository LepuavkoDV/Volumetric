// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable no-new */
import Vue from 'vue';
import MultiLanguage from 'vue-multilanguage';

import App from './App';
import router from './router';
import { ru } from './lang/ru';
import { ua } from './lang/ua';
import { en } from './lang/en';

Vue.config.productionTip = false;

Vue.use(MultiLanguage, {
  default: 'ru',
  ru,
  ua,
  en,
});

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
