import { defineStore } from "pinia";
import { LootItemModel } from "@/models/LootItemModel";
import TileModel from "@/models/TileModel";
import EnemyModel from "@/models/EnemyModel";
import {ChestModel} from "@/models/ChestModel";
import {ItemType} from "@/enums/ItemType";
import {CoinsProvider} from "@/providers/coins-provider";

export const useChestStore = defineStore("chest-store", {
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
            this.graveTile = chestTile;
            // this.chestInventoryItems = chestTile.chest.items;
        },

        resetChest() {
            if (this.graveTile) {
                // this.chestTile.chest = null;
            }
            this.chestInventoryItems = [];
        },

        removeItem(item: LootItemModel) {
            this.chestInventoryItems = this.chestInventoryItems.filter(i => i.id !== item.id);
        },
        generateChest(enemies: EnemyModel[], chestImage: string): ChestModel {
            let totalCoins = 0;
            const nonCoinLoot: LootItemModel[] = [];
            const chest = new ChestModel();
            chest.setImagePath(chestImage);
            for (const enemy of enemies) {
                for (const lootItem of enemy.loot) {
                    lootItem.place = 'chest';

                    if (lootItem.itemType === ItemType.COIN) {
                        totalCoins += lootItem.value;
                    } else {
                        nonCoinLoot.push(lootItem);
                    }
                }
            }

            if (totalCoins > 0) {
                const coinItem: LootItemModel = CoinsProvider.getCoinsByEnemyType(null);
                coinItem.place = 'chest';
                chest.addLoot([coinItem]);
            }

            chest.addLoot(nonCoinLoot);

            return chest.items.length > 0 ? chest : null;
        },
    }
});