import Vue from 'vue'
import Router from 'vue-router'
import Custom from '@/components/Custom'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component:Custom,
      children:[
        {path: '/', redirect: '/Custom'},
        {path: 'Custom', name: 'Custom',component: Custom}
      ]
    }
  ]
})
