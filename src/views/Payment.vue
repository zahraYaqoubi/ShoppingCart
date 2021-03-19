<template>
  <div id="bg" class="d-flex justify-content-center">
    <div class="p-md-5">
      <div id="cart" class="bg-light pt-3">
        <p class="text-right">انتخاب درگاه پرداخت</p>
        <div
          class="form-check form-check-inline d-flex justify-content-end"
          v-for="(gate, j) of paymentGate"
          :key="j"
        >
          <input
            class="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault1"
          />
          <label class="form-check-label text-right mx-5" for="flexRadioDefault1">{{gate}}</label>
        </div>
      </div>
      <ul class="col-12" v-if="sellers && sellers.length">      
        <div id="cart" class="bg-light pt-3" v-for="(seller, i) of sellers" :key="i">
          <p class="text-right px-5" v-if="i==0">خلاصه سفارش</p>
          <div class="d-flex justify-content-end row px-5">
            <p class="sellerName text-right">{{seller.name}}</p>
            <p class="my-auto ml-2 pr-5">از</p>
          </div>
          <div
            class="py-5 border-bottom px-5"
            id="product"
            v-for="(product, l) of seller.products"
            :key="l"
          >
            <div class="d-flex justify-content-around">
              <div class="col-md-9 col-8">
                <p class="productName text-secondary mt-2 text-right">{{product.name}}</p>
                <div class="d-flex justify-content-between">
                  <strike class="text-secondary">
                    <p class="mx-2">{{product.primaryPrice}}</p>
                  </strike>
                  <div class="d-flex">
                    <p class="mx-2">عدد</p>
                    {{ product.stock }}
                  </div>
                </div>
                <div id="prices" class="d-flex align-items-end">
                  <img class="toman my-4 mx-2" src="../assets/toman.svg" alt="تومان" />
                  <p class="mx-2">{{product.price}}</p>
                </div>
              </div>
              <img class="productPic col-md-3 col-4 p-0" :src="product.image.url" alt="عکس محصول" />
            </div>
          </div>
        </div>
        <div id="emptyDistance" class></div>
        <div class="p-5 bg-light">
          <router-link
            class="continueShopping btn-xl text-white bg-danger d-flex justify-content-center m-auto p-4"
            to="/selectAddress"
          >
            <div>پرداخت</div>
          </router-link>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
// import { mapGetters } from "vuex";

