/** @format */

import { createApp } from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './style/index.css'
import './libs/dispatchEvent'
import { p1MainName, p1SubName, p2MainName, p2SubName } from './const'
// import './test'

const query = router.currentRoute.value.query

router.beforeEach((to, from, next) => {
  const {
    p1Main = p1MainName,
    p1Sub = p1SubName,
    p2Main = p2MainName,
    p2Sub = p2SubName,
    scale = 1,
    border = 0,
  } = to.query

  store.dispatch(
    'config/updateScale',
    scale && Number(scale) ? Number(scale) : 1,
  )
  store.dispatch(
    'config/updateBorder',
    border && Number(border) ? Number(border) === 1 : false,
  )
  store.dispatch('config/updateNames', {
    p1Main,
    p1Sub,
    p2Main,
    p2Sub,
  })

  next()
})

window.oncontextmenu = (e: MouseEvent) => {
  //取消默认的浏览器自带右键
  e.preventDefault()
}

createApp(App).use(router).use(store).mount('#app')
