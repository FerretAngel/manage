import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: ()=>import('../views/index.vue')
    },
    {
      path: '/',
      name: 'login',
      component: () => import('../views/login.vue')
    },
    {
      path: '/user',
      name:'user',
      component: () => import('../views/user/index.vue'),
      children:[
        {
          path:'',
          name:'userHome',
          component:()=>import('../views/user/home.vue')
        }
      ]
    },
    {
      path: '/doctor',
      name:'doctor',
      component: () => import('../views/doctor/index.vue'),
      children:[
        {
          path:'',
          name:'doctorHome',
          component:()=>import('../views/doctor/home.vue')
        }
      ]
    },{
      path: '/admin',
      name:'admin',
      component: () => import('../views/admin/index.vue'),
      children:[
        {
          path:'',
          name:'adminHome',
          component:()=>import('../views/admin/home.vue')
        }
      ]
    },
  ]
})

export default router