export default {
  data() {
    return {
      deliveryMsg: ".هورا! ارسال از این غرفه برای شما رایگان شد"
    };
  },
  // Fetches posts when the component is created.
  mounted() {
    this.getApi();
  },
  computed: {
    // ...mapGetters([
    // ]),
    sellers() {
      return this.$store.state.sellers;
    },
    paymentGate() {
      return this.$store.state.paymentGate;
    }
  },
  methods: {
    ...mapMutations([
      "getApi"
      // 'increase'
    ]),
    calFinalPrice() {
      var finalPrice = 0;
      // console.log("0 0: " + this.sellers[0].products[0].price);
      for (var i = 0; i < this.sellers.length; i++) {
        // console.log("number of products: " + this.sellers[i].products.length);
        for (var j = 0; j < this.sellers[i].products.length; j++) {
          finalPrice += this.sellers[i].products[j].price;
          // console.log(
          //   i + " , " + j + " : " + this.sellers[i].products[j].price
          // );
          // console.log("finalPrice " + finalPrice);
        }
      }
      // console.log("finalPrice: " + finalPrice);
      this.$store.state.finalPrice = finalPrice;
      return finalPrice;
    },
    calTotalPrice(products) {
      var totalPrice = 0;
      for (var i = 0; i < products.length; i++) {
        totalPrice += products[i].price;
      }
      return totalPrice;
    },
    increase(sellerNo, productNo) {
      var stock = this.$store.state.sellers[sellerNo].products[productNo].stock;
      console.log(
        "seller: " + sellerNo + " ,product: " + productNo + " =>stock: " + stock
      );
      var price = this.$store.state.sellers[sellerNo].products[productNo].price;
      var primaryPrice = this.$store.state.sellers[sellerNo].products[productNo]
        .primaryPrice;
      var pricePerProduct = price / stock;
      var primaryPricePerProduct = primaryPrice / stock;
      console.log(
        "pricePerProduct: " +
          pricePerProduct +
          " ,primaryPricePerProduct: " +
          primaryPricePerProduct
      );
      this.$store.state.sellers[sellerNo].products[productNo].price =
        price + pricePerProduct;
      this.$store.state.sellers[sellerNo].products[productNo].primaryPrice =
        primaryPrice + primaryPricePerProduct;
      console.log(
        "priceProduct: " +
          (this.$store.state.sellers[sellerNo].products[productNo].price +
            pricePerProduct) +
          " ,primaryPriceProduct: " +
          (this.$store.state.sellers[sellerNo].products[productNo]
            .primaryPrice +
            primaryPricePerProduct)
      );
      this.$store.state.sellers[sellerNo].products[productNo].stock++;
    },

    decrease(sellerNo, productNo) {
      var stock = this.$store.state.sellers[sellerNo].products[productNo].stock;
      console.log(
        "seller: " + sellerNo + " ,product: " + productNo + " =>stock: " + stock
      );
      if (stock > 1) {
        var price = this.$store.state.sellers[sellerNo].products[productNo]
          .price;
        var primaryPrice = this.$store.state.sellers[sellerNo].products[
          productNo
        ].primaryPrice;
        var pricePerProduct = price / stock;
        var primaryPricePerProduct = primaryPrice / stock;
        console.log(
          "pricePerProduct: " +
            pricePerProduct +
            " ,primaryPricePerProduct: " +
            primaryPricePerProduct
        );
        this.$store.state.sellers[sellerNo].products[productNo].price =
          price - pricePerProduct;
        this.$store.state.sellers[sellerNo].products[productNo].primaryPrice =
          primaryPrice - primaryPricePerProduct;

        this.$store.state.sellers[sellerNo].products[productNo].stock--;
      }
    },
    remove(sellerNo, productNo) {
      this.$store.state.sellers[sellerNo].products.splice(productNo, 1);
      if (this.$store.state.sellers[sellerNo].products.length == 0)
        this.$store.state.sellers.splice(sellerNo, 1);
    },
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
.sellerPic {
  min-width: 8rem;
  min-height: 8rem;
  max-width: 12rem;
  max-height: 12rem;
}
.sellerName {
  /* font-weight: bold; */
  font-size: 3rem;
}
.productPic {
  min-width: 10rem;
  min-height: 10rem;
  max-width: 20rem;
  max-height: 20rem;
  border-radius: 25px;
}
.toman {
  min-width: 3rem;
}
@media (max-width: 360px) {
  .toman {
    min-width: 1rem;
  }
  #product {
    font-size: 1.5rem;
  }
}
@media (min-width: 450px) {
  .productName {
    font-size: larger;
  }
}

.numberOptions {
  width: 5rem;
  height: 5rem;
  background-color: rgb(231, 238, 241);
}
.stock {
  width: 5rem;
  height: 5rem;
  border-radius: 10px;
}
.stockBox {
  min-width: 10rem;
  max-width: 20rem;
}
.continueShopping {
  border-radius: 30px;
}
#bg {
  background-color: rgb(218, 218, 218);
}
#prices {
  position: absolute;
  bottom: 0;
}
#deliveryMsg {
  background-color: rgb(210, 243, 241);
  color: rgb(19, 136, 19);
}
#discountCode {
  border-radius: 30px;
  background-color: rgb(231, 238, 241);
}
#emptyDistance {
  min-height: 7rem;
  background-color: rgb(231, 238, 241);
}
</style>