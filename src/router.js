import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import ramo from './components/ramo'
import cip from './components/cip'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: Home
    // },
    {
      path: '/ramo',
      name: 'ramo',
      component: ramo
    },
    {
      path: '/cip',
      name: 'cip',
      component: cip
    }
  ]
})
