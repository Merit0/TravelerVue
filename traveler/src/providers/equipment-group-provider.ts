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
        return [
            ...WeaponProvider.getCommonWeaponsList(),
            ...ArmorProvider.getCommonArmorsList(),
        ]
    }

    public static getEpicEquipment(): LootItemModel[] {
        return [
            ...WeaponProvider.getCommonWeaponsList(),
            ...ArmorProvider.getCommonArmorsList(),
        ]
    }

    public static getLegendEquipment(): LootItemModel[] {
        return [
            ...WeaponProvider.getCommonWeaponsList(),
            ...ArmorProvider.getCommonArmorsList(),
        ]
    }

    public static getMythicEquipment(): LootItemModel[] {
        return [
            ...WeaponProvider.getCommonWeaponsList(),
            ...ArmorProvider.getCommonArmorsList(),
        ]
    }
}