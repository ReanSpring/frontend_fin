import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/Login.vue';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const authToken = cookies.get('authToken');
  if (to.matched.some(record => record.meta.requiresAuth) && !authToken) {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router;