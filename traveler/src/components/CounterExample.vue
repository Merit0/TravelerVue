<template>
    <h4 class="testClass">{{state.count}} x 2 = {{getters.times2}}</h4>
    <button class="testClass" @click="inc(1)">Inc</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
<<<<<<< HEAD
import counterStore from '../stores/CounterExample'
=======
import counterStore from '../stores/MyCounter'
>>>>>>> parent of cc3f970 (remove)

export default defineComponent({
    setup() {
        const {state, getters, inc} = counterStore;
        return {state, getters, inc}
    },
})
</script>
