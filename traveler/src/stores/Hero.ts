import { computed, reactive } from 'vue'
import * as Request from '@/stores/Requests'

const state = reactive({
    name: "",
    health: 0,
    attack: 0,
    diffense: 0,
    coins: 0
});

const getters = reactive({
    isStats: computed(() => state.name !== "")
});

const actions = {
    async getHeroStats() {
        const heroStats = await Request.getHeroStats();
        if (!heroStats.available) {
            console.log("Hero is not retrieved");
            return false;
        }
        state.name = heroStats.name;
        state.health = heroStats.health;
        state.attack = heroStats.attack;
        state.diffense = heroStats.diffense;
        state.coins = heroStats.coins;
        return true;
    }
}

export default { state, getters, ...actions }