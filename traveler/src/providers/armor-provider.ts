import {LootItemModel} from "@/models/LootItemModel";
import {LootItemBuilder} from "@/builders/LootItemBuilder";
import {Randomizer} from "@/utils/Randomizer";
import {ItemType} from "@/enums/ItemType";
import {Rarity} from "@/enums/Rarity";

export class ArmorProvider {
    private static heroArmorFolderPath = "/images/hero-equipment/armor/";
    public static getLeatherArmor(): LootItemModel {
        return new LootItemBuilder()
            .lootItemName("Leather Armor")
            .lootValue(Randomizer.getRandomIntInRange(0, 20))
            .itemType(ItemType.ARMOR)
            .lootRarity(Rarity.COMMON)
            .lootItemImgPath(this.heroArmorFolderPath + "common-type/leather-armor/leather-armor.png")
            .lootItemPoseImgPath(this.heroArmorFolderPath + "common-type/leather-armor/leather-armor-pose.png")
            .price(70)
            .build();
    }

    public static getStormhideArmor(): LootItemModel {
        return new LootItemBuilder()
            .lootItemName("Stormhide")
            .lootValue(Randomizer.getRandomIntInRange(100, 200))
            .price(2000)
            .itemType(ItemType.ARMOR)
            .lootRarity(Rarity.MYTHIC)
            .lootItemImgPath(this.heroArmorFolderPath + "mythic-type/stormhide-armor.png")
            .build();
    }

    public static getCommonArmorsList(): LootItemModel[] {
        return Array.of(this.getLeatherArmor());
    }
}