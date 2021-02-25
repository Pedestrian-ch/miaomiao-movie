import Vue from 'vue'
import VueRouter from 'vue-router'
import filmRouter from './film'
import cinemaRouter from './cinema'
import personRouter from './person'

Vue.use(VueRouter)

// const routes = [
//   {
//     path: '/about',
//     name: 'About',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')

//   }
// ]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    filmRouter,
    cinemaRouter,
    personRouter,
    {
      path: '/detail/:movieId',
      name: 'detail',
      component: () => import('@/views/Detail'),
      props: true
    },
    {
      path: '*',
      redirect: '/film'
    }
  ]
})

export default router
