import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/card/:id',name: 'card', component: () => import('./pages/Card.vue'), props: true },
  { path: '/cart', component: () => import('./pages/Cart.vue') },
  { path: '/liked', component: () => import('./pages/Liked.vue') },
  { path: '/go`zallik-va-parvarish', component: () => import('./pages/catalog/BeautyProducts.vue') },
  { path: '/avtomobillar', component: () => import('./pages/catalog/Auto.vue') },
  { path: '/mototransportlar', component: () => import('./pages/catalog/Moto.vue') },
  { path: '/aksesuarlar', component: () => import('./pages/catalog/Accessories.vue') },
  { path: '/atirlar', component: () => import('./pages/catalog/Fragrances.vue') },
  { path: '/mebellar', component: () => import('./pages/catalog/Furniture.vue') },
  { path: '/oziq-ovqat', component: () => import('./pages/catalog/Groceries.vue') },
  { path: '/oshxona-jihozlari', component: () => import('./pages/catalog/Kitchen.vue') },
  { path: '/smartfonlar', component: () => import('./pages/catalog/Smartphones.vue') },
  { path: '/maishiy-kimyo-vositalari', component: () => import('./pages/catalog/SkinCare.vue') },
  { path: '/uy-jihozlari', component: () => import('./pages/catalog/HomeDecor.vue') },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
