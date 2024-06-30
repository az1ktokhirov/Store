<template>
  <section class="cards">
    <div class="container">
      <h5 class="liked-title">Siz yoqtirgan mahsulotlar</h5>
      <div class="cards__content">
        <div v-for="product in favoriteItems" :key="product.id" class="cards__content-card">
          <div class="cards__content-card-img" @click="showProductDetail(product)">
            <img :src="product.thumbnail" alt="" />
          </div>
          <h4 class="cards__content-card-title">{{ product.title }}</h4>
          <p>{{ product.price }}</p>
          <div class="cards__content-card-btns">
            <button @click="addToCart(product)">
              <font-awesome-icon icon="cart-plus" />
            </button>
            <button @click="removeFromFavorites(product.id)">
              <font-awesome-icon icon="heart-circle-minus" />
            </button>
          </div>
          <router-link :to="{ name: 'card', params: { id: product.id } }" class="cards__content-card-buy-btn">Buy now</router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const favoriteItems = computed(() => store.getters.favoriteItems);

function showProductDetail(product) {
  selectedProduct.value = product;
}

function addToCart(product) {
  store.dispatch('addToCart', product);
}

function removeFromFavorites(productId) {
  store.dispatch('removeFromFavorites', productId);
}
</script>
