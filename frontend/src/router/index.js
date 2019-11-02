import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/index'
Vue.use(Router)

/* eslint-disable id-length */
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
      component: Layout,
      children: [
        {
          path: '',
          name: 'Intents',
          component: () => import('@/views/intents/index')
        },
        {
          path: 'settings/:intentId?',
          name: 'IntentSettings',
          component: () => import('@/views/intents/components/intentSettings')
        }
      ]
    },
    {
      path: '/actions',
      component: Layout,
      children: [
        {
          path: '',
          name: 'Actions',
          component: () => import('@/views/actions/index')
        },
        {
          path: 'settings/:actionId?',
          name: 'ActionSettings',
          component: () => import('@/views/actions/components/actionSettings')
        }
      ]
    }
  ]
})
/* eslint-enable id-length */
