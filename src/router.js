import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Sang from './views/Sang';
import Dragon from './views/Dragon';
import Ming from './views/Ming';
import Park from './views/Park';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // },
    {
        path: '/sang',
        name: 'Sang',
        component : Sang
    },
      {
          path: '/dragon',
          name: 'Dragon',
          component : Dragon
      },
      {
          path: '/ming',
          name: 'Ming',
          component : Ming
      },
      {
          path: '/park',
          name: 'Park',
          component : Park
      },
  ]
});