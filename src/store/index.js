import { createStore } from 'vuex'
import axios from "axios";

export default createStore({
  state: {
    sellers: [],
    addresses: [{ name: 'مهدی خدادادی', addressInfo: 'قم خیابان شهدا کوچه ۳۲' }, { name: 'محسن خدادادی', addressInfo: 'قم خیابان بنیاد کوچه ۱۲' }],
    finalPrice: 0,
    paymentGate: ['بانک سامان','بانک پاسارگاد','آسان پرداخت']
  },
  mutations: {
    getApi: state => {
      axios
        .get("https://minimal-cart.herokuapp.com/cart")
        .then(response => {
          state.sellers = response.data.vendors;
          // this.getPersianNumbers();
          // console.log("response: " + state.sellers);
        })
        .catch(e => {
          console.log("errors: " + e);
        })
        ;
    },
    increase(state, sellerNo, productNo) {
      console.log(
        "seller: " +
        sellerNo +
        " ,product: " +
        productNo +
        " =>stock: "
      );
      state.sellers[sellerNo].products[productNo].stock++;
    },
  },
  getters: {

  },
  actions: {
  },
  modules: {
  }
})
