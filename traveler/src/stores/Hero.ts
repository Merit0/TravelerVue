import { computed, reactive } from 'vue'
import * as Request from '@/api/Requests'
import { HeroModel } from '../models/HeroModel';
import { Hero } from '../api/Requests';
import { UserModel } from '../models/UserModel';

const state = reactive({
    hero: new HeroModel().build()
});


const getters = reactive({
    isHero: computed(() => state.hero.getName() !== "")
});

const actions = {
    async getHero(id: number) {
        console.log("getHeroMethod()" + id);
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
            .stats(true);

        return true;
    }
}

export default { state, getters, ...actions }