<template>
  <div>
    <div class="d-flex justify-content-between">
      <div class="col-md-9 justify-content-between pl-0">
        <p id="productName" class="mt-2 text-right">{{product.name}}</p>
        <div id="prices" class="d-flex align-items-end">
          <img class="toman my-3" src="../assets/toman.svg" alt="تومان" />
          <p class="mx-2">{{price[sellerNumber][productNumber]}}</p>
          <strike id="primaryPrice">
            <p>{{primaryPrice[sellerNumber][productNumber]}}</p>
          </strike>
        </div>
      </div>
      <img id="productPic" class="col-md-3 p-0" :src="product.image.url" alt="عکس محصول" />
    </div>
    <div class="mt-2 d-flex justify-content-between">
      <div id="saveText" class="border-bottom my-auto mb-4">ذخیره در لیست خرید بعدی</div>
      <div class="d-flex justify-content-end">
        <i
          @click="remove({sellerNo: sellerNumber, productNo: productNumber})"
          class="btn numberOptions fa-xs far fa-trash-alt rounded-circle m-2 p-2 d-flex justify-content-center align-items-center"
        ></i>
        <div class="d-flex justify-content-end">
          <i
            @click="increase({sellerNo: sellerNumber, productNo: productNumber})"
            class="btn numberOptions fa-xs fas fa-plus rounded-circle m-2 p-2 d-flex justify-content-center align-items-center"
          ></i>
          <div
            id="productCount"
            class="my-2 d-flex justify-content-center align-items-center"
          >{{numberOfProducts[sellerNumber][productNumber]}}</div>
          <i
            @click="decrease({sellerNo: sellerNumber, productNo: productNumber})"
            class="btn numberOptions fa-xs far fa-window-minimize rounded-circle m-2 p-2 d-flex justify-content-center align-items-end"
          ></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: ["product", "sellerNumber", "productNumber"],
  computed: {
    sellers() {
      return this.$store.state.sellers;
    },
    numberOfProducts() {
      return this.$store.state.numberOfProducts;
    },
    price() {
      return this.$store.state.price;
    },
    primaryPrice() {
      return this.$store.state.primaryPrice;
    }
  },

  methods: {
    ...mapActions(["increase", "decrease", "remove", "calTotalPrice"])
  }
};
</script>
<style scoped>
#productPic {
  width: 5.125rem;
  height: 5.125rem;
  border-radius: 0.5rem;
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
#productName {
  font-size: 0.75rem;
  color: #3e3e3e;
}
/* @media (min-width: 450px) {
  #productName {
    font-size: 0.75rem;
  }
} */
#saveText {
  font-size: 0.625rem;
  font-weight: bold;
  display: flex;
  color: #7d7d7d;
}
#prices {
  position: absolute;
  font-size: 0.75rem;
  bottom: 0;
}
#primaryPrice {
  color: #9d9d9d;
}
.numberOptions {
  width: 1.5rem;
  height: 1.5rem;
  background-color: #eeeeee;
}
#productCount {
  width: 1.6rem;
  height: 1.46rem;
  border-radius: 0.375rem;
  border: 1px solid #eeeeee;
  font-size: 0.875rem;
}
/* .stockBox {
  min-width: 10rem;
  max-width: 20rem;
} */
</style>