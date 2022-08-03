import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 1. local usage
import Vue3Prism from '@/plugin/index.js'
// 2. npm usage
// import Vue3Prism from '../lib/Vue3Prism.common.js'
// import "../lib/Vue3Prism.css"

createApp(App).use(store).use(router).use(Vue3Prism).mount('#app')
