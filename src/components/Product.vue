<template>
  <div class="">
    <div class="d-flex my-4 justify-content-end row px-5">
      <p id="sellerName" class="text-right">{{seller.name}}</p>
      <p id="az" class="ml-2">از</p>
    </div>
    <div class="d-flex row justify-content-end px-5 mx-md-5">
      <div class="text-right my-auto mx-5">
        <p id="sellerOwner" class="mb-2">{{seller.owner}}</p>
        <p id="sellerCity">از {{seller.city}}</p>
      </div>
      <img class="sellerPic rounded-circle col-2 p-0" :src="seller.logo.url" alt="عکس صاحب فروشگاه" />
    </div>
    <div
      class="py-3 border-bottom px-4"
      id="product"
      v-for="(product, l) of seller.products"
      :key="l"
    >
      <shop :product="product" :sellerNumber="sellerNumber" :productNumber="l" />
    </div>
    <div class="pb-2">
      <div class="row px-5 mb-3">
        <div id="deliveryMsg" class="my-3 col-12 p-2 text-right">{{deliveryMsg}}</div>
        <div id="discountCode" class="px-3 py-2">ثبت کد تخفیف غرفه</div>
      </div>
      <div class="d-flex justify-content-between pl-5 pr-3 pb-4">
        <div>
          <div id="totalTxt" class="row">جمع مبلغ برای {{seller.products.length}} کالا</div>
          <div class="row mt-1">
            <img class="toman" src="../assets/toman.svg" alt="تومان" />
            <div id="totalNumber" class="mx-1">{{totalPrice[sellerNumber]}}</div>
          </div>
        </div>
        <div id="continueShopping" class="my-auto px-3 py-2">ادامه خرید فقط از این غرفه</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Shop from "./Shop.vue";

export default {
  data() {
    return {
      deliveryMsg: ".هورا! ارسال از این غرفه برای شما رایگان شد"
    };
  },
  components: {
    shop: Shop
  },
  props: ["seller", "sellerNumber"],
  computed: {
    totalPrice() {
      return this.$store.state.totalPrice;
    }
  },
  mounted() {
    this.calTotalPrice(this.sellerNumber);
  },
  methods: {
    ...mapActions(["calTotalPrice"])
    // getPersianNumbers() {
    //   var map = [
    //     "&#1776;",
    //     "&#1777;",
    //     "&#1778;",
    //     "&#1779;",
    //     "&#1780;",
    //     "&#1781;",
    //     "&#1782;",
    //     "&#1783;",
    //     "&#1784;",
    //     "&#1785;"
    //   ];
    //   document.getElementById("cart").innerHTML = document
    //     .getElementById("cart")
    //     .innerHTML.replace(/\d(?=[^<>]*(<|$))/g, function($0) {
    //       return map[$0];
    //     });
    // }
  }
};
</script>

<style scoped>
.sellerPic {
  width: 2.5rem;
  height: 2.5rem;
  position: absolute;
}
#sellerName {
  font-size: 0.875rem;
  font-weight: bold;
}
#az {
  font-size: 0.875rem;
  font-weight: 400;
}
#sellerOwner {
  font-size: 0.75rem;
  font-weight: 400;
  color: #3e3e3e;
  /* position: absolute; */
}
#sellerCity {
  font-size: 0.625rem;
  font-weight: 400;
  color: #3e3e3e;
  /* position: absolute; */
}
.toman {
  width: 1rem;
  height: 1rem;
}
/* @media (max-width: 360px) {
  .toman {
    min-width: 1rem;
  }
  #product {
    font-size: 1.5rem;
  }
} */
/* @media (min-width: 450px) {
} */

#continueShopping {
  background-color: #df3856;
  color: #fafafa;
  border-radius: 100px;
  font-size: 0.75rem;
}
#deliveryMsg {
  background-color: #dff5f1;
  color: #00786c;
  font-size: 0.75rem;
}
#discountCode {
  border-radius: 100px;
  background-color: #eeeeee;
  color: #3e3e3e;
  font-size: 0.625rem;
  font-weight: bold;
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