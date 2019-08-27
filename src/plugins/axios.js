import Vue from 'vue'
import axios from 'axios'


Vue.use({
    install(Vue){
        Vue.prototype.$firebase = axios.create({
            baseURL:'https://curso-vue-a254b.firebaseio.com/'
        });

        Vue.prototype.$multiservice = axios.create({
            baseURL:'http://localhost:5001/',
        });
    }
})