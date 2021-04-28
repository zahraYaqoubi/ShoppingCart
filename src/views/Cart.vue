<template>
  <div id="bg" class="d-flex justify-content-center">
    <div class="bg-white col col-md-6 px-0">
      <ul class="col-12 p-0" v-if="sellers.length>0">
        <div id="cart" class="pt-1" v-for="(seller, i) of sellers" :key="i">
          <vendor :seller="seller" :sellerNumber="i"></vendor>
        </div>
        <div id="emptyDistance" class></div>
        <div class="bg-white fixed-bottom p-3">
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
      <div id="cartEmpty" v-else>
        <p>!!محصولی برای نمایش موجود نمی باشد</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Vendor from "../components/Vendor.vue";

export default {
  data() {},
  components: {
    vendor: Vendor
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
  height: 100%;
}
#cart{
  border-bottom: rgb(218, 218, 218) 2px;
}
.toman {
  width: 1.6rem;
  height: 1.2rem;
  }
#emptyDistance {
  height: 10rem;
  background-color: #eeeeee;
  
}
#continueShopping {
  background-color: #df3856;
  color: #fafafa;
  border-radius: 100px;
  font-size: 1.6rem;
}
#totalTxt,
#totalNumber {
  font-size: 1.2rem;
  color: #535353;
}
#totalNumber {
  font-family: "EstedadBold", Helvetica, Arial;
}
#cartEmpty{
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (min-width: 600px) {
.toman {
  width: 1rem;
  height: 0.75rem;
  }
#continueShopping {
  font-size: 1rem;
}
#totalTxt,
#totalNumber {
  font-size: 0.75rem;
}
}
</style>