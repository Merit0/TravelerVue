import {defineStore} from "pinia";
import {LootItemModel} from "@/models/LootItemModel";
import {useHeroStore} from "@/stores/HeroStore";

export const useBagStore = defineStore("bag", {
    state: () => {
        const hero = useHeroStore().hero;
        return {
            bagItems: [],
            isShown: false,
            bagCapacity: 25,
            hero
        };
    },
    getters: {
        showBag: (state) => {
            state.isShown = true;
        },
        getCoins: (state): number => {
            return state.hero.getCoins();
        }
    },
    actions: {
        async resetBag(): Promise<void> {
            console.log('Resetting Bag state');
            this.bagItems = [];
            this.isShown = false;
            this.bagCapacity = 25;
            localStorage.removeItem("bag");
            console.log('Bag state after reset:', this.$state);
        },
        putIn(lootItem: LootItemModel) {
            if (this.bagCapacity > 0) {
                this.bagItems.unshift(lootItem);
                this.bagCapacity -= 1;
            }
        },
        removeItem(lootItem: LootItemModel) {
            const itemIndex = this.bagItems.findIndex(
                (bagItem: LootItemModel) => bagItem.id === lootItem.id
            );
            this.bagItems.splice(itemIndex, 1);
            this.bagCapacity += 1;
        },
        pay(coins: number) {
            this.hero.coins -= coins;
        },
    },
});
