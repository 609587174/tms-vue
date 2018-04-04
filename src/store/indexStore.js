import Vue from 'vue';
import Vuex from 'vuex';
import commonState from './common/initStore';
import commonMutations from './common/mutations';
import commonActions from './common/actions';
import cost from './userStore/dataStore';
Vue.use(Vuex);

let common = {
    state: commonState,
    mutations: commonMutations, 
    actions:commonActions,


};
let modules={
    common: common,
    cost: cost
};

let store = new Vuex.Store({
    modules: modules
});

export default store;
