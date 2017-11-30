import Vue from 'vue'
import Router from 'vue-router'
import intheaters from "@/components/in_theaters"
import coming_soon from "@/components/coming_soon"
import top250 from "@/components/top250"
import search from "@/components/search"
import index from '@/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/', redirect: {name: 'in_theaters'}
    },
    {
      path: '/in_theaters',
      name: 'in_theaters',
      component: intheaters,
      meta: {keepAlive: true}
    },
    {
      path: '/coming_soon',
      name: 'coming_soon',
      component: coming_soon,
      meta: {keepAlive: true}
    },
    {
      path: '/top250',
      name: 'top250',
      component: top250,
      meta: {keepAlive: true}
    },
    {
      path: '/search',
      name: 'search',
      component: search,
      meta: {keepAlive: false}
    }
  ]
})
