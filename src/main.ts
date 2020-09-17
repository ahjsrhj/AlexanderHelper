/** @format */

import { createApp } from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './style/index.css'
import './libs/dispatchEvent'

window.oncontextmenu = (e: MouseEvent) => {
  //取消默认的浏览器自带右键
  e.preventDefault()
}

createApp(App).use(router).use(store).mount('#app')
