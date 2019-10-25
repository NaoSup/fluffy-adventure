import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  mode: 'history',
  // avoid page jumping during vue router transitions
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          x: 0,
          y: 0
        })
      }, 280)
    })
  },
  routes: [
    {
      path: '/',
      redirect: 'intents'
    },
    {
      path: '/intents',
      name: 'Intents',
      component: () => import('@/views/intents/index')
    }
  ],
})
