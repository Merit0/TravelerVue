import { defineStore } from "pinia";
import { LootItemModel } from "@/models/LootItemModel";

export const useChestStore = defineStore("chest", {
  state: () => {
    return {
      chestItems: [],
      isShown: false,
      bagCapacity: 6,
    };
  },
  getters: {
    showChest: (state) => {
      state.isShown = true;
    },
    clearChest: (state) => (state.chestItems = []),
  },
  actions: {
    async addItems(items: LootItemModel[]) {
      for (let i = 0; i < items.length; i++) {
        this.putIn(items[i]);
      }
    },
    async putIn(lootItem: LootItemModel) {
      if (this.chestCapacity > 0) {
        this.chestItems.unshift(lootItem);
        this.chestCapacity -= 1;
      }
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
