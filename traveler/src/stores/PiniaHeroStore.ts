import { defineStore } from "pinia";
import { HeroModel } from "@/models/HeroModel";
import { useUserStore } from "./PiniaUserStore";
import * as Request from '@/api/Requests'

export const useHeroStore = defineStore("hero", {
    state: () => {
        return { hero: new HeroModel().build() };
    },
    actions: {
        async getHero() {
            const userStore = useUserStore();
            const hero = await Request.getHero(userStore.user.getId());
            if (hero == null) {
                console.log("Hero is not retrieved by Api");
                return false;
            }
            this.hero
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
});