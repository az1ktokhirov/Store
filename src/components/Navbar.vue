<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
const store = useStore();
const searchQuery = ref("");
function updateSearch() {
    store.dispatch("updateSearchQuery", searchQuery.value);
}
const isModalOpen = ref(false);
const toggleModal = () => {
    isModalOpen.value = !isModalOpen.value;
};
const catalogIcon = computed(() => (isModalOpen.value ? "xmark" : "bars"));
</script>
<template>
    <nav class="nav">
        <div class="container">
            <div class="nav__content">
                <div class="nav__content-logo">
                    <a href="/"><span>azt</span> STORE</a>
                </div>
                <div class="nav__content-catalog" @click="toggleModal">
                    <font-awesome-icon :icon="catalogIcon" class="nav__content-catalog-icon" />
                    <p>Katalog</p>
                </div>
                <div class="nav__content-search">
                    <input type="search" name="search" placeholder="Qidirish..." v-model="searchQuery" @input="updateSearch" />
                    <font-awesome-icon icon="magnifying-glass" class="nav__content-search-icon" />
                </div>
                <div class="nav__content-items">
                    <router-link to="/" class="nav__content-items-item">
                        <font-awesome-icon icon="home" class="icon" />
                    </router-link>
                    <router-link to="/liked" class="nav__content-items-item">
                        <font-awesome-icon icon="heart" class="icon" />
                    </router-link>
                    <router-link to="/cart" class="nav__content-items-item">
                        <font-awesome-icon icon="cart-shopping" class="icon" />
                    </router-link>
                </div>
            </div>
        </div>
        <div :class="['nav__modal', { 'nav__modal-open': isModalOpen }]">
            <ul class="nav__modal-list">
                <li>
                    <router-link to="/avtomobillar" class="nav__modal-list-link" @click="toggleModal"> <font-awesome-icon icon="car" />Avtomobillar </router-link>
                </li>
                <li>
                    <router-link to="/aksesuarlar" class="nav__modal-list-link" @click="toggleModal"> <font-awesome-icon icon="headphones" />Aksessuarlar </router-link>
                </li>
                <li>
                    <router-link to="/planshetlar" class="nav__modal-list-link" @click="toggleModal"> <font-awesome-icon icon="tablet" />Planshetlar</router-link>
                </li>
                <li>
                    <router-link to="/maishiy-kimyo-vositalari" class="nav__modal-list-link" @click="toggleModal"> <font-awesome-icon icon="pump-soap" />Teri parvarishi</router-link>
                </li>
                <li>
                    <router-link to="/mototransportlar" class="nav__modal-list-link" @click="toggleModal"> <font-awesome-icon icon="motorcycle" />Mototransportlar</router-link>
                </li>
                <li>
                    <router-link to="/ko`zoynaklar" class="nav__modal-list-link" @click="toggleModal"> <font-awesome-icon icon="glasses" />Ko'zoynaklar</router-link>
                </li>
                <li>
                    <router-link to="/noutbuklar" class="nav__modal-list-link" @click="toggleModal"> <font-awesome-icon icon="laptop" />Noutbuklar</router-link>
                </li>
                <li>
                    <router-link to="/uy-dekaratsiyalari" class="nav__modal-list-link" @click="toggleModal"> <font-awesome-icon icon="chair" />Uy dekoratsiyalari</router-link>
                </li>
                <li>
                    <router-link to="/erkaklar-uchun" class="nav__modal-list-link" @click="toggleModal"> <font-awesome-icon icon="person" />Erkaklar uchun</router-link>
                </li>
                <li>
                    <router-link to="/ayollar-uchun" class="nav__modal-list-link" @click="toggleModal"> <font-awesome-icon icon="person-dress" />Ayollar uchun</router-link>
                </li>
                <li>
                    <router-link to="/oziq-ovqat" class="nav__modal-list-link" @click="toggleModal"> <font-awesome-icon icon="apple-whole" />Oziq-ovqat mahsulotlari</router-link>
                </li>
                <li>
                    <router-link to="/sport-va-hordiq" class="nav__modal-list-link" @click="toggleModal"> <font-awesome-icon icon="basketball" />Sport va hordiq </router-link>
                </li>
                <li>
                    <router-link to="/mebellar" class="nav__modal-list-link" @click="toggleModal"> <font-awesome-icon icon="home" />Uy jihozlari</router-link>
                </li>
                <li>
                    <router-link to="/oshxona-jihozlari" class="nav__modal-list-link" @click="toggleModal"> <font-awesome-icon icon="kitchen-set" />Oshxona-jihozlari</router-link>
                </li>
                <li>
                    <router-link to="/smartfonlar" class="nav__modal-list-link" @click="toggleModal"> <font-awesome-icon icon="mobile" />Smartfonlar</router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>
