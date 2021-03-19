<template>
  <div id="bg" class="d-flex justify-content-center">
    <div class="p-md-5">
      <ul class="col-12" v-if="sellers && sellers.length">
        <div id="cart" class="bg-light pt-3" v-for="(seller, i) of sellers" :key="i">
          <div class="d-flex my-5 justify-content-end row px-5">
            <p class="sellerName text-right">{{seller.name}}</p>
            <p class="my-auto ml-2 pr-5">از</p>
          </div>
          <div class="d-flex row my-5 justify-content-end pb-5 px-5 mx-md-5">
            <div class="text-right text-secondary my-auto mx-4">
              <p>{{seller.owner}}</p>
              <p>از {{seller.city}}</p>
            </div>
            <img
              class="sellerPic rounded-circle col-2 p-0"
              :src="seller.logo.url"
              alt="عکس صاحب فروشگاه"
            />
          </div>
          <div
            class="my-5 py-2 border-bottom px-5"
            id="product"
            v-for="(product, l) of seller.products"
            :key="l"
          >
            <div class="d-flex justify-content-around">
              <div class="col-md-9 col-8">
                <p class="productName text-secondary mt-2 text-right">{{product.name}}</p>
                <div id="prices" class="d-flex align-items-end">
                  <img class="toman my-4 mx-2" src="../assets/toman.svg" alt="تومان" />
                  <p class="mx-2">{{product.price}}</p>
                  <strike class="text-secondary">
                    <p class="mx-2">{{product.primaryPrice}}</p>
                  </strike>
                </div>
              </div>
              <img class="productPic col-md-3 col-4 p-0" :src="product.image.url" alt="عکس محصول" />
            </div>
            <div class="row my-5 d-flex justify-content-between">
              <div class="d-flex col-md-9 justify-content-between order-2 order-md-1">
                <div class="border-bottom text-secondary mt-auto mb-4">ذخیره در لیست خرید بعدی</div>
                <i
                  @click="remove(i,l)"
                  class="btn numberOptions far fa-trash-alt fa-lg rounded-circle m-2 p-2 d-flex justify-content-center align-items-center"
                ></i>
              </div>
              <div class="stockBox d-flex col-md-3 justify-content-end order-1 order-md-2">
                <i
                  @click="increase(i,l)"
                  class="btn numberOptions fas fa-plus fa-lg rounded-circle m-2 p-2 d-flex justify-content-center align-items-center"
                ></i>
                <div
                  class="stock text-secondary h3 border bg-light m-2 p-2 d-flex justify-content-center align-items-center"
                >{{product.stock}}</div>
                <i
                  @click="decrease(i,l)"
                  class="btn numberOptions far fa-window-minimize fa-lg rounded-circle m-2 p-2 d-flex justify-content-center"
                ></i>
              </div>
            </div>
          </div>
          <div class="px-5 pb-4">
            <div class="row mb-5">
              <div id="deliveryMsg" class="mb-4 col-12 p-3 text-right">{{deliveryMsg}}</div>
              <div id="discountCode" class="px-5 py-3 m-4">ثبت کد تخفیف غرفه</div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="row">جمع مبلغ برای {{seller.products.length}} کالا</div>
                <div class="row">
                  <img class="toman my-3 mx-2" src="../assets/toman.svg" alt="تومان" />
                  <div class="my-auto">{{calTotalPrice(seller.products)}}</div>
                </div>
              </div>
              <div
                class="continueShopping col-md-6 text-white bg-danger d-flex justify-content-center m-auto p-4"
              >ادامه خرید فقط از این غرفه</div>
            </div>
          </div>
        </div>
        <div id="emptyDistance" class></div>
        <div class="p-5 bg-light">
          <div class="row">
            <div class="col-md-6">
              <div class="row">مبلغ قابل پرداخت {{sellers.length}} غرفه</div>
              <div class="row">
                <img class="toman my-3 mx-2" src="../assets/toman.svg" alt="تومان" />
                <div class="my-auto">{{calFinalPrice()}}</div>
              </div>
            </div>
            <router-link
              class="continueShopping btn-xl col-md-6 text-white bg-danger d-flex justify-content-center m-auto p-4"
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
      // console.log("sellers: " + this.$store.state.sellers);
      return this.$store.state.sellers;
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
  min-height: 20rem;
  background-color: rgb(231, 238, 241);
}
</style>