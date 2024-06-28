<template>
    <section class="cards">
        <div class="container">
            <div class="cards__content">
                <div v-for="product in productsList" :key="product.id" class="cards__content-card">
                    <div class="cards__content-card-img" @click="showProductDetail(product)">
                        <img :src="product.img" alt="" />
                    </div>
                    <h4 class="cards__content-card-title">{{ product.name }}</h4>
                    <p>{{ product.price }}</p>
                    <div class="cards__content-card-btns">
                        <button><font-awesome-icon icon="cart-plus" /></button>
                        <button><font-awesome-icon icon="heart-circle-plus" /></button>
                    </div>
                    <router-link to="/card" class="cards__content-card-buy-btn">Buy now</router-link>
                </div>
            </div>
        </div>
    </section>
    
    <!-- Detailed view component -->
    <div :class="['card-view', { show: selectedProduct }]" v-if="selectedProduct">
        <div class="card-view-area">
            <div class="card-view-area-left">
                <div><img :src="selectedProduct.img" alt="" /></div>
            </div>
            <div class="card-view-area-right">
                <h5>{{ selectedProduct.name }}</h5>
                <p>{{ selectedProduct.descr }}</p>
                <h4>{{ selectedProduct.price }}</h4>
                <div class="btns">
                    <button><font-awesome-icon icon="cart-plus" /></button>
                    <button><font-awesome-icon icon="heart-circle-plus" /></button>
                </div>
            </div>
            <a class="close" @click="closeProductDetail"><font-awesome-icon icon="xmark" /></a>
        </div>
    </div>
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
