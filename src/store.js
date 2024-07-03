import axios from 'axios'; // HTTP so'rovlarni amalga oshirish uchun axios kutubxonasini import qilyapmiz.
import { createStore } from 'vuex'; // Vuex kutubxonasidan store (holat saqlovchi) yaratish uchun createStore funksiyasini import qilyapmiz.

export const store = createStore({
  state: {
    products: [], // Mahsulotlar ro'yxatini saqlash uchun bo'sh massiv.
    searchQuery: '', // Qidiruv so'rovini saqlash uchun bo'sh string.
    cart: JSON.parse(localStorage.getItem('cart')) || [], // Savatdagi mahsulotlarni saqlash uchun massiv (localStorage'dan o'qiladi yoki bo'sh massiv).
    favorites: JSON.parse(localStorage.getItem('favorites')) || [] // Saralangan mahsulotlarni saqlash uchun massiv (localStorage'dan o'qiladi yoki bo'sh massiv).
  },

  mutations: {
    setProducts(state, products) {
      state.products = products; // Mahsulotlar ro'yxatini yangilash.
    },
    setSearchQuery(state, query) {
      state.searchQuery = query; // Qidiruv so'rovini yangilash.
    },
    addToCart(state, product) {
      const item = state.cart.find(item => item.id === product.id); // Savatda mahsulotni qidirish.
      if (item) {
        item.quantity++; // Agar mahsulot savatda bo'lsa, miqdorini oshirish.
      } else {
        state.cart.push({ ...product, quantity: 1 }); // Agar mahsulot savatda bo'lmasa, yangi mahsulot qo'shish.
      }
      localStorage.setItem('cart', JSON.stringify(state.cart)); // Savatni localStorage'ga saqlash.
    },
    removeFromCart(state, productId) {
      const index = state.cart.findIndex(item => item.id === productId); // Savatda mahsulotni ID bo'yicha qidirish.
      if (index !== -1) {
        state.cart.splice(index, 1); // Agar mahsulot topilsa, savatdan olib tashlash.
      }
      localStorage.setItem('cart', JSON.stringify(state.cart)); // Savatni localStorage'ga saqlash.
    },
    updateCartItemQuantity(state, { productId, quantity }) {
      const item = state.cart.find(item => item.id === productId); // Savatda mahsulotni ID bo'yicha qidirish.
      if (item && quantity > 0) {
        item.quantity = quantity; // Agar mahsulot topilsa va miqdor 0 dan katta bo'lsa, miqdorini yangilash.
      } else if (item && quantity === 0) {
        const index = state.cart.findIndex(item => item.id === productId); // Agar miqdor 0 bo'lsa, mahsulotni savatdan olib tashlash.
        if (index !== -1) {
          state.cart.splice(index, 1);
        }
      }
      localStorage.setItem('cart', JSON.stringify(state.cart)); // Savatni localStorage'ga saqlash.
    },
    addToFavorites(state, product) {
      const item = state.favorites.find(item => item.id === product.id); // Saralangan mahsulotlarni ID bo'yicha qidirish.
      if (!item) {
        state.favorites.push(product); // Agar mahsulot saralanganlarda bo'lmasa, yangi mahsulot qo'shish.
        localStorage.setItem('favorites', JSON.stringify(state.favorites)); // Saralanganlarni localStorage'ga saqlash.
      }
    },
    removeFromFavorites(state, productId) {
      const index = state.favorites.findIndex(item => item.id === productId); // Saralangan mahsulotlarni ID bo'yicha qidirish.
      if (index !== -1) {
        state.favorites.splice(index, 1); // Agar mahsulot topilsa, saralanganlardan olib tashlash.
        localStorage.setItem('favorites', JSON.stringify(state.favorites)); // Saralanganlarni localStorage'ga saqlash.
      }
    },
    clearCart(state) {
      state.cart = []; // Savatni tozalash.
      localStorage.setItem('cart', JSON.stringify(state.cart)); // Savatni localStorage'ga saqlash.
    }
  },

  actions: {
    async fetchProducts({ commit }) {
      try {
        const response = await axios.get('https://dummyjson.com/products?limit=200'); // Mahsulotlarni olish uchun HTTP so'rov yuborish.
        const products = response.data.products; // Javobdan mahsulotlarni olish.
        commit('setProducts', products); // Mahsulotlar ro'yxatini yangilash uchun mutatsiyani chaqirish.
      } catch (error) {
        console.error(error); // Agar xatolik bo'lsa, konsolga chiqarish.
      }
    },
    updateSearchQuery({ commit }, query) {
      commit('setSearchQuery', query); // Qidiruv so'rovini yangilash uchun mutatsiyani chaqirish.
    },
    addToCart({ commit }, product) {
      commit('addToCart', product); // Savatga mahsulot qo'shish uchun mutatsiyani chaqirish.
    },
    removeFromCart({ commit }, productId) {
      commit('removeFromCart', productId); // Savatdan mahsulot olib tashlash uchun mutatsiyani chaqirish.
    },
    updateCartItemQuantity({ commit }, payload) {
      commit('updateCartItemQuantity', payload); // Savatda mahsulot miqdorini yangilash uchun mutatsiyani chaqirish.
    },
    addToFavorites({ commit }, product) {
      commit('addToFavorites', product); // Saralangan mahsulotlarga qo'shish uchun mutatsiyani chaqirish.
    },
    removeFromFavorites({ commit }, productId) {
      commit('removeFromFavorites', productId); // Saralangan mahsulotlardan olib tashlash uchun mutatsiyani chaqirish.
    },
    clearCart({ commit }) {
      commit('clearCart'); // Savatni tozalash uchun mutatsiyani chaqirish.
    }
  },

  getters: {
    getProductsByCategory: (state) => (category) => {
      return state.products.filter(product => product.category.toLowerCase() === category.toLowerCase()); // Kategoriyaga ko'ra mahsulotlarni filterlash.
    },
    getAllCategories: (state) => {
      return [...new Set(state.products.map(product => product.category))]; // Barcha kategoriyalarni olish.
    },
    filteredProducts: (state) => {
      return state.products.filter(product =>
        product.title.toLowerCase().includes(state.searchQuery.toLowerCase()) // Qidiruv so'roviga mos keladigan mahsulotlarni filterlash.
      );
    },
    cartItems: (state) => {
      return state.cart; // Savatdagi mahsulotlarni olish.
    },
    cartItemCount: (state) => {
      return state.cart.reduce((total, item) => total + item.quantity, 0); // Savatdagi jami mahsulotlar sonini hisoblash.
    },
    cartTotalPrice: (state) => {
      return state.cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2); // Savatdagi jami narxni hisoblash.
    },
    favoriteItems: (state) => {
      return state.favorites; // Saralangan mahsulotlarni olish.
    },
    favoriteItemCount: (state) => {
      return state.favorites.length; // Saralangan mahsulotlar sonini hisoblash.
    }
  }
});
