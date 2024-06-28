<script setup>
import { ref, computed } from "vue";

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
          <font-awesome-icon
            :icon="catalogIcon"
            class="nav__content-catalog-icon"
          />
          <p>Katalog</p>
        </div>
        <div class="nav__content-search">
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Qidirish..."
          />
          <font-awesome-icon
            icon="magnifying-glass"
            class="nav__content-search-icon"
          />
        </div>
        <div class="nav__content-items">
          <a href="/" class="nav__content-items-item">
            <font-awesome-icon icon="user" class="icon" />
          </a>
          <a href="/liked" class="nav__content-items-item">
            <font-awesome-icon icon="heart" class="icon" />
          </a>
          <a href="/cart" class="nav__content-items-item">
            <font-awesome-icon icon="cart-shopping" class="icon" />
          </a>
        </div>
      </div>
      <div :class="['nav__modal', { 'nav__modal-open': isModalOpen }]">
        <ul class="nav__modal-list">
          <li>
            <a href="#" class="nav__modal-list-link">
              <font-awesome-icon icon="car" />Avtotovarlar
            </a>
          </li>
          <li>
            <a href="#" class="nav__modal-list-link">
              <font-awesome-icon icon="glasses" />Aksessuarlar
            </a>
          </li>
          <li>
            <a href="#" class="nav__modal-list-link">
              <font-awesome-icon icon="blender" />Maishiy texnika
            </a>
          </li>
          <li>
            <a href="#" class="nav__modal-list-link">
              <font-awesome-icon icon="pump-soap" />Maishiy kimyoviy moddalar
            </a>
          </li>
          <li>
            <a href="#" class="nav__modal-list-link">
              <font-awesome-icon icon="seedling" />Dacha, bog' va tomorqa
            </a>
          </li>
          <li>
            <a href="#" class="nav__modal-list-link">
              <font-awesome-icon icon="horse" />Bolalar tovarlari
            </a>
          </li>
          <li>
            <a href="#" class="nav__modal-list-link">
              <font-awesome-icon icon="heart-pulse" />Salomatlik
            </a>
          </li>
          <li>
            <a href="#" class="nav__modal-list-link">
              <font-awesome-icon icon="paw" />Hayvonlar uchun tovarlar
            </a>
          </li>
          <li>
            <a href="#" class="nav__modal-list-link">
              <font-awesome-icon icon="pencil" />Kanselyariya tovarlari
            </a>
          </li>
          <li>
            <a href="#" class="nav__modal-list-link">
              <font-awesome-icon icon="book" />Kitoblar
            </a>
          </li>
          <li>
            <a href="#" class="nav__modal-list-link">
              <font-awesome-icon icon="hand-holding-droplet" />Go'zallik va
              parvarish
            </a>
          </li>
          <li>
            <a href="#" class="nav__modal-list-link">
              <font-awesome-icon icon="shoe-prints" />Poyabzallar
            </a>
          </li>
          <li>
            <a href="#" class="nav__modal-list-link">
              <font-awesome-icon icon="t-shirt" />Kiyim
            </a>
          </li>
          <li>
            <a href="#" class="nav__modal-list-link">
              <font-awesome-icon icon="apple-whole" />Oziq-ovqat mahsulotlari
            </a>
          </li>
          <li>
            <a href="#" class="nav__modal-list-link">
              <font-awesome-icon icon="basketball" />Sport va hordiq
            </a>
          </li>
          <li>
            <a href="#" class="nav__modal-list-link">
              <font-awesome-icon icon="paint-roller" />Qurilish va ta'mirlash
            </a>
          </li>
          <li>
            <a href="#" class="nav__modal-list-link">
              <font-awesome-icon icon="home" />Uy-ro'zg'or buyumlari
            </a>
          </li>
          <li>
            <a href="#" class="nav__modal-list-link">
              <font-awesome-icon icon="headphones" />Elektronika
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
