<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";

const slideIndex = ref(1);  
const direction = ref(1);
const autoplayInterval = ref(null);
const slideElements = ref([]);
const prevButton = ref(null);
const nextButton = ref(null);
const pagination = ref(null);
const totalSlides = 3; 

const prepareInfiniteLoop = () => {
  const swiper = document.querySelector(".header__content-swiper");

  const firstClone = swiper.children[0].cloneNode(true);
  const lastClone = swiper.children[totalSlides - 1].cloneNode(true);

  swiper.appendChild(firstClone);
  swiper.insertBefore(lastClone, swiper.children[0]);

  slideElements.value = document.querySelectorAll(".header__content-swiper-slide");
};

const updateSlideIndex = (index) => {
  if (index > totalSlides) {
    direction.value = -1;
    slideIndex.value = totalSlides;
  } else if (index < 1) {
    direction.value = 1;
    slideIndex.value = 1;
  } else {
    slideIndex.value = index;
  }
  moveToCurrentSlide();
};

const moveToCurrentSlide = () => {
  document.querySelector(".header__content-swiper").style.transition = 'transform 0.5s ease';
  document.querySelector(".header__content-swiper").style.transform = `translateX(-${slideIndex.value * 100}%)`;
  updateActiveDot();
};

const prevSlide = () => {
  direction.value = -1;
  updateSlideIndex(slideIndex.value - 1);
  resetAutoplay();
};

const nextSlide = () => {
  direction.value = 1;
  updateSlideIndex(slideIndex.value + 1);
  resetAutoplay();
};

const startAutoplay = () => {
  autoplayInterval.value = setInterval(() => {
    if (direction.value === 1) {
      nextSlide();
    } else {
      prevSlide();
    }
  }, 3000); 
};

const stopAutoplay = () => {
  clearInterval(autoplayInterval.value);
};

const resetAutoplay = () => {
  stopAutoplay();
  startAutoplay();
};

const goToSlide = (index) => {
  updateSlideIndex(index + 1); 
  resetAutoplay();
};

const updateActiveDot = () => {
  const dots = pagination.value.querySelectorAll(".pagination-dot");
  dots.forEach((dot, index) => {
    if (index === ((slideIndex.value - 1 + totalSlides) % totalSlides)) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
};

onMounted(() => {
  prepareInfiniteLoop();

  prevButton.value.addEventListener("click", prevSlide);
  nextButton.value.addEventListener("click", nextSlide);

  startAutoplay();
  moveToCurrentSlide(); 
  updateActiveDot(); 
});

onUnmounted(() => {
  stopAutoplay();
});

watch(slideElements, moveToCurrentSlide);
</script>

<template>
    <header class="header">
      <div class="container">
        <div class="header__content">
          <div class="header__content-swiper">
            <div class="header__content-swiper-slide" v-for="index in totalSlides" :key="index">
              <h4>Galaxy watch FE</h4>
              <h2>Ajoyib narxda yaxshilangan salomatlik</h2>
              <p>
                $100 gacha tejang. Yangi Galaxy Watch FE ni sotib olsangiz, <br />
                tejashingiz - kafolatlangan.
              </p>
            </div>
          </div>
          <button ref="prevButton" class="btn-prev">&lt;</button>
          <button ref="nextButton" class="btn-next">&gt;</button>
          <div ref="pagination" class="pagination">
            <span class="pagination-dot" v-for="index in totalSlides" :key="index" @click="goToSlide(index - 1)"></span>
          </div>
        </div>
      </div>
    </header>
  </template>
  
  
  
