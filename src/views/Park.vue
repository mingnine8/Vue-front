<template>
    <div>
        <h1>Input Your HTML Code {{a}}</h1>
    </div>
</template>

<script>
export default {
    name: 'Park',
    data () {
        return {
            // Just use this.a !
            a : 'Park'
        };
    },
    methods: {
        // Will be your function-code-line
        wellcome () {
            console.log('Park.vue/wellcome:18', this.a);
        }
    },
    created () {
        // if created this component.
        this.wellcome();
    }
};
</script>