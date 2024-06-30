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
                <h4>{{ item.title }}<span>{{ item.price }}$</span></h4>
                <p>{{ item.description }}</p>
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
              <!-- Updated label to show total items -->
              <p>Mahsulotlar soni: <span>{{ cartItemCount }}</span></p>
              <p>Umumiy narx: <span>{{ cartTotalPrice }}$</span></p>
            </div>
            <div class="cart__content-right-delivery">
              <font-awesome-icon icon="truck" />
              <p>Siz uchun bepul yetkazib berish xizmati mavjud.</p>
            </div>
            <router-link to="/">Buyurtma qilish</router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="nothing" v-else>
      <div class="container">
        <div class="nothing__content">
          <svg width="150px" height="150px" viewBox="-3.12 -3.12 30.24 30.24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#2b2b2b" transform="rotate(0)">
            <g id="SVGRepo_bgCarrier" stroke-width="0" transform="translate(3.3599999999999994,3.3599999999999994), scale(0.72)">
              <path transform="translate(-3.12, -3.12), scale(1.8900000000000001)" fill="#ffe9d1" d="M9.166.33a2.25 2.25 0 00-2.332 0l-5.25 3.182A2.25 2.25 0 00.5 5.436v5.128a2.25 2.25 0 001.084 1.924l5.25 3.182a2.25 2.25 0 002.332 0l5.25-3.182a2.25 2.25 0 001.084-1.924V5.436a2.25 2.25 0 00-1.084-1.924L9.166.33z" strokewidth="0"></path>
            </g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#3b3b3b3b" stroke-width="0.048"></g>
            <g id="SVGRepo_iconCarrier">
              <path d="M21 5L19 12H7.37671M20 16H8L6 3H3M11 3L13.5 5.5M13.5 5.5L16 8M13.5 5.5L16 3M13.5 5.5L11 8M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" stroke="#000000"></path>
            </g>
          </svg>
          <h6>Savatchangiz bosh</h6>
          <p>Asosiy sahifaga o'tib mahsulot harid qiling</p>
          <router-link to="/" class="nothing__content-link"><font-awesome-icon icon="home" /></router-link>                
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useStore } from 'vuex';
  import { computed } from 'vue';
  
  const store = useStore();
  
  const cartItems = computed(() => store.getters.cartItems);
  const cartItemCount = computed(() => store.getters.cartItemCount); // Updated to use the new total quantity getter
  const cartTotalPrice = computed(() => store.getters.cartTotalPrice);
  
  function removeFromCart(productId) {
      store.dispatch('removeFromCart', productId);
  }
  
  function updateCartItemQuantity(productId, quantity) {
      store.dispatch('updateCartItemQuantity', { productId, quantity });
  }
  </script>
  