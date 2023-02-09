import { computed, reactive } from 'vue'
import * as Request from '@/api/Requests'
import { HeroModel } from '../models/HeroModel';

const state = reactive({
    // name: "",
    // health: 0,
    // attack: 0,
    // diffense: 0,
    // coins: 0,
    // heroStats: true,
    // id: 1
    hero: new HeroModel()
        .name("")
        .build()
});


const getters = reactive({
    isHero: computed(() => state.hero.getName() !== "")
});

const actions = {
    async getHero() {
        const hero = await Request.getHero();
        if (!hero.available) {
            console.log("Hero is not retrieved by Api");
            return false;
        }
        // state.name = hero.name;
        // state.health = hero.health;
        // state.attack = hero.attack;
        // state.diffense = hero.deffense;
        // state.coins = hero.coins;
        state.hero = new HeroModel()
            .name(hero.name)
            .health(hero.health)
            .attack(hero.attack)
            .defense(hero.defense)
            .coins(hero.coins)
            .stats(true)
            .build();
        return true;
    }
}

export default { state, getters, ...actions }