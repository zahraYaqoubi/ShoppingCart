<template>
  <div class="home py-4">
    <my-header></my-header>
    <slide-show></slide-show>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import SlideShow from "../components/swiperContainer.vue";

export default {
  name: "Hello",
  data() {
    return {};
  },
  components: {
    "my-header": Header,
    "slide-show": SlideShow
  },
};
</script>

<style scoped>
.home {
  padding-right: 10px;
  padding-left: 10px;
  margin: 0px;
  background-image: url("../assets/background.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}
@media (min-width: 1090px) {
  .home {
    padding-right: 70px;
    padding-left: 70px;
  }
}
</style>>
