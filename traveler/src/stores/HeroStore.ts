import { defineStore } from "pinia";
import { HeroModel } from "@/models/HeroModel";
import { useUserStore } from "./UserStore";
import * as Request from "@/api/Requests";
import { IHero } from "@/abstraction/IHero";
import TileModel from "@/models/TileModel";

export const useHeroStore = defineStore("hero", {
  state: () => {
    return {
      hero: new HeroModel(),
      inventoryShown: false,
    };
  },
  actions: {
    async getHero() {
      const userStore = useUserStore();
      const hero: IHero = await Request.getHero(userStore.user.getId());
      if (hero == null) {
        console.log("Hero is not retrieved by Api");
        return false;
      }

      this.hero
        .setName(hero.name)
        .setHealth(hero.currentHealth)
        .setMaxHealth(hero.maxHealth)
        .setAttack(hero.attack)
        .setDefense(hero.defense)
        .setCoins(hero.coins)
        .setKills(hero.kills)
        .setStats(hero.available)
        .setEquipment(hero.equipment);

      return true;
    },
    isAlive(): boolean {
      return this.hero.getHealth() > 0;
    },
    rest() {
      this.hero.healthIncreaser();
    },
    healHero(health: number) {
      this.hero.health += health;
    },
    showInventory(status: boolean) {
      this.inventoryShown = status;
    },
    setLocation(tile: TileModel) {
      this.location = tile;
    },
  },
});
