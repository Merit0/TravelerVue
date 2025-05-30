import {LootItemModel} from "@/models/LootItemModel";
import {WeaponProvider} from "@/providers/WeaponProvider";
import {ArmorProvider} from "@/providers/armor-provider";
import {ShieldProvider} from "@/providers/shield-provider";
import {HelmetProvider} from "@/providers/helmet-provider";

export class EquipmentGroupProvider {
    public static getCommonEquipment(): LootItemModel[] {
        return [
            ...WeaponProvider.getCommonWeaponsList(),
            ...ArmorProvider.getCommonArmorsList(),
            ...ShieldProvider.getCommonShieldsList(),
            ...HelmetProvider.getCommonHelmetsList(),
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
            ...HelmetProvider.getLegendHelmetsList()
        ]
    }

    public static getMythicEquipment(): LootItemModel[] {
        return [
            ...WeaponProvider.getMyths(),
            ShieldProvider.getDreadwallShield(),
            HelmetProvider.getOblivorHelm(),
            ArmorProvider.getStormhideArmor()
        ]
    }
}