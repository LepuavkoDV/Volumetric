import Vue from 'vue';
import Router from 'vue-router';
import Volumetric from '@/components/Volumetric';

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Volumetric,
  },
];

export default new Router({
  mode: 'history',
  routes,
});
