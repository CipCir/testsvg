import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import svg from './components/meselayout'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: Home
    // },
    {
      path: '/svg',
      name: 'svg',
      component: svg
    }
  ]
})
