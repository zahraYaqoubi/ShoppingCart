import { createStore } from 'vuex'
import axios from "axios";

export default createStore({
  state: {
    sellers: [],
    addresses: [{ name: 'مهدی خدادادی', addressInfo: 'قم خیابان شهدا کوچه ۳۲' }, { name: 'محسن خدادادی', addressInfo: 'قم خیابان بنیاد کوچه ۱۲' }],
    paymentGate: ['بانک سامان', 'بانک پاسارگاد', 'آسان پرداخت'],

  },
  getters: {
    calFinalPrice: state => {
      var finalPrice = 0;
      for (var i = 0; i < state.sellers.length; i++) {
        for (var j = 0; j < state.sellers[i].products.length; j++) {
          finalPrice += state.sellers[i].products[j].pricePerNumber;
        }
      }
      return finalPrice;
    },
  },
  mutations: {
    getApi: state => {
      axios
        .get("https://minimal-cart.herokuapp.com/cart")
        .then(response => {
          state.sellers = response.data.vendors;
          // this.getPersianNumbers();
          console.log("response.data.vendors: " + response.data.vendors.length);
          for (var i = 0; i < state.sellers.length; i++) {
            for (var j = 0; j < state.sellers[i].products.length; j++) {
              state.sellers[i].products[j].pricePerNumber = state.sellers[i].products[j].price;
              state.sellers[i].products[j].primaryPricePerNumber = state.sellers[i].products[j].primaryPrice;
              state.sellers[i].products[j].numberOfProducts = 1;
             
              console.log("price " + i + ": " + state.sellers[i].products[j].pricePerNumber);
              console.log("primaryPrice " + i + ": " + state.sellers[i].products[j].primaryPricePerNumber);
            }
          }
        })
        .catch(e => {
          console.log("Api Errors => " + e);
        })
        ;
    },
    calTotalPrice(state, sellerNo) {
      var totalPrice = 0;
      for (var i = 0; i < state.sellers[sellerNo].products.length; i++) {
        totalPrice += state.sellers[sellerNo].products[i].pricePerNumber;
        // console.log("state.price[sellerNo][i]: "+state.price[sellerNo][i]);
      }
      state.sellers[sellerNo].totalPrice = totalPrice;
      
      console.log("mutation func => totalPrice: "+state.sellers[sellerNo].totalPrice);
    },
    increase(state, number) {
      if (state.sellers[number.sellerNo].products[number.productNo].numberOfProducts < state.sellers[number.sellerNo].products[number.productNo].stock) {
        state.sellers[number.sellerNo].products[number.productNo].numberOfProducts++;

        state.sellers[number.sellerNo].products[number.productNo].pricePerNumber =
          state.sellers[number.sellerNo].products[number.productNo].price * state.sellers[number.sellerNo].products[number.productNo].numberOfProducts;

          state.sellers[number.sellerNo].products[number.productNo].primaryPricePerNumber =
          state.sellers[number.sellerNo].products[number.productNo].primaryPrice * state.sellers[number.sellerNo].products[number.productNo].numberOfProducts;
          
          console.log("price " + number.sellerNo + ": " + state.sellers[number.sellerNo].products[number.productNo].pricePerNumber);
          console.log("primaryPrice " + number.sellerNo + ": " + state.sellers[number.sellerNo].products[number.productNo].primaryPricePerNumber);
          console.log("numberOfProducts " + number.sellerNo + ": " + state.sellers[number.sellerNo].products[number.productNo].numberOfProducts);
        }
    },
    decrease(state, number) {
      if (state.sellers[number.sellerNo].products[number.productNo].numberOfProducts > 1) {
        state.sellers[number.sellerNo].products[number.productNo].numberOfProducts--;

        state.sellers[number.sellerNo].products[number.productNo].pricePerNumber =
          state.sellers[number.sellerNo].products[number.productNo].price * state.sellers[number.sellerNo].products[number.productNo].numberOfProducts;

          state.sellers[number.sellerNo].products[number.productNo].primaryPricePerNumber =
          state.sellers[number.sellerNo].products[number.productNo].primaryPrice * state.sellers[number.sellerNo].products[number.productNo].numberOfProducts;
          
          console.log("price " + number.sellerNo + ": " + state.sellers[number.sellerNo].products[number.productNo].pricePerNumber);
          console.log("primaryPrice " + number.sellerNo + ": " + state.sellers[number.sellerNo].products[number.productNo].primaryPricePerNumber);
          console.log("numberOfProducts " + number.sellerNo + ": " + state.sellers[number.sellerNo].products[number.productNo].numberOfProducts);
        }
    },
    remove(state, number) {
        state.sellers[number.sellerNo].products.splice(number.productNo, 1);
        if (state.sellers[number.sellerNo].products.length == 0){
          state.sellers.splice(number.sellerNo, 1);
        }
        console.log("remove=> products: "+state.sellers[number.sellerNo].products.length);
        console.log("remove=> sellers: "+state.sellers.length);
    }
  },
  actions: {
    getApi: ({ commit }) => {
      commit('getApi');
    },
    calTotalPrice: ({ commit }, sellerNo) => {
      commit('calTotalPrice', sellerNo);
    },
    increase: ({ commit }, number) => {
      commit('increase', number);
      setTimeout(()=>{
        commit('calTotalPrice', number.sellerNo);
      },500);     
    },
    decrease: ({ commit }, number) => {
      commit('decrease', number);
      commit('calTotalPrice', number.sellerNo);
    },
    remove: ({ commit }, number) => {
      commit('remove', number);
      commit('calTotalPrice', number.sellerNo);
    },
  },
  modules: {
  }
})
