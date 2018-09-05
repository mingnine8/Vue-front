<template>
    <div>
        <h1>Input Your HTML Code {{a}}</h1>
    </div>
</template>

<script>
export default {
    name: 'Ming',
    data () {
        return {
            // Just use this.a !
            a : 'Ming'
        };
    },
    methods: {
        // Will be your function-code-line
        wellcome () {
            console.log('Ming.vue/wellcome:18', this.a);
        }
    },
    created () {
        // if created this component.
        this.wellcome();
    }
};
</script>