import { defineStore } from "pinia";
import { LootItemModel } from "@/models/LootItemModel";

export const useChestStore = defineStore("chest", {
  state: () => {
    return {
      chestItems: [],
      isShown: false,
    };
  },
  getters: {
    showChest: (state) => {
      state.isShown = true;
    },
    clearChest: (state) => {
      state.chestItems = [];
    },
  },
  actions: {
    async addItem(lootItem: LootItemModel) {
      this.chestItems.unshift(lootItem);
    },
    async removeItem(lootItem: LootItemModel) {
      const itemIndex = this.chestItems.findIndex(
        (chestItem: LootItemModel) => chestItem.id === lootItem.id
      );
      this.chestItems.splice(itemIndex, 1);
      this.chestCapacity += 1;
    },
  },
});
