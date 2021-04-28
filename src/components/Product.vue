<template>
  <div>
    <div class="d-flex justify-content-between">
      <div class="col-md-9 justify-content-between pl-0">
        <p id="productName" class="mt-2 text-right">{{product.name}}</p>
        <div id="prices" class="d-flex align-items-end">
          <img class="toman my-3" src="../assets/toman.svg" alt="تومان" />
          <p class="mx-2">{{sellers[sellerNumber].products[productNumber].pricePerNumber}}</p>
          <strike id="primaryPrice">
            <p>{{sellers[sellerNumber].products[productNumber].primaryPricePerNumber}}</p>
          </strike>
        </div>
      </div>
      <img id="productPic" class="p-0" :src="product.image.url" alt="عکس محصول" />
    </div>
    <div class="mt-2 d-flex justify-content-between">
      <div id="saveText" class="border-bottom my-auto mb-4">ذخیره در لیست خرید بعدی</div>
      <div class="d-flex justify-content-end">
        <img
          @click="remove({sellerNo: sellerNumber, productNo: productNumber})"
          class="btn numberOptions rounded-circle m-2 p-1"
          src="../assets/trash.png"
          alt="remove"
        />
        <!-- <i
          @click="remove({sellerNo: sellerNumber, productNo: productNumber})"
          class="btn numberOptions fa-xs far fa-trash-alt rounded-circle m-2 p-2 d-flex justify-content-center align-items-center"
        ></i>-->
        <div class="d-flex justify-content-end">
          <div class="d-flex numberOptions rounded-circle btn m-2 p-1">
            <img
              @click="increase({sellerNo: sellerNumber, productNo: productNumber})"
              class="p-1 p-sm-0"
              src="../assets/plus.png"
              alt="increase"
            />
          </div>

          <!-- <i
            @click="increase({sellerNo: sellerNumber, productNo: productNumber})"
            class="btn numberOptions fa-xs fas fa-plus rounded-circle m-2 p-2 d-flex justify-content-center align-items-center"
          ></i>-->
          <div
            id="productCount"
            class="my-2 d-flex justify-content-center align-items-center"
          >{{sellers[sellerNumber].products[productNumber].numberOfProducts}}</div>
          <div
            @click="decrease({sellerNo: sellerNumber, productNo: productNumber})"
            class="btn numberOptions rounded-circle m-2 p-1"
          >
            <img src="../assets/minus.png" alt="decrease" />
          </div>

          <!-- <i
            @click="decrease({sellerNo: sellerNumber, productNo: productNumber})"
            class="btn numberOptions fa-xs far fa-window-minimize rounded-circle m-2 p-2 d-flex justify-content-center align-items-end"
          ></i> -->
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
    }
  },

  methods: {
    ...mapActions(["increase", "decrease", "remove", "calTotalPrice"])
  }
};
</script>
<style scoped>
#productPic {
  width: 8.2rem;
  height: 8.2rem;
  border-radius: 0.8rem;
}
.toman {
  width: 1.6rem;
  height: 1.2rem;
}
#productName {
  font-size: 1.2rem;
  color: #3e3e3e;
}
#saveText {
  font-size: 1rem;
  font-family: "EstedadBold", Helvetica, Arial;
  display: flex;
  color: #7d7d7d;
}
#prices {
  position: absolute;
  font-size: 1.2rem;
  bottom: 0;
}
#primaryPrice {
  color: #9d9d9d;
}
.numberOptions {
  width: 2.4rem;
  height: 2.4rem;
  background-color: #eeeeee;
  /* display: flex;
  justify-content: center;
  align-content: center; */
}
#productCount {
  width: 2.58rem;
  height: 2.33rem;
  border-radius: 0.375rem;
  border: 1px solid #eeeeee;
  font-size: 1.4rem;
}

@media (min-width: 600px) {
  #productPic {
    width: 5.125rem;
    height: 5.125rem;
    border-radius: 0.5rem;
  }
  .toman {
    width: 1rem;
    height: 0.75rem;
  }
  #productName,
  #prices {
    font-size: 0.75rem;
  }
  #saveText {
    font-size: 0.625rem;
  }
  .numberOptions {
    width: 1.5rem;
    height: 1.5rem;
  }
  #productCount {
    width: 1.61rem;
    height: 1.46rem;
    font-size: 0.875rem;
  }
}
</style>