import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 1,
    pageDirection: 'fade',
    token: '',
    routeChain: [],
    pageData: {}
  },
  mutations: {
    addRouteChain(state, route) {
      state.routeChain.push(route);
    },
    popRouteChain(state) {
      state.routeChain.pop();
    },
    setPageDirection(state, dir) {
      const stateTemp = state;
      stateTemp.pageDirection = dir;
    },
    setPageData(state, params) {
      const stateTemp = state;
      const {
        id,
        data
      } = params;

      stateTemp.pageData[id] = data;
    },
    clearPageData(state) {
      const stateTemp = state;
      stateTemp.pageData = {};
    }
  }
});
