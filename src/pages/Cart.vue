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
                  <router-link to="/">Buyurtma qilish</router-link>
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
import { useStore } from 'vuex';
import { computed } from 'vue';

const store = useStore();

const cartItems = computed(() => store.getters.cartItems);
const cartItemCount = computed(() => store.getters.cartItemCount);
const cartTotalPrice = computed(() => store.getters.cartTotalPrice);

function removeFromCart(productId) {
    store.dispatch('removeFromCart', productId);
}

function updateCartItemQuantity(productId, quantity) {
    store.dispatch('updateCartItemQuantity', { productId, quantity });
}

function extractNumbers(text) {
    return text.match(/\d+/g)?.join('') || '0';
}
</script>

  