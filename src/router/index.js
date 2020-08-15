import Vue from 'vue'
import VueRouter from 'vue-router'
import Applications from '../views/Applications.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Applications',
    component: Applications,
    meta: {
      title: 'Applications - PDFFiller',
    }
  },
  {
    path: '/users',
    name: 'Users',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Users.vue'),
    meta: {
      title: 'Users - PDFFiller',
    }
  }
]


const router = new VueRouter({
  routes
})

router.beforeEach((to, _, next) => {
  document.title = to.meta.title;
  next();
});

export default router
