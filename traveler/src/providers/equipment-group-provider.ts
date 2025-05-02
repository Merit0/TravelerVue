import {LootItemModel} from "@/models/LootItemModel";
import {WeaponProvider} from "@/providers/WeaponProvider";
import {ArmorProvider} from "@/providers/armor-provider";

export class EquipmentGroupProvider {
    public static getCommonEquipment(): LootItemModel[] {
        return [
            ...WeaponProvider.getCommonWeaponsList(),
            ...ArmorProvider.getCommonArmorsList(),
        ]
    }

    public static getRareEquipment(): LootItemModel[] {
        return []
    }

    public static getEpicEquipment(): LootItemModel[] {
        return []
    }

    public static getLegendEquipment(): LootItemModel[] {
        return [
            ...WeaponProvider.getLegends(),
        ]
    }

    public static getMythicEquipment(): LootItemModel[] {
        return []
    }
}