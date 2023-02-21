import { computed, reactive } from 'vue'
import * as Request from '@/api/Requests'
import { HeroModel } from '../models/HeroModel';

const state = reactive({
    hero: new HeroModel().build()
});


const getters = reactive({
    isHero: computed(() => state.hero.getName() !== "")
});

const actions = {
    async getHero(id: number) {
        const hero = await Request.getHero(id);
        if (hero == null) {
            console.log("Hero is not retrieved by Api");
            return false;
        }
        state.hero
            .name(hero.name)
            .health(hero.health)
            .attack(hero.attack)
            .defense(hero.defense)
            .coins(hero.coins)
            .kills(hero.kills)
            .stats(true);

        return true;
    }
}

export default { state, getters, ...actions }