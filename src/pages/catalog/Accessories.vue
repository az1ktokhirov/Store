<template>
    <section class="cards">
      <div class="container">
        <div class="cards__content">
          <h5 class="cards-title">Aksessuarlar</h5>
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
  const store = useStore(); // Vuex store'ini chaqirish
  const transportProducts = computed(() => store.getters.getProductsByCategory("mobile-accessories")); // transportProducts ma'lumotlarini hisoblash
  const selectedProduct = ref(null); // Tanlangan mahsulot o'zgaruvchisi
  // Komponent yuklanganida ma'lumotlarni yuklash
  onMounted(() => {
      store.dispatch('fetchProducts');
  });
  // Mahsulot detali chiqarish funksiyasi
  function showProductDetail(product) {
      selectedProduct.value = product;
  }
  // Mahsulot detali yopish funksiyasi
  function closeProductDetail() {
      selectedProduct.value = null;
  }
  // Savatga mahsulot qo'shish funksiyasi
  function addToCart(product) {
      store.dispatch('addToCart', product);
  }
  // Sevimli mahsulotni yoki yo'q qilish funksiyasi
  function toggleFavorite(product) {
      if (isFavorite(product)) {
          store.dispatch('removeFromFavorites', product.id);
      } else {
          store.dispatch('addToFavorites', product);
      }
  }
  // Mahsulot sevimliligi tekshirish funksiyasi
  function isFavorite(product) {
      return store.getters.favoriteItems.some(item => item.id === product.id);
  }
  const card = ref(null); // Karta o'zgaruvchisi
  // Mausor ustida ishlovchi funksiya
  function handleMouseMove(e) {
      const cardRect = card.value.getBoundingClientRect(); // Karta to'g'risida bo'yicha ma'lumotlar
      const cardX = cardRect.left + cardRect.width / 2; // Karta o'rtasidagi x
      const cardY = cardRect.top + cardRect.height / 2; // Karta o'rtasidagi y
      const mouseX = e.clientX; // Foydalanuvchi tarmog'idan x
      const mouseY = e.clientY; // Foydalanuvchi tarmog'idan y
      const rotateX = (mouseY - cardY) / 25; // X bo'lgan aylantirish
      const rotateY = (mouseX - cardX) / 25; // Y bo'lgan aylantirish
      card.value.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`; // Karta transformatsiyasi
  }
  // Mausor tark etish funksiyasi
  function handleMouseLeave() {
      card.value.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)'; // Karta transformatsiyasini boshqarish
  }
  </script>