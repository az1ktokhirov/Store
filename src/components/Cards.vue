<template>
  <section class="cards">
    <div class="container">
      <div class="cards__content">
        <div v-for="product in displayedProducts" :key="product.id" class="cards__content-card">
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
      <button v-if="moreToShow" @click="showMoreProducts" class="cards__content-btn">Ko'proq ko'rsatish</button>
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
import { ref, onMounted, computed } from 'vue'; // Vue funksiyalarini import qilyapmiz.
import { useStore } from 'vuex'; // Vuex store'dan foydalanish uchun useStore funksiyasini import qilyapmiz.

const store = useStore(); // Vuex store'ga kirish uchun useStore funksiyasini chaqiryapmiz.
const selectedProduct = ref(null); // Tanlangan mahsulotni saqlash uchun reaktiv (reactive) qiymat.
const productsToShow = ref(20); // Ko'rsatiladigan mahsulotlar soni uchun reaktiv qiymat.

const filteredProducts = computed(() => store.getters.filteredProducts); // Vuex'dan filteredProducts getterini olish uchun computed properti.

const displayedProducts = computed(() => filteredProducts.value.slice(0, productsToShow.value)); // Filterlangan mahsulotlardan faqat kerakli qismini ko'rsatish uchun computed properti.

const moreToShow = computed(() => filteredProducts.value.length > productsToShow.value); // Ko'rsatilishi mumkin bo'lgan mahsulotlar soni hali borligini tekshirish uchun computed properti.

onMounted(() => {
  store.dispatch('fetchProducts'); // Komponent montaj qilinganda mahsulotlarni olish uchun fetchProducts action'ini chaqiramiz.
});

function showMoreProducts() {
  productsToShow.value += 20; // Ko'rsatiladigan mahsulotlar sonini oshirish funksiyasi.
}

function showProductDetail(product) {
  selectedProduct.value = product; // Mahsulotning batafsil ma'lumotlarini ko'rsatish uchun tanlangan mahsulotni yangilash funksiyasi.
}

function closeProductDetail() {
  selectedProduct.value = null; // Mahsulotning batafsil ma'lumotlarini yopish funksiyasi.
}

function addToCart(product) {
  store.dispatch('addToCart', product); // Mahsulotni savatga qo'shish funksiyasi.
}

function toggleFavorite(product) {
  if (isFavorite(product)) {
    store.dispatch('removeFromFavorites', product.id); // Agar mahsulot saralangan bo'lsa, saralanganlardan olib tashlash funksiyasi.
  } else {
    store.dispatch('addToFavorites', product); // Agar mahsulot saralangan bo'lmasa, saralanganlarga qo'shish funksiyasi.
  }
}

function isFavorite(product) {
  return store.getters.favoriteItems.some(item => item.id === product.id); // Mahsulot saralanganligini tekshirish funksiyasi.
}

const card = ref(null); // Mahsulot kartasi elementiga ishora qilish uchun reaktiv qiymat.

function handleMouseMove(e) {
  const cardRect = card.value.getBoundingClientRect(); // Mahsulot kartasining geometrik o'lchamlarini olish.
  const cardX = cardRect.left + cardRect.width / 2; // Mahsulot kartasining markaziy X koordinatasini hisoblash.
  const cardY = cardRect.top + cardRect.height / 2; // Mahsulot kartasining markaziy Y koordinatasini hisoblash.
  const mouseX = e.clientX; // Sichqoncha X koordinatasi.
  const mouseY = e.clientY; // Sichqoncha Y koordinatasi.
  const rotateX = (mouseY - cardY) / 25; // Mahsulot kartasining X o'qi bo'ylab burilish burchagini hisoblash.
  const rotateY = (mouseX - cardX) / 25; // Mahsulot kartasining Y o'qi bo'ylab burilish burchagini hisoblash.
  card.value.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`; // Mahsulot kartasining burilishini amalga oshirish.
}

function handleMouseLeave() {
  card.value.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)'; // Sichqoncha kartadan chiqqanda mahsulot kartasining burilishini qayta tiklash.
}
</script>