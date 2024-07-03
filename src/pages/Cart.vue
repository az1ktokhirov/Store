<template>
    <div class="cart" v-if="cartItems.length">
        <div class="container">
            <div class="cart__content">
                <div class="cart__content-left">
                    <div v-for="item in cartItems" :key="item.id" class="cart__content-left-card">
                        <div class="cart__content-left-card-img">
                            <img :src="item.thumbnail" alt="">
                        </div>
                        <div class="cart__content-left-card-texts">
                            <h4>{{ item.title }}</h4>
                            <h4>{{ item.price }}$</h4>
                            <h4>Return policy: {{ extractNumbers(item.returnPolicy) }} days</h4>
                            <div class="btns">
                                <button @click="updateCartItemQuantity(item.id, item.quantity - 1)">
                                    <font-awesome-icon icon="minus" />
                                </button>
                                <p>{{ item.quantity }}</p>
                                <button @click="updateCartItemQuantity(item.id, item.quantity + 1)">
                                    <font-awesome-icon icon="plus" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="cart__content-right">
                    <div class="cart__content-right-prices">
                        <p>Mahsulotlar soni: <span>{{ cartItemCount }}</span></p>
                        <p>Umumiy narx: <span>{{ cartTotalPrice }}$</span></p>
                    </div>
                    <div class="cart__content-right-delivery">
                        <font-awesome-icon icon="truck" />
                        <p>Siz uchun bepul yetkazib berish xizmati mavjud.</p>
                    </div>
                    <router-link to="/th" @click.native="clearCart">Buyurtma qilish</router-link>
                </div>
            </div>
        </div>
    </div>
    <div class="nothing" v-else>
        <div class="container">
            <div class="nothing__content">
                <img src="../assets/img/cart.png" alt="">
                <h6>Savatda hozircha mahsulot yoʻq</h6>
                <p>Bosh sahifadagi to’plamlardan boshlang yoki kerakli mahsulotni qidiruv orqali toping</p>
                <router-link to="/" class="nothing__content-link"><font-awesome-icon icon="home" /></router-link>
            </div>
        </div>
    </div>
  </template>
  
  <script setup>
  import { useStore } from 'vuex'; // Vuex store'dan foydalanish uchun useStore funksiyasini import qilyapmiz.
  import { computed } from 'vue'; // Computed propertilar yaratish uchun computed funksiyasini import qilyapmiz.
  
  const store = useStore(); // Vuex store'ga kirish uchun useStore funksiyasini chaqiryapmiz.
  
  const cartItems = computed(() => store.getters.cartItems); // Savatdagi mahsulotlarni olish uchun computed properti yaratamiz.
  const cartItemCount = computed(() => store.getters.cartItemCount); // Savatdagi mahsulotlar sonini olish uchun computed properti yaratamiz.
  const cartTotalPrice = computed(() => store.getters.cartTotalPrice); // Savatdagi jami narxni olish uchun computed properti yaratamiz.
  
  function removeFromCart(productId) {
      store.dispatch('removeFromCart', productId); // Mahsulotni savatdan olib tashlash uchun dispatch orqali Vuex action'ni chaqiramiz.
  }
  
  function updateCartItemQuantity(productId, quantity) {
      store.dispatch('updateCartItemQuantity', { productId, quantity }); // Mahsulot miqdorini yangilash uchun dispatch orqali Vuex action'ni chaqiramiz.
  }
  
  function extractNumbers(text) {
      return text.match(/\d+/g)?.join('') || '0'; // Berilgan matndan raqamlarni chiqarib olish funksiyasi. Agar raqam topilmasa, '0' qaytaradi.
  }
  
  function clearCart() {
      store.dispatch('clearCart'); // Savatni tozalash uchun Vuex action'ni chaqiramiz.
  }
  </script>
  