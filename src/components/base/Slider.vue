<template>
    <div>
        <slider animation="fade">
            <slider-item v-for="(i, index) in list" :key="index">
                <img v-if="i === 0" src="../../assets/logo.png"/>
                <img v-else-if="i === 1" src="../../assets/ox.png"/>
                <img v-else-if="i === 2" src="../../assets/Wakeboarder.png"/>
                <img v-else-if="i === 3" src="../../assets/mergeNum.png"/>
            </slider-item>
        </slider>
    </div>
</template>

<script>
import { Slider, SliderItem } from 'vue-easy-slider';

export default {
    components: {
        Slider,
        SliderItem
    },
    data() {
        return {
            list: [
                0,
                1,
                2,
                3
            ],
        };
    }
};
</script>