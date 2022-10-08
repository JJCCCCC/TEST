import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import 'amfe-flexible'
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css'
import VueLazyLoad from "vue-lazyload"
import './assets/css/animate.min.css'
import './assets/css/iconfont.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

Vue.use(VueLazyLoad, {

  error: "./static/a1.jpg",

  loading: "./static/loading.gif"
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')