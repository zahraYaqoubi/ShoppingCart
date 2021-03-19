<template>
  <div id="bg" class="d-flex justify-content-center align-content-center">
    <div class="p-md-5 col-md-4">
      <ul class v-if="addresses">
        <div
          id="cart"
          class="bg-light p-5 d-flex flex-column"
          v-for="(address, i) of addresses"
          :key="i"
        >
          <div class="d-flex justify-content-between">
            <div id="newAddress" class="d-flex border m-2 p-2">
              آدرس جدید
              <i
                @click="increase(i,l)"
                class="btn fas fa-plus d-flex justify-content-center align-items-center"
              ></i>
            </div>
            <router-link class to="/cart" tag>
              <i
                class="btn numberOptions rounded-circle m-2 p-2 d-flex justify-content-center align-items-center fas fa-arrow-right"
              ></i>
            </router-link>
          </div>
          <div class="d-flex justify-content-between">
            <!-- <i
              @click="decrease(i,l)"
              class="btn numberOptions far fa-window-minimize fa-lg rounded-circle m-2 p-2 d-flex justify-content-center"
            ></i>-->
            <i
              class="btn numberOptions rounded-circle m-2 p-2 d-flex justify-content-center align-items-center far fa-edit"
            ></i>
            <p class="productName text-secondary mt-2 text-right">به: {{ address.name }}</p>
          </div>
          <div class="form-check d-flex justify-content-end">
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
            />
            <label
              class="form-check-label text-right mx-5"
              for="flexRadioDefault1"
            >{{address.addressInfo}}</label>
          </div>
          <!-- <div class="custom-control custom-radio">
            <input type="radio" id="customRadio1" name="customRadio" class="custom-control-input" />
            <label class="custom-control-label text-left" for="customRadio1">{{address.addressInfo}}</label>
          </div> -->
        </div>
        <div id="emptyDistance" class="bg-light"></div>
        <div class="p-5 bg-light">
          <div class="row">
            <div class="col-md-6">
              <div class="row">مبلغ قابل پرداخت</div>
              <div class="row">
                <img class="toman my-3 mx-2" src="../assets/toman.svg" alt="تومان" />
                <div class="my-auto">{{finalPrice}}</div>
              </div>
            </div>
            <router-link
              class="continueShopping btn col-md-6 text-white bg-danger d-flex justify-content-center m-auto p-4"
              to="/payment"
            >
              <div>ادامه فرآیند خرید</div>
            </router-link>
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    addresses() {
      // console.log("sellers: " + this.$store.state.sellers);
      return this.$store.state.addresses;
    },
    finalPrice() {
      return this.$store.state.finalPrice;
    }
  },
  methods: {
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
  height: 100%;
}
#prices {
  position: absolute;
  bottom: 0;
}
#emptyDistance {
  min-height: 20rem;
  /* background-color: rgb(231, 238, 241); */
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
#flexRadioDefault1 {
  min-width: 2rem;
  min-height: 2rem;
}
#newAddress {
  border-radius: 35px;
}
.custom-control-input:checked ~ .custom-control-label::before {
  /* color: rgb(170, 87, 87); */
  background-color: #7b1fa2;
}
</style>