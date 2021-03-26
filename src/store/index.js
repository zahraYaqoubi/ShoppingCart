import { createStore } from 'vuex'
import axios from "axios";

export default createStore({
  state: {
    sellers: [],
    addresses: [{ name: 'مهدی خدادادی', addressInfo: 'قم خیابان شهدا کوچه ۳۲' }, { name: 'محسن خدادادی', addressInfo: 'قم خیابان بنیاد کوچه ۱۲' }],
    totalPrice: [],
    paymentGate: ['بانک سامان', 'بانک پاسارگاد', 'آسان پرداخت'],
    numberOfProducts: [],
    price: [],
    primaryPrice: [],

  },
  getters: {
    calFinalPrice: state => {
      var finalPrice = 0;
      for (var i = 0; i < state.sellers.length; i++) {
        for (var j = 0; j < state.sellers[i].products.length; j++) {
          finalPrice += state.price[i][j];
        }
      }
      // console.log('finalPrice: ' + finalPrice);
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
          var p, pp, np;
          for (var i = 0; i < response.data.vendors.length; i++) {
            p = [];
            pp = [];
            np = [];
            for (var j = 0; j < response.data.vendors[i].products.length; j++) {
              p.push(response.data.vendors[i].products[j].price);
              pp.push(response.data.vendors[i].products[j].primaryPrice);
              np.push(1);
              
              // console.log("price " + i + ": " + state.price[i][j]);
              // console.log("primaryPrice " + i + ": " + state.primaryPrice[i][j]);
            }
            state.price.push(p);
            state.primaryPrice.push(pp);
            state.numberOfProducts.push(np);
          }
        })
        .catch(e => {
          console.log("Api Errors => " + e);
        })
        ;
    },
    calTotalPrice(state, sellerNo) {
      var totalPrice = 0;
      // state.totalPrice[sellerNo] = 0;
      for (var i = 0; i < state.sellers[sellerNo].products.length; i++) {
        totalPrice += state.price[sellerNo][i];
        console.log("state.price[sellerNo][i]: "+state.price[sellerNo][i]);
      }
      state.totalPrice[sellerNo] = totalPrice;
      console.log("mutation func => totalPrice: "+state.totalPrice[sellerNo]);
    },
    increase(state, number) {
      // console.log("sellerNo: " + number.sellerNo + " ,productNo: " + number.productNo);
      if (state.numberOfProducts[number.sellerNo][number.productNo] < state.sellers[number.sellerNo].products[number.productNo].stock) {
        state.numberOfProducts[number.sellerNo][number.productNo]++;
        state.price[number.sellerNo][number.productNo] =
          state.sellers[number.sellerNo].products[number.productNo].price * state.numberOfProducts[number.sellerNo][number.productNo];

        state.primaryPrice[number.sellerNo][number.productNo] =
          state.sellers[number.sellerNo].products[number.productNo].primaryPrice * state.numberOfProducts[number.sellerNo][number.productNo];
      }
    },
    decrease(state, number) {
      // console.log("sellerNo: " + number.sellerNo + " ,productNo: " + number.productNo);
      if (state.numberOfProducts[number.sellerNo][number.productNo] > 1) {
        state.numberOfProducts[number.sellerNo][number.productNo]--;
        state.price[number.sellerNo][number.productNo] =
          state.sellers[number.sellerNo].products[number.productNo].price * state.numberOfProducts[number.sellerNo][number.productNo];

        state.primaryPrice[number.sellerNo][number.productNo] =
          state.sellers[number.sellerNo].products[number.productNo].primaryPrice * state.numberOfProducts[number.sellerNo][number.productNo];

      }
    },
    remove(state, number) {
      state.sellers[number.sellerNo].products.splice(number.productNo, 1);
      state.price[number.sellerNo].splice(number.productNo, 1);
      state.primaryPrice[number.sellerNo].splice(number.productNo, 1);
      state.numberOfProducts[number.sellerNo].splice(number.productNo, 1);
      if (state.sellers[number.sellerNo].products.length == 0){
        state.sellers.splice(number.sellerNo, 1);
        state.price.splice(number.sellerNo, 1);
        state.primaryPrice.splice(number.sellerNo, 1);
        state.numberOfProducts.splice(number.sellerNo, 1);
      }
        console.log("remove=> products: "+state.sellers[number.sellerNo].products[0].price);
        console.log("remove=> sellers: "+state.sellers.length);
    }
    // updatePrices(state, number) {
    //   console.log("sellerNo: "+number.sellerNo+" ,productNo: "+number.productNo);


    //   state.price[number.sellerNo][number.productNo] =
    //     state.sellers[number.sellerNo].products[number.productNo].price * state.numberOfProducts;

    //   state.primaryPrice[number.sellerNo][number.productNo] =
    //     state.sellers[number.sellerNo].products[number.productNo].primaryPrice * state.numberOfProducts;

    //     // this.calTotalPrice();
    //     // this.calFinalPrice();
    // }
  },
  actions: {
    getApi: ({ commit }) => {
      commit('getApi');
    },
    calTotalPrice: ({ commit }, sellerNo) => {
      commit('calTotalPrice', sellerNo);
    },
    increase: ({ commit }, number) => {
      // console.log("sellerNo: " + number.sellerNo + " ,productNo: " + number.productNo);
      commit('increase', number);
      setTimeout(()=>{
        commit('calTotalPrice', number.sellerNo);
      },500);     
    },
    decrease: ({ commit }, number) => {
      // console.log("sellerNo: " + number.sellerNo + " ,productNo: " + number.productNo);
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
