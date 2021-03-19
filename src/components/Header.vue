<template>
  <div class="row">
    <ul class="col-12">
      <router-link to="/cart" tag="li">
      <a><i class="fas fa-shopping-cart fa-lg text-white btn"></i></a>
      </router-link>
    </ul>
    <div
      id="breakRow"
      class="col-lg-6 col-12 d-flex flex-lg-column my-2 order-lg-0 order-1 justify-content-md-between justify-content-center"
    >
      <p id="breakRow1" class="dot order-lg-1 order-0 my-auto">
        <small>{{ checkAll }}</small>
      </p>
      <div id="breakRow2" class="d-flex flex-row order-lg-0 order-1">
        <div class="d-flex flex-row justify-content-center mx-2">
          <div
            class="timer mx-1 px-2 my-auto pb-1 text-white font-weight-light d-flex justify-content-center"
          >{{ hour }}</div>
          <p class="dot my-auto">:</p>
          <div
            class="timer mx-1 px-2 my-auto pb-1 text-white font-weight-light d-flex justify-content-center"
          >{{ minute }}</div>
          <p class="dot my-auto">:</p>
          <div
            class="timer mx-1 px-2 my-auto pb-1 text-white font-weight-light d-flex justify-content-center"
          >{{ second }}</div>
        </div>
        <div
          id="discountBox"
          class="bg-white d-flex flex-row py-1 px-2 my-auto justify-content-center"
        >
          <img @click="CopyText" class="mx-md-2 mr-1 my-auto" src="../assets/copy.svg" alt="کپی" />
          <small>
            <input
              id="discountCode"
              v-model="discountCode"
              class="text-primary mx-md-2 my-auto form-control-plaintext p-0"
              readonly
            />
          </small>
          <small>
            <p class="mx-md-2 ml-1 my-auto">{{ discountCodeTxt }}</p>
          </small>
        </div>
      </div>
    </div>
    <div class="col-lg-6 col-12 d-flex flex-column my-2 order-lg-1 order-0">
      <h3 class="text-white ml-auto text-right">{{ mainTxt }}</h3>
      <p id="lasOffer" class="text-white ml-auto">{{ lastOffer }}</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      mainTxt: "یک تخفیف هیجان انگیز! + ارسال رایگان",
      lastOffer: "(تا سقف 50 هزار تومان)",
      checkAll: "مشاهده همه",
      discountCodeTxt: ":کد تخفیف",
      discountCode: "dailyoff14",
      hour: "00",
      minute: "00",
      second: "00"
    };
  },
  methods: {
    timer() {
      const now = new Date().getTime();
      const finaleDate = new Date("February 15, 2021 12:00:00").getTime();

      let diff = finaleDate - now;
      if (diff <= 0) {
        this.hour = "00";
        this.minute = "00";
        this.second = "00";
      } else {
        this.hour = Math.floor(
          (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        this.minute = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        this.second = Math.floor((diff % (1000 * 60)) / 1000);
      }
    },
    RunTimer() {
      this.timer();
      setInterval(this.timer, 1000);
    },
    CopyText() {
      console.log("yesss");
      var copyTextarea = document.querySelector("#discountCode");
      copyTextarea.select();

      try {
        var successful = document.execCommand("copy");
        var msg = successful ? "successful" : "unsuccessful";
        console.log("Copying text command was " + msg);
      } catch (err) {
        console.log("Oops, unable to copy");
      }
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
      document.getElementById("lasOffer").innerHTML = document
        .getElementById("lasOffer")
        .innerHTML.replace(/\d(?=[^<>]*(<|$))/g, function($0) {
          return map[$0];
        });
    }
  },
  mounted() {
    this.RunTimer();
    this.getPersianNumbers();
    console.log("mounted");
  }
};
</script>
<style scoped>
#discountBox {
  border-radius: 25px;
  max-height: 3rem;
  min-width: 10rem;
}
.timer {
  background-color: black;
  border-radius: 8px;
  width: 2rem;
}
.dot {
  font-weight: bold;
}
input {
  width: 5rem;
}
@media (max-width: 340px) {
  #breakRow {
    flex-direction: column;
  }
  #breakRow1 {
    order: 2;
  }
  #breakRow2 {
    order: 1;
  }
}
</style>