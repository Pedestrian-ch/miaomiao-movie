export default {
  path: '/film',
  name: 'Film',
  component: () => import('@/views/Film'),
  children: [{
    path: 'nowplaying',
    name: 'nowplaying',
    component: () => import('@/views/Film/nowplaying')
  },
  {
    path: 'comingsoon',
    name: 'comingsoon',
    component: () => import('@/views/Film/comingsoon')
  },
  {
    path: 'city',
    name: 'city',
    component: () => import('@/components/City')
  },
  {
    path: 'search',
    name: 'search',
    component: () => import('@/components/Search')
  },
  {
    path: '',
    redirect: 'nowplaying'
  }
  ]
}
