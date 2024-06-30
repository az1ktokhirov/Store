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
          <div v-if="product.reviews.length > 0" class="card__content-right-review">
            <h6>Reviews:</h6>
            <ul>
              <li v-for="(review, index) in product.reviews" :key="index">
                <h6><font-awesome-icon icon="star" style="color: #FFD43B;" />{{ review.rating }}/5</h6>
                <p>{{ review.reviewerName }}:</p>
                <p>{{ review.comment }}</p>
              </li>
            </ul>
          </div>
          <div v-if="product.warrantyInformation">
            <h6>Warranty Information:</h6>
            <p>{{ product.warrantyInformation }}</p>
          </div>
          <router-link @click="addToCart(product)" to="/">Savatga qo'shish</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';

const store = useStore();
const route = useRoute();
const router = useRouter();

const product = computed(() => {
  const id = route.params.id;
  return store.state.products.find(p => p.id === parseInt(id));
});


function addToCart(product) {
  store.dispatch('addToCart', product);
  router.push('/cart'); // Redirect to home or cart page after adding to cart
}
console.log(product);
</script>

