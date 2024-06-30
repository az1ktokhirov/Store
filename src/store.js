import axios from 'axios';
import { createStore } from 'vuex';

export const store = createStore({
  state: {
    products: [],
    searchQuery: '',
    cart: [],
    favorites: []
  },

  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    setSearchQuery(state, query) {
      state.searchQuery = query;
    },
    addToCart(state, product) {
      const item = state.cart.find(item => item.id === product.id);
      if (item) {
        item.quantity++;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
    },
    removeFromCart(state, productId) {
      const index = state.cart.findIndex(item => item.id === productId);
      if (index !== -1) {
        state.cart.splice(index, 1);
      }
    },
    updateCartItemQuantity(state, { productId, quantity }) {
      const item = state.cart.find(item => item.id === productId);
      if (item && quantity > 0) {
        item.quantity = quantity;
      } else if (item && quantity === 0) {
        const index = state.cart.findIndex(item => item.id === productId);
        if (index !== -1) {
          state.cart.splice(index, 1);
        }
      }
    },
    addToFavorites(state, product) {
      const item = state.favorites.find(item => item.id === product.id);
      if (!item) {
        state.favorites.push(product);
      }
    },
    removeFromFavorites(state, productId) {
      const index = state.favorites.findIndex(item => item.id === productId);
      if (index !== -1) {
        state.favorites.splice(index, 1);
      }
    }
  },

  actions: {
    async fetchProducts({ commit }) {
      try {
        const response = await axios.get('https://dummyjson.com/products?limit=200');
        const products = response.data.products;
        commit('setProducts', products);
      } catch (error) {
        console.error(error);
      }
    },
    updateSearchQuery({ commit }, query) {
      commit('setSearchQuery', query);
    },
    addToCart({ commit }, product) {
      commit('addToCart', product);
    },
    removeFromCart({ commit }, productId) {
      commit('removeFromCart', productId);
    },
    updateCartItemQuantity({ commit }, payload) {
      commit('updateCartItemQuantity', payload);
    },
    addToFavorites({ commit }, product) {
      commit('addToFavorites', product);
    },
    removeFromFavorites({ commit }, productId) {
      commit('removeFromFavorites', productId);
    }
  },

  getters: {
    getProductsByCategory: (state) => (category) => {
      return state.products.filter(product => product.category.toLowerCase() === category.toLowerCase());
    },
    getAllCategories: (state) => {
      return [...new Set(state.products.map(product => product.category))];
    },
    filteredProducts: (state) => {
      return state.products.filter(product =>
        product.title.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    },
    cartItems: (state) => {
      return state.cart;
    },
    cartItemCount: (state) => {
      return state.cart.reduce((total, item) => total + item.quantity, 0);
    },
    cartTotalPrice: (state) => {
      return state.cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    },
    favoriteItems: (state) => {
      return state.favorites;
    },
    favoriteItemCount: (state) => {
      return state.favorites.length;
    }
  }
});
