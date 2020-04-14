import Vue from 'vue';
import Framework7 from 'framework7/framework7-lite.esm.bundle.js';
import Framework7Vue from 'framework7-vue/framework7-vue.esm.bundle.js';
import ECharts from 'vue-echarts'
import Trend from "vuetrend"
import VueNumerals from 'vue-numerals'
import vCascade from 'v-cascade'

import 'framework7/css/framework7.bundle.css';
import "vue-select/dist/vue-select.css";

import '../css/icons.css';
import '../css/app.scss';

// Import App Component
import App from '../components/app.vue';

Framework7.use(Framework7Vue)
Vue.use(require('vue-moment'))
Vue.use(ECharts)
Vue.use(Trend)
Vue.use(VueNumerals)
Vue.use(vCascade)

// Init App
new Vue({
  el: '#app',
  render: (h) => h(App),

  // Register App Component
  components: {
    app: App
  },
});