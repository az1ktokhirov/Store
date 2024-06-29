<template>
  <section class="cards">
    <div class="container">
      <h5 class="liked-title">Siz yoqtirgan mahsulotlar</h5>
      <div class="cards__content">
        <div v-for="product in productsList" :key="product.id" class="cards__content-card">
          <div class="cards__content-card-img" @click="showProductDetail(product)">
            <img :src="product.thumbnail" alt="" />
          </div>
          <h4 class="cards__content-card-title">{{ product.title }}</h4>
          <p>{{ product.price }}</p>
          <div class="cards__content-card-btns">
            <button><font-awesome-icon icon="cart-plus" /></button>
            <button><font-awesome-icon icon="heart-circle-minus" /></button>
          </div>
          <router-link to="/card" class="cards__content-card-buy-btn">Buy now</router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { products as productsData } from "../assets/data/data";

const productsList = ref(productsData);
const selectedProduct = ref(null);

function showProductDetail(product) {
  selectedProduct.value = product;
}

function closeProductDetail() {
  selectedProduct.value = null;
}
</script>
