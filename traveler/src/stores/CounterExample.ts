import { computed, reactive } from 'vue';

const state = reactive({
    count: 0
});

const getters = {
    times2: computed(() => state.count * 2)
}

const actions = {
    inc(by: number): void {
        state.count += by;
        console.log()
    }
}

export default { state, getters, ...actions }