import {LootItemModel} from "@/models/LootItemModel";
import {WeaponProvider} from "@/providers/WeaponProvider";
import {ArmorProvider} from "@/providers/armor-provider";
import {ElixirsProvider} from "@/providers/elixir-provider";

export class EquipmentGroupProvider {
    public static getCommonEquipment(): LootItemModel[] {
        return [
            ...WeaponProvider.getCommonWeaponsList(),
            ...ArmorProvider.getCommonArmorsList(),
            ElixirsProvider.getCommonElixir(),
            ElixirsProvider.getSmallPotion()
        ]
    }
}