<template>
    <section class="cards">
      <div class="container">
        <div class="cards__content">
          <h5 class="cards-title">Sport va hordiq</h5>
          <div v-if="transportProducts.length === 0" class="cards-nothing">
            <h4>Uzur bu Bolimda Mahsulotlar topilmadi</h4>
            <p>Asosiy sahifadan boshqa mahsulotlarimizni koring.</p>
          </div>
          <div v-else v-for="product in transportProducts" :key="product.id" class="cards__content-card">
            <div class="cards__content-card-img" @click="showProductDetail(product)">
              <img :src="product.thumbnail" alt="" />
            </div>
            <h4 class="cards__content-card-title">{{ product.title }}</h4>
            <p>{{ product.price }}$</p>
            <div class="cards__content-card-btns">
              <button @click="addToCart(product)">
                <font-awesome-icon icon="cart-plus" />
              </button>
              <button @click="toggleFavorite(product)">
                <font-awesome-icon :icon="isFavorite(product) ? 'heart-circle-minus' : 'heart-circle-plus'" />
              </button>
            </div>
            <router-link :to="{ name: 'card', params: { id: product.id } }" class="cards__content-card-buy-btn">Buy now</router-link>
          </div>
        </div>
      </div>
    </section>
  
    <div :class="['card-view', { show: selectedProduct }]" v-if="selectedProduct" @mousemove="handleMouseMove" @mouseleave="handleMouseLeave">
      <div class="card-view-area" ref="card">
        <div class="card-view-area-left">
          <div><img :src="selectedProduct.thumbnail" alt="" /></div>
        </div>
        <div class="card-view-area-right">
          <h5>{{ selectedProduct.title }}</h5>
          <p>{{ selectedProduct.description }}</p>
          <h4>{{ selectedProduct.price }}$</h4>
          <div class="btns">
            <button @click="addToCart(selectedProduct)">
              <font-awesome-icon icon="cart-plus" />
            </button>
            <button @click="toggleFavorite(selectedProduct)">
              <font-awesome-icon :icon="isFavorite(selectedProduct) ? 'heart-circle-minus' : 'heart-circle-plus'" />
            </button>
          </div>
        </div>
        <a class="close" @click="closeProductDetail"><font-awesome-icon icon="xmark" /></a>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import { useStore } from 'vuex';
  
  const store = useStore();
  const transportProducts = computed(() => store.getters.getProductsByCategory("sports-accessories"));
  const selectedProduct = ref(null);
  
  onMounted(() => {
    store.dispatch('fetchProducts');
  });
  
  function showProductDetail(product) {
    selectedProduct.value = product;
  }
  
  function closeProductDetail() {
    selectedProduct.value = null;
  }
  
  function addToCart(product) {
    store.dispatch('addToCart', product);
  }
  
  function toggleFavorite(product) {
    if (isFavorite(product)) {
      store.dispatch('removeFromFavorites', product.id);
    } else {
      store.dispatch('addToFavorites', product);
    }
  }
  
  function isFavorite(product) {
    return store.getters.favoriteItems.some(item => item.id === product.id);
  }
  
  const card = ref(null);
  
  function handleMouseMove(e) {
    const cardRect = card.value.getBoundingClientRect();
    const cardX = cardRect.left + cardRect.width / 2;
    const cardY = cardRect.top + cardRect.height / 2;
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const rotateX = (mouseY - cardY) / 25;
    const rotateY = (mouseX - cardX) / 25;
    card.value.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }
  
  function handleMouseLeave() {
    card.value.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  }
  </script>
  