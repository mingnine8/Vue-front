<template>
    <div>
        <h1>Input Your HTML Code {{a}}</h1>
    </div>
</template>

<script>
export default {
    name: 'Sang',
    data () {
        return {
            // Just use this.a !
            a : 'Sang'
        };
    },
    methods: {
        wellcome () {
            console.log('Sang.vue/wellcome:18', this.a);
        }
    },
    created () {
        // if created this component.
        this.wellcome();
    }
};
</script>