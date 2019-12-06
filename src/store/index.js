import Vue from 'vue'
import Vuex from 'vuex'
import vuexAlong from 'vuex-along'

import actions from '@/store/actions'
import getters from '@/store/getters'
import mutations from '@/store/mutations'
import state from '@/store/state'

Vue.use(Vuex)
const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  plugins:[vuexAlong()]

})
export default store
