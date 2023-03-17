import { defineStore } from "pinia";
import { LootItemModel } from "@/models/LootItemModel";

export const useBagStore = defineStore("bag", {
  state: () => {
    return {
      bagItems: [],
      isShown: false,
      bagCapacity: 15,
    };
  },
  getters: {
    showBag: (state) => {
      state.isShown = true;
    },
  },
  actions: {
    async putIn(lootItem: LootItemModel) {
      if (this.bagCapacity > 0) {
        this.bagItems.unshift(lootItem);
        this.bagCapacity -= 1;
      }
    },
    async removeItem(lootItem: LootItemModel) {
      const itemIndex = this.bagItems.findIndex(
        (bagItem: LootItemModel) => bagItem.id === lootItem.id
      );
      this.bagItems.splice(itemIndex, 1);
      this.bagCapacity += 1;
    },
  },
});
