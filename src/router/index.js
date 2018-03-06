import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home'

Vue.use(Router)

import continer from '@/views/continer'
import Sort from '@/views/sort'
import userIndex from '@/views/userIndex'
import Cart from '@/views/cart'
import Detaview from '@/views/detaview'
import Login from '@/views/login'
import pay from '@/views/pay'
import Receive from '@/views/receive'
import Modify from '@/views/modify'
import Checkshop from '@/views/checkshop'
import Orderdetail from '@/views/orderdetail'
import Orderlist from '@/views/orderlist'
import OrderAll from '@/components/orderAll'
import WaitPay from '@/components/waitPay'
import Receiving from '@/components/receiving'
import Refund from '@/components/refund'
import Sign from '@/components/sign'

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children:[
        {
          path:'',
          name:'continer',
          component:continer
        },
        {
          path: '/sort',
          name: 'Sort',
          component: Sort
        },
        {
          path: '/userIndex',
          name: 'userIndex',
          component: userIndex
        },
        {
          path: '/cart',
          name: 'Cart',
          component: Cart,
          meta:{
            login:true
          }
        },
      ]
    },
    {
      path: '/detaview/:gid',
      name: 'Detaview',
      component: Detaview
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/pay',
      name: 'pay',
      component: pay,
      meta:{
        login:true
      }
    },
    {
      path: '/receive',
      name: 'Receive',
      component: Receive
    },
    {
      path: '/modify',
      name: 'Modify',
      component: Modify
    },
    {
      path: '/checkshop',
      name: 'Checkshop',
      component: Checkshop
    },
    {
      path: '/orderdetail',
      name: 'Orderdetail',
      component: Orderdetail
    },
    {
      path: '/orderlist',
      name: 'Orderlist',
      component: Orderlist,
      meta:{
        login:true
      },
      children:[
        {
          path: '',
          name: 'OrderAll',
          component: OrderAll
        },
        {
          path: '/waitPay',
          name: 'WaitPay',
          component: WaitPay
        },
        {
          path: '/receiving',
          name: 'Receiving',
          component: Receiving
        },
        {
          path: '/refund',
          name: 'Refund',
          component: Refund
        },
        {
          path: '/sign',
          name: 'Sign',
          component: Sign
        },
      ]
    }
  ]
})
router.beforeEach((to,from,next)=>{

  let bl = to.matched.some(function(item){
    return item.meta.login
  })
  if (bl) {
    let info = router.app.$local.fetch('yplift');
    if (info.login) {
      next()
    }else{
      router.push({
        path:'/login',
        query:{
          redirect:to.path.slice(1)
        }
      })
    }
  }else{
    next()
  }
})
// router.beforeEach((to,from,next)=>{ 
//   if (to.meta.login) {
//     next('/login');
//   }else{
//     next();
//   }
// })

export default router
