import { defineStore } from "pinia";
import { LootItemModel } from "@/models/LootItemModel";
import TileModel from "@/models/TileModel";

export const useChestStore = defineStore("chest", {
    state: () => ({
        chestTile: null as TileModel,
        chestInventoryItems: [] as LootItemModel[],
    }),

    getters: {
        isEmpty: (state) => state.chestInventoryItems.length === 0,
    },

    actions: {
        openChest(chestTile: TileModel) {
            this.chestTile = chestTile;
            this.chestInventoryItems =chestTile.chest.items;
        },

        resetChest() {
            this.chestTile.chest = null;
            this.chestTile.isChestTile = false;
            this.chestInventoryItems = [];
        },

        removeItem(item: LootItemModel) {
            this.chestInventoryItems = this.chestInventoryItems.filter(i => i.id !== item.id);
        }
    },
});