<template>
  <div class="home">
    <slider></slider>
    <div id="under">
    <img alt="Vue logo" src="../assets/logo.png">
    <img alt="Vue logo" src="../assets/ox.png">
    <img alt="Vue logo" src="../assets/Wakeboarder.png">
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
}
</style>
