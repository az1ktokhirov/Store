import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home.vue';
import Card from './pages/Card.vue';
import Cart from './pages/Cart.vue';
import Liked from './pages/Liked.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/card', component: Card },
  { path: '/cart', component: Cart },
  { path: '/liked', component: Liked },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
