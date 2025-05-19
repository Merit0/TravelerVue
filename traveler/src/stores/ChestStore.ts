import { defineStore } from "pinia";
import { LootItemModel } from "@/models/LootItemModel";
import TileModel from "@/models/TileModel";

export const useChestStore = defineStore("chest", {
    state: () => ({
        chestTile: null as TileModel | null,
        chestInventoryItems: [] as LootItemModel[],
    }),

    getters: {
        chestSlots: (state): (LootItemModel | null)[] => {
            const slots: (LootItemModel | null)[] = [...state.chestInventoryItems];
            while (slots.length < 9) {
                slots.push(null);
            }
            return slots;
        }
    },

    actions: {
        openChest(chestTile: TileModel) {
            this.chestTile = chestTile;
            this.chestInventoryItems = chestTile.chest.items;
        },

        resetChest() {
            if (this.chestTile) {
                this.chestTile.chest = null;
                this.chestTile.isChestTile = false;
            }
            this.chestInventoryItems = [];
        },

        removeItem(item: LootItemModel) {
            this.chestInventoryItems = this.chestInventoryItems.filter(i => i.id !== item.id);
        }
    }
});