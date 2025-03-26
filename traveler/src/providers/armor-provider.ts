import {LootItemModel} from "@/models/LootItemModel";
import {LootItemBuilder} from "@/builders/LootItemBuilder";
import {Randomizer} from "@/utils/Randomizer";
import {ItemType} from "@/enums/ItemType";
import {Rarity} from "@/enums/Rarity";

export class ArmorProvider {
    private static heroArmorFolderPath = "images/hero-equipment/armor/";
    public static getRobe(): LootItemModel {
        return new LootItemBuilder()
            .lootItemName("Robe")
            .lootValue(Randomizer.getRandomIntInRange(0, 20))
            .itemType(ItemType.ARMOR)
            .lootRarity(Rarity.COMMON)
            .lootItemImgPath(this.heroArmorFolderPath + "common-type/robe.png")
            .dropChance(Randomizer.getChance(100))
            .build();
    }

    public static getCommonArmorsList(): LootItemModel[] {
        return Array.of(this.getRobe());
    }
}