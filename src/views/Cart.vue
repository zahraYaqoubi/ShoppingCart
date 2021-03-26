<template>
  <div id="bg" class="d-flex justify-content-center">
    <div class="bg-white">
      <ul class="col-12 p-0" v-if="sellers">
        <div id="cart" class="pt-1" v-for="(seller, i) of sellers" :key="i">
          <product :seller="seller" :sellerNumber="i"></product>
        </div>
        <div id="emptyDistance" class></div>
        <div class="bg-white pt-3">
          <div class="d-flex justify-content-between pl-5 pr-3">
            <div>
              <div id="totalTxt" class="row">مبلغ قابل پرداخت {{sellers.length}} غرفه</div>
              <div class="row mt-1">
                <img class="toman" src="../assets/toman.svg" alt="تومان" />
                <div id="totalNumber" class="mx-1">{{calFinalPrice}}</div>
              </div>
            </div>
            <router-link
              id="continueShopping"
              class="btn d-flex justify-content-center my-auto px-3 py-2"
              to="/selectAddress"
            >
              <div>ادامه خرید از {{ sellers.length }} غرفه</div>
            </router-link>
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
import Product from "../components/Product.vue";

export default {
  data() {},
  components: {
    product: Product
  },
  mounted() {
    this.getApi();
  },
  computed: {
    ...mapGetters(["calFinalPrice"]),
    sellers() {
      return this.$store.state.sellers;
    }

  },
  methods: {
    ...mapActions(["getApi"]),

    getPersianNumbers() {
      var map = [
        "&#1776;",
        "&#1777;",
        "&#1778;",
        "&#1779;",
        "&#1780;",
        "&#1781;",
        "&#1782;",
        "&#1783;",
        "&#1784;",
        "&#1785;"
      ];
      document.getElementById("cart").innerHTML = document
        .getElementById("cart")
        .innerHTML.replace(/\d(?=[^<>]*(<|$))/g, function($0) {
          return map[$0];
        });
    }
  }
};
</script>

<style scoped>
#bg {
  background-color: rgb(218, 218, 218);
}
.toman {
  width: 1rem;
  height: 1rem;
  }
/* @media (max-width: 360px) {
  .toman {
    min-width: 1rem;
  }
} */
#emptyDistance {
  height: 10rem;
  background-color: #eeeeee;
}
#continueShopping {
  background-color: #df3856;
  color: #fafafa;
  border-radius: 100px;
  font-size: 1rem;
}
#totalTxt,
#totalNumber {
  font-size: 0.75rem;
  color: #535353;
}
#totalNumber {
  font-weight: 700;
}
</style>