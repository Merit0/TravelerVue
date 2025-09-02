import {LootItemModel} from "@/models/LootItemModel";
import {LootItemBuilder} from "@/builders/LootItemBuilder";
import {Rarity} from "@/enums/Rarity";
import {ItemType} from "@/enums/ItemType";
import {Randomizer} from "@/utils/Randomizer";

export class WeaponProvider {
    private static heroWeaponsFolderPath = "/images/hero-equipment/weapons";

    public static getMolner(): LootItemModel {
        return new LootItemBuilder()
            .lootItemName("Molner")
            .lootValue(Randomizer.getRandomIntInRange(15, 30))
            .price(100)
            .itemType(ItemType.WEAPON)
            .lootRarity(Rarity.RARE)
            .lootItemImgPath(this.heroWeaponsFolderPath + "/hammers/rare-type/molner/molner-hammer.png")
            .lootItemPoseImgPath(this.heroWeaponsFolderPath + "/hammers/rare-type/molner/molner-hammer-pose.png")
            .build();
    }

    public static getCommonWeaponsList(): LootItemModel[] {
        return Array.of(this.getMolner());
    }

    public static getRareWeaponsList(): LootItemModel[] {
        return Array.of(this.getMolner());
    }

    public static getLegends(): LootItemModel[] {
        return Array.of(
            this.getMolner()
        );
    }

    public static getMyths(): LootItemModel[] {
        return Array.of();
    }

    public static getAll(): LootItemModel[] {
        return [...this.getLegends(), ...this.getCommonWeaponsList()];
    }
}
