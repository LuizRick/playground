import VueLocalStorage from 'vue-localstorage'
import Vue from 'vue'
Vue.use(VueLocalStorage, {
    name:'ls',
    bind: true
});
