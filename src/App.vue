<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style>
#app {
  font-family: "EstedadRegular", Helvetica, Arial;
  font-size: 2rem;
  margin: 0px;
  height: 100%;
  width: 100%;
}

@font-face {
  font-family: "EstedadBold";
  src: local("EstedadBold"),
    url(./fonts/EstedadMaster/dist/Static/woff2/Estedad-Bold.woff2)
      format("woff2");
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: "EstedadRegular";
  src: local("EstedadRegular"),
    url(./fonts/EstedadMaster/dist/Static/woff2/Estedad-Regular.woff2)
      format("woff2");
  font-weight: normal;
  font-style: normal;
}
</style>
