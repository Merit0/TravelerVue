import { defineStore } from "pinia";
import { HeroModel } from "@/models/HeroModel";
import { useUserStore } from "./UserStore";
import * as Request from '@/api/Requests'

export const useHeroStore = defineStore("hero", {
    state: () => {
        return { hero: new HeroModel() };
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
                .setName(hero.name)
                .setHealth(hero.health)
                .setAttack(hero.attack)
                .setDefence(hero.defense)
                .setCoins(hero.coins)
                .setKills(hero.kills)
                .setStats(true);

            return true;
        },
        isAlive(): boolean {
            return this.hero.getHealth() > 0 ? true : false;
        },
        rest() {
            this.hero.healthIncreaser();
        }
    }
});