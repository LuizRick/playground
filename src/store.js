import Vue from 'vue'
import Vuex from 'vuex'
import navigation from './store/appstore/navigation'
import mangas from './store/mangaslivrestore/mangaslivre'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {navigation, mangas}
})
