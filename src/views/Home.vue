<template>
  <div class="home">
    <slider></slider>
    <div id="under">
    <img class="main-img" alt="Vue logo" src="../assets/logo.png">
    <img class="main-img" alt="Vue logo" src="../assets/ox.png">
    <img class="main-img" alt="Vue logo" src="../assets/Wakeboarder.png">
    </div>
  </div>
</template>

<script>
import Slider from '../components/base/Slider';

export default {
    name: 'home',
    components: {
      Slider
    }
};
</script>

<style scoped>
#under {
  margin-top: 5px;
}
img {
  width: 10%;
  padding: 5px;
  vertical-align: top;
  opacity: 0.6;
}
.main-img:hover {
  opacity: 1;
  width: 12%;
}
</style>
