import Vue from 'vue'
import axios from 'axios'


Vue.use({
    install(Vue){
        Vue.prototype.$firebase = axios.create({
            baseURL:'https://curso-vue-a254b.firebaseio.com/'
        });

        Vue.prototype.$multiservice = axios.create({
            baseURL:'http://192.168.0.112:5001/api/',
        });

        Vue.prototype.$api = axios.create({
            baseURL:'http://192.168.0.112:8887'
        });
    }
})