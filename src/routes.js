import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/card/:id',name: 'card', component: () => import('./pages/Card.vue'), props: true },
  { path: '/cart', component: () => import('./pages/Cart.vue') },
  { path: '/liked', component: () => import('./pages/Liked.vue') },
  { path: '/beauty', component: () => import('./pages/catalog/BeautyProducts.vue') },
  { path: '/transport', component: () => import('./pages/catalog/Transport.vue') },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
