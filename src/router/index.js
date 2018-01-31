import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home.vue'
import Nurse from '@/pages/Nurse.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/nurse',
      name: 'Nurse',
      component: Nurse
    }
  ]
})
