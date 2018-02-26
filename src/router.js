/**
 * Created by jason on 17/10/9.
 */

import Vue from 'vue';
import VueRouter from 'vue-router';
import _ from 'lodash';

import Home from './main/Home/Home';
import Verification from './main/Verification/Verification.vue';
import SuccessPage from './main/SuccessPage/SuccessPage';
import RouterConfigs from './configs/RouterConfigs';
import { getLocalStorageCache } from './components/utils/CacheService';

Vue.use(VueRouter);

function routerChain(to, from, storeTemp) {
  const store = storeTemp;
  // 清除页面数据
  store.commit('clearPageData');

  const routeLength = store.state.routeChain.length;
  if (routeLength === 0) {
    store.commit('setPageDirection', 'fade');
    if (to.path === from.path && to.path === '/') {
      // 当直接打开根路由的时候
      store.commit('addRouteChain', to);
    } else {
      // 直接打开非根路由的时候其实生成了两个路径，from其实就是根路由
      store.commit('addRouteChain', from);
      store.commit('addRouteChain', to);
    }
  } else if (routeLength === 1) {
    store.commit('setPageDirection', 'slide-left');
    store.commit('addRouteChain', to);
  } else {
    const lastBeforeRoute = store.state.routeChain[routeLength - 2];
    if (lastBeforeRoute.path === to.path) {
      store.commit('popRouteChain');
      store.commit('setPageDirection', 'slide-right');
    } else {
      store.commit('addRouteChain', to);
      store.commit('setPageDirection', 'slide-left');
    }
  }
}

export default (store) => {
  const router = new VueRouter({
    routes: [{
      path: '/verification',
      name: '权限验证',
      component: Verification
    }, {
      path: '/successPage',
      name: '成功',
      component: SuccessPage
    }, {
      path: '',
      component: Home,
      children: RouterConfigs
    }]
  });

  /* eslint no-unused-vars:off */
  // 全局守卫，监听路由变化
  router.beforeEach((to, from, next) => {
    // 路由变化之前处理
    const tokenInfo = getLocalStorageCache('token');
    const token = _.get(tokenInfo, 'token');
    const expired = _.get(tokenInfo, 'expired');
    // 权限超时
    const timeOut = expired <= new Date().getTime();

    if (to.path !== '/verification' && (!token || timeOut)) {
      next('/verification');
    } else if (to.matched.length === 0) {
      // 如果未匹配到路由
      if (from.path) {
        // 如果上级也未匹配到路由则跳转首页，如果上级能匹配到则不跳转
        next(false);
      } else {
        next('/');
      }
    } else {
      // 处理路由链
      // routerChain(to, from, store);
      next();
    }
  });
  // 路由改变之后
  router.afterEach((to, from) => {
    // 路由变化之后处理标题
    document.title = to.name;
  });

  return router;
};
