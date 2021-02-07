export default {
  path: '/cinema',
  name: 'Cinema',
  component: () => import('@/views/Cinema'),
  children: [
    {
      path: 'cinemalist',
      component: () => import('@/views/Cinema/cinemalist')
    },
    {
      path: '',
      redirect: 'cinemalist'
    }
  ]
}
