import axios from 'axios';
import { createStore } from 'vuex';

export const store = createStore({
  state: {
    products: [],
    searchQuery: ''
  },

  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    setSearchQuery(state, query) {
      state.searchQuery = query;
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
    }
  }
});
