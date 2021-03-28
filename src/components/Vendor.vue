<template>
  <div>
    <div class="d-flex my-4 justify-content-end row px-5">
      <p id="sellerName" class="text-right">{{seller.name}}</p>
      <p id="az" class="ml-2">از</p>
    </div>
    <div class="d-flex row justify-content-end px-5 mx-md-5">
      <div class="text-right my-auto mx-2">
        <p id="sellerOwner" class="mb-2">{{seller.owner}}</p>
        <div id="sellerCity" class="d-flex justify-content-end">
          <p class="mx-1">از {{seller.city}}</p>
          <img id="locationIcon" src="../assets/location.png" alt="location" />
        </div>
      </div>
      <img class="sellerPic rounded-circle p-0" :src="seller.logo.url" alt="عکس صاحب فروشگاه" />
    </div>
    <div
      class="py-3 border-bottom px-4"
      id="product"
      v-for="(product, l) of seller.products"
      :key="l"
    >
      <product :product="product" :sellerNumber="sellerNumber" :productNumber="l" />
    </div>
    <div class="pb-2">
      <div class="row px-5 mb-3">
        <div id="deliveryMsg" class="my-3 col-12 p-2 text-right">{{deliveryMsg}}</div>
        <div id="discountCode" class="d-flex px-3 py-2">
          <p class="my-0">ثبت کد تخفیف غرفه</p>
          <img class="my-auto ml-1" id="discountIcon" src="../assets/discount.png" alt="discount" />
        </div>
      </div>
      <div class="d-flex justify-content-between pl-5 pr-3 pb-4">
        <div>
          <div id="totalTxt" class="row">جمع مبلغ برای {{seller.products.length}} کالا</div>
          <div class="row mt-1">
            <img class="toman" src="../assets/toman.svg" alt="تومان" />
            <!-- <div id="totalNumber" class="mx-1">{{totalPrice[sellerNumber]}}</div> -->
            <div id="totalNumber" class="mx-1">{{sellers[sellerNumber].totalPrice}}</div>
          </div>
        </div>
        <div id="continueShopping" class="my-auto px-3 py-2">ادامه خرید فقط از این غرفه</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Product from "./Product.vue";

export default {
  data() {
    return {
      deliveryMsg: ".هورا! ارسال از این غرفه برای شما رایگان شد"
    };
  },
  components: {
    product: Product
  },
  props: ["seller", "sellerNumber"],
  computed: {
    // totalPrice() {
    //   return this.$store.state.totalPrice;
    // },
    sellers() {
      return this.$store.state.sellers;
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
  width: 4rem;
  height: 4rem;
}
#sellerName {
  font-size: 1.4rem;
  font-weight: bold;
}
#locationIcon {
  width: 1.07rem;
  height: 1.33rem;
}
#az {
  font-size: 1.4rem;
  font-weight: 400;
}
#sellerOwner {
  font-size: 1.2rem;
  font-weight: 400;
  color: #3e3e3e;
}
#sellerCity {
  font-size: 1rem;
  font-weight: 400;
  color: #3e3e3e;
}
.toman {
  width: 1.6rem;
  height: 1.2rem;
}
#continueShopping {
  background-color: #df3856;
  color: #fafafa;
  border-radius: 100px;
  font-size: 1.2rem;
}
#deliveryMsg {
  background-color: #dff5f1;
  color: #00786c;
  font-size: 1.2rem;
}
#discountCode {
  border-radius: 100px;
  background-color: #eeeeee;
  color: #3e3e3e;
  font-size: 1rem;
  font-weight: bold;
}
#discountIcon{
  width: 1.5rem;
  height: 1.05rem;
}
#totalTxt,
#totalNumber {
  font-size: 1.2rem;
  color: #535353;
}
#totalNumber {
  font-weight: 700;
}

@media (min-width: 600px) {
  .sellerPic {
  width: 2.5rem;
  height: 2.5rem;
}
#sellerName, #az {
  font-size: 0.875rem;
}
#locationIcon {
  width: 0.66rem;
  height: 0.83rem;
}
#sellerCity {
  font-size: 0.625rem;
}
.toman {
  width: 1rem;
  height: 0.75rem;
}
#sellerOwner, #continueShopping, #deliveryMsg, #totalTxt, #totalNumber {
  font-size: 0.75rem;
}
#discountCode {
  font-size: 0.625rem;
}
#discountIcon{
  width: 0.9375rem;
  height: 0.656rem;
}

}
</style>