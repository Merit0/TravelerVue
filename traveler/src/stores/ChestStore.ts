import {defineStore} from "pinia";
import {LootItemModel} from "@/models/LootItemModel";

export const useChestStore = defineStore("chest", {
        state: () => {
            return {
                chestItems: [] as LootItemModel[],
                isShown: false,
            };
        },
        actions: {
            async resetChest(): Promise<void> {
                console.log('Resetting Chest state');
                this.chestItems = [];
                this.isShown = false;
                console.log('Chest state after reset:', this.$state);
            },
            async addItem(lootItem: LootItemModel) {
                this.chestItems.unshift(lootItem);
            },
            async removeItem(lootItem: LootItemModel) {
                const itemIndex = this.chestItems.findIndex(
                    (chestItem: LootItemModel) => chestItem.id === lootItem.id
                );
                this.chestItems.splice(itemIndex, 1);
            },
        },
    })
;
