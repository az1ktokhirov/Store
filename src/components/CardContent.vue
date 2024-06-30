<template>
    <div class="card">
      <div class="container">
        <div class="card__content">
          <div class="card__content-left">
            <div class="card__content-left-img">
              <img :src="product.thumbnail" alt="" />
            </div>
          </div>
          <div class="card__content-right">
            <h5>{{ product.title }}</h5>
            <p>{{ product.description }}</p>
            <h5>{{ product.price }}$</h5>
            <a href="#">Rasmiylashtirish</a>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import { useStore } from 'vuex';
  import { useRoute } from 'vue-router';
  
  const store = useStore();
  const route = useRoute();
  
  const product = computed(() => {
    const id = route.params.id;
    return store.state.products.find(p => p.id === parseInt(id));
  });
  </script>
  