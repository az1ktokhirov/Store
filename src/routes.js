import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/card/:id',name: 'card', component: () => import('./pages/Card.vue'), props: true },
  { path: '/cart', component: () => import('./pages/Cart.vue') },
  { path: '/liked', component: () => import('./pages/Liked.vue') },
  { path: '/avtomobillar', component: () => import('./pages/catalog/Auto.vue') },
  { path: '/mototransportlar', component: () => import('./pages/catalog/Moto.vue') },
  { path: '/aksesuarlar', component: () => import('./pages/catalog/Accessories.vue') },
  { path: '/mebellar', component: () => import('./pages/catalog/Furniture.vue') },
  { path: '/oziq-ovqat', component: () => import('./pages/catalog/Groceries.vue') },
  { path: '/oshxona-jihozlari', component: () => import('./pages/catalog/Kitchen.vue') },
  { path: '/smartfonlar', component: () => import('./pages/catalog/Smartphones.vue') },
  { path: '/maishiy-kimyo-vositalari', component: () => import('./pages/catalog/SkinCare.vue') },
  { path: '/uy-dekaratsiyalari', component: () => import('./pages/catalog/HomeDecor.vue') },
  { path: '/ko`zoynaklar', component: () => import('./pages/catalog/SunGlasses.vue') },
  { path: '/sport-va-hordiq', component: () => import('./pages/catalog/Sport.vue') },
  { path: '/planshetlar', component: () => import('./pages/catalog/Tablet.vue') },
  { path: '/noutbuklar', component: () => import('./pages/catalog/Noutbuk.vue') },
  { path: '/erkaklar-uchun', component: () => import('./pages/catalog/MensWear.vue') },
  { path: '/ayollar-uchun', component: () => import('./pages/catalog/WomensWear.vue') },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
