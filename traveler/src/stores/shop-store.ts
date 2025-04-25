import { defineStore } from 'pinia';
import { LootItemModel } from '@/models/LootItemModel';
import {WeaponProvider} from "@/providers/WeaponProvider";
import {ElixirsProvider} from "@/providers/elixir-provider";

export const useShopStore = defineStore('shop', {
    state: () => ({
        items: [] as LootItemModel[],
    }),

    actions: {
        initShopItems(): void {
            const allWeapons: LootItemModel[] = WeaponProvider.getAll();
            this.items = [
                allWeapons[0],
                allWeapons[1],
                allWeapons[2],
                allWeapons[3],
                allWeapons[4],
                ElixirsProvider.getRareElixir(),
                ElixirsProvider.getCommonElixir(),
                ElixirsProvider.getMythicElixir(),
            ];
        },

        getShopItems(): LootItemModel[] {
            return this.items;
        },

        removeItemById(id: string) {
            this.items = this.items.filter((item: LootItemModel) => item.id !== id);
        }
    },
});
