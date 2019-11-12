import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  mode:'history',
  routes:[
    {
      path: '/',
      name: 'home',
      component: () => import("@/components/goods/List"),
      meta:{title:'首页'}
    },
    {
      path: '/goods',
      name: "goods",
      component: () => import("@/pages/Goods"),
      meta:{title:'拼团专区'},
      children:[
        {path: '', component: () => import("@/components/goods/List")},
        {path: 'list', component: () => import("@/components/goods/List")},
        {path:'detail/:id',component: () => import("@/components/goods/Detail")}
      ]
    },
    {
      path:'/order',name:'order',
      meta:{title:'订单详情'},
      component: () => import("@/pages/Order"),
      children:[
        {path:'brief/:goods',component:() => import('@/components/order/OrderBrief')},
        {path:'successed/:order',meta:{title:'支付结果'},component:() => import('@/components/order/OrderSuccessed')},
      ]
    },
    {
      path:'/group',name:'group',
      meta:{title:'开团详情'},
      component: () => import("@/pages/Group"),
      children:[
        {path:'detail/:group',component:() => import('@/components/group/GroupDetail')},
        {path:'my',meta:{title:'我的拼团'},component:() => import('@/components/group/MyGroup')},
      ]
    }
  ]}
);

router.beforeEach((to, from, next) => {
  window.scrollTo(0,0);
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
