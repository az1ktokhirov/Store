import { createApp } from 'vue'
import './assets/style/main.scss'
import App from './App.vue'
const app = createApp(App)
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { router } from './routes.js'
import { store } from './store'

library.add(fas)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)
app.use(store)
store.dispatch('fetchProducts');
app.mount("#app")

