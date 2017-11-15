import Vue from 'vue';
import Vuex from 'vuex';
Vue.use( Vuex );

import { getters } from './getters.js';
import { mutations } from './mutations.js';

export const store = new Vuex.Store ( {
    state: {
            tasks: [],
            display: 'all',
    },

    getters,

    mutations
} )
