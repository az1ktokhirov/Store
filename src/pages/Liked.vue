<template>
  <section class="cards" v-if="favoriteItems.length">
    <div class="container">
      <h5 class="liked-title">Siz yoqtirgan mahsulotlar</h5>
      <div class="cards__content">
        <div v-for="product in favoriteItems" :key="product.id" class="cards__content-card">
          <div class="cards__content-card-img" @click="showProductDetail(product)">
            <img :src="product.thumbnail" alt="" />
          </div>
          <h4 class="cards__content-card-title">{{ product.title }}</h4>
          <p>{{ product.price }}$</p>
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
  <div class="nothing" v-else>
    <div class="container">
      <div class="nothing__content">
        <img src="../assets/img/heart.png" alt="">
        <h6>Sizga yoqqanini qoʻshing</h6>
        <p>Mahsulotdagi <font-awesome-icon icon="heart-circle-plus" /> belgisini bosing. Akkauntga kiring va barcha saralanganlar saqlanib qoladi</p>
        <router-link to="/" class="nothing__content-link"><font-awesome-icon icon="home" /></router-link>                
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'; // Vue funksiyalarini import qilyapmiz.
import { useStore } from 'vuex'; // Vuex store'dan foydalanish uchun useStore funksiyasini import qilyapmiz.

const store = useStore(); // Vuex store'ga kirish uchun useStore funksiyasini chaqiryapmiz.
const favoriteItems = computed(() => store.getters.favoriteItems); // Vuex'dan favoriteItems getterini olish uchun computed properti.

function addToCart(product) {
  store.dispatch('addToCart', product); // Mahsulotni savatga qo'shish funksiyasi.
}

function removeFromFavorites(productId) {
  store.dispatch('removeFromFavorites', productId); // Mahsulotni saralanganlardan olib tashlash funksiyasi.
}
</script>

