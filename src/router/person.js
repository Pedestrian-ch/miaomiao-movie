export default {
  path: '/person',
  name: 'Person',
  component: () => import('@/views/Person'),
  children: [
    {
      path: 'login',
      component: () => import('@/components/Login')
    },
    {
      path: '',
      redirect: 'login'
    }
  ]
}
