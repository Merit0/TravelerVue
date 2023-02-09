<template>
    <h4 class="testClass">{{state.count}} x 2 = {{getters.times2}}</h4>
    <button class="testClass" @click="inc(1)">Inc</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import counterStore from '../stores/MyCounter'

export default defineComponent({
    setup() {
        const {state, getters, inc} = counterStore;
        return {state, getters, inc}
    },
})
</script>
