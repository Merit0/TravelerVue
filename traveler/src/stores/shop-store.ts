import {defineStore} from 'pinia';
import {LootItemModel} from '@/models/LootItemModel';
import {WeaponProvider} from "@/providers/WeaponProvider";
import {ElixirsProvider} from "@/providers/elixir-provider";
import {HelmetProvider} from "@/providers/helmet-provider";
import {ArmorProvider} from "@/providers/armor-provider";
import {ShieldProvider} from "@/providers/shield-provider";
import {EquipmentGroupProvider} from "@/providers/equipment-group-provider";
import {Randomizer} from "@/utils/Randomizer";
import {BootsProvider} from "@/providers/boots-provider";

export const useShopStore = defineStore('shop', {
    state: () => ({
        items: [] as LootItemModel[],
    }),

    actions: {
        initShopItems(): void {
            const purchasedIds: string[] = JSON.parse(localStorage.getItem("purchasedItems") || "[]");

            let parsedShopItems: LootItemModel[] | null = null;

            try {
                const raw = localStorage.getItem("shop");
                const parsed = raw ? JSON.parse(raw) : null;
                parsedShopItems = parsed?.items ?? null;
            } catch (e) {
                console.warn("Failed to parse shop items from storage:", e);
                parsedShopItems = null;
            }

            const initialItems = this.generateInitialItems();

            const baseItems = parsedShopItems ?? initialItems;

            this.items = baseItems.map(item => ({
                ...item,
                place: purchasedIds.includes(item.id) ? "bag" : "shop"
            }));

            if (!parsedShopItems) {
                localStorage.setItem("shop", JSON.stringify({items: this.items}));
            }
        },

        refreshShopItems(): void {
            const newItems = this.generateInitialItems();

            this.items = newItems.map(item => ({
                ...item,
                place: "shop"
            }));

            localStorage.setItem("shop", JSON.stringify({items: this.items}));
            localStorage.removeItem("purchasedItems");

            console.log("Shop has been refreshed!");
        },

        generateInitialItems(): LootItemModel[] {
            return [
                WeaponProvider.getMolner(),
                ArmorProvider.getLeatherArmor(),
                ShieldProvider.getRoundWoodenShield(),
                HelmetProvider.getIronHat(),
                EquipmentGroupProvider.getLegendEquipment()[Randomizer.getRandomIntInRange(0, 3)],
                ElixirsProvider.getRareElixir(),
                ElixirsProvider.getCommonElixir(),
                BootsProvider.getLeatherBoots(),
            ];
        },
        getShopItems(): LootItemModel[] {
            return this.items;
        },
    },
});
