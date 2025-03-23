import {LootItemModel} from "@/models/LootItemModel";
import {WeaponProvider} from "@/providers/WeaponProvider";
import {ArmorProvider} from "@/providers/armor-provider";

export class EquipmentGroupProvider {
    public static getCommonEquipment(): LootItemModel[] {
        return [
            ...WeaponProvider.getCommonWeaponsList(),
            ...ArmorProvider.getCommonArmorsList()
        ]
    }
}