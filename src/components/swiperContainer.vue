<template>
  <div class="swiper-container mt-3">
    <div id="swiper" class="swiper-wrapper">
      <div
        class="swiper-slide bg-white"
        v-for="(product, i) in productsInfo"
        :key="i"
      >
        <div class="" id="slide">
          <img
            class="slide_img col-12 p-0"
            :src="getImgUrl(product.img)"
            alt="Product Image"
          />
          <div class="p-2">
            <p class="name text-right my-1">
              {{ product.productName }}
            </p>
            <p class="text-right text-secondary my-2">
              {{ product.shopName }}
            </p>
            <div class="d-flex d-inline align-items-center my-0">
              <p class="discount text-white px-1">
                {{ product.discount }}
              </p>
              <strike class="text-secondary mx-1"
                ><p>{{ product.initialPrice }}</p></strike
              >
            </div>
            <div class="d-flex">
              <img class="toman" src="../assets/toman.svg" alt="تومان" />
              <p class="price mx-1 my-auto">
                {{ product.finalPrice }}
              </p>
            </div>
          </div>
        </div>

        <div
          v-if="!product.available"
          id="finished"
          class="swiper-slide d-flex justify-content-center align-content-center"
        >
          <div
            class="finishedTxt text-center text-danger bg-white px-3 py-1 mb-5"
          >
            تمام شد
          </div>
        </div>
      </div>
    </div>
    <!-- Add Arrows -->
    <!-- <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div> -->
    <!-- Add Pagination -->
    <!-- <div class="swiper-pagination"></div> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      swiper: null,
      productsInfo: [
        {
          img: "product-1.jpg",
          productName: "(کروسان)نان مغزدار شکلاتی",
          shopName: "غرفه: خانه کیک آینار",
          discount: "20%",
          initialPrice: "48,000",
          finalPrice: "36,000",
          available: true,
        },
        {
          img: "product-2.jpg",
          productName: "باقلوا اعلا و درجه 1 یزدی",
          shopName: "غرفه: شیرینی حاج شهرام یزد",
          discount: "27%",
          initialPrice: "54,000",
          finalPrice: "39,500",
          available: false,
        },
        {
          img: "product-3.jpg",
          productName: "توت خشک ارگانیک و محلی 1کیلو",
          shopName: "غرفه: ادویه و خشکبار نازگل",
          discount: "16%",
          initialPrice: "58,000",
          finalPrice: "48,500",
          available: true,
        },
        {
          img: "product-4.jpg",
          productName: "رومیزی ترمه بختیاری",
          shopName: "غرفه: ترمه النا یزد",
          discount: "34%",
          initialPrice: "70,000",
          finalPrice: "46,000",
          available: false,
        },
        {
          img: "product-5.jpg",
          productName: "زیتون درجه 1 فدک",
          shopName: "غرفه: مزرعه زیتون فدک",
          discount: "6%",
          initialPrice: 18000,
          finalPrice: 17000,
          available: true,
        },
        {
          img: "product-6.jpg",
          productName: "زعفران نگین 1 مثقالی",
          shopName: "غرفه: محصولات روستایی سبزرود",
          discount: "34%",
          initialPrice: 65000,
          finalPrice: 43000,
          available: true,
        },
        {
          img: "product-1.jpg",
          productName: "(کروسان)نان مغزدار شکلاتی",
          shopName: "غرفه: خانه کیک آینار",
          discount: "20%",
          initialPrice: "48,000",
          finalPrice: "36,000",
          available: true,
        },
        {
          img: "product-2.jpg",
          productName: "باقلوا اعلا و درجه 1 یزدی",
          shopName: "غرفه: شیرینی حاج شهرام یزد",
          discount: "27%",
          initialPrice: "54,000",
          finalPrice: "39,500",
          available: false,
        },
        {
          img: "product-3.jpg",
          productName: "توت خشک ارگانیک و محلی 1کیلو",
          shopName: "غرفه: ادویه و خشکبار نازگل",
          discount: "16%",
          initialPrice: "58,000",
          finalPrice: "48,500",
          available: true,
        },
        {
          img: "product-4.jpg",
          productName: "رومیزی ترمه بختیاری",
          shopName: "غرفه: ترمه النا یزد",
          discount: "34%",
          initialPrice: "70,000",
          finalPrice: "46,000",
          available: false,
        },
        {
          img: "product-5.jpg",
          productName: "زیتون درجه 1 فدک",
          shopName: "غرفه: مزرعه زیتون فدک",
          discount: "6%",
          initialPrice: 18000,
          finalPrice: 17000,
          available: true,
        },
        {
          img: "product-6.jpg",
          productName: "زعفران نگین 1 مثقالی",
          shopName: "غرفه: محصولات روستایی سبزرود",
          discount: "34%",
          initialPrice: 65000,
          finalPrice: 43000,
          available: true,
        },
      ],
    };
  },
  methods: {
    getImgUrl(pic) {
      return require("../assets/" + pic);
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
        "&#1785;",
      ];
      document.getElementById("swiper").innerHTML = document
        .getElementById("swiper")
        .innerHTML.replace(/\d(?=[^<>]*(<|$))/g, function ($0) {
          return map[$0];
        });
    },
  },
  mounted() {
    this.swiper = new window.Swiper(".swiper-container", {
      cssMode: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
      },
      mousewheel: true,
      keyboard: true,
      slidesPerView: 6,
      spaceBetween: 10,
      // Responsive breakpoints
      breakpoints: {
        // when window width is >= 320px
        // 320: {
        //   slidesPerView: 2,
        //   spaceBetween: 20
        // },
        // when window width is >= 480px
        480: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        // when window width is >= 640px
        640: {
          slidesPerView: 4,
          spaceBetween: 10,
        },
        1000: {
          slidesPerView: 6,
          spaceBetween: 10,
        },
      },
    });
    this.getPersianNumbers();
  },
};
</script>
<style scoped>
.swiper-slide {
  text-align: center;
  font-size: 8px;
  background: #fff;
  border-radius: 10px;
  -ms-flex-pack: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  /* max-width: 15rem; */
}

.slide_img {
  border-radius: 10px 10px 0px 0px;
  /* max-height: 15rem;
  max-width: 15rem; */
}
.discount {
  font-size: 10px;
  background-color: rgb(209, 61, 86);
  border-radius: 10px;
}
.price,
.name {
  font-size: 10px;
  font-weight: bold;
}
.toman {
  max-width: 0.8rem;
}
#finished {
  z-index: 10;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0.8;
  background-color: gray;
}
#swiper {
  position: relative;
  /* z-index: 1; */
}
.finishedTxt {
  border-radius: 10px;
  /* background-color: rgb(255, 255, 255); */
  font-size: 10px;
}
</style>