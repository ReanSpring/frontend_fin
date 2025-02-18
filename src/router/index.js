import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/Login.vue';
import BalanceView from '../views/BalanceView.vue';
import SignUp from '../views/SignUp.vue';
import Cookies from 'universal-cookie';
import ProfileView from '../views/ProfileView.vue';
import TaskView from '../views/TaskView.vue';
import Newthing from '../views/Newthing.vue';

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
  {
    path: '/balance',
    name: 'balance',
    component: BalanceView,
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp,
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView,
  },
  {
    path: '/task',
    name: 'task',
    component: TaskView,
  },
  {
    path: '/newthing',
    name: 'newthing',
    component: Newthing,
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const authToken = cookies.get('authToken');
  if (to.matched.some(record => record.meta.requiresAuth) && !authToken) {
    if (to.name === 'login' || to.name === 'signup') {
      next();
    } else {
      next({ name: 'login' });
    }
  } else {
    next();
  }
});

export default router;