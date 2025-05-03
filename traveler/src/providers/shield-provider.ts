import {LootItemModel} from "@/models/LootItemModel";
import {LootItemBuilder} from "@/builders/LootItemBuilder";
import {Randomizer} from "@/utils/Randomizer";
import {ItemType} from "@/enums/ItemType";
import {Rarity} from "@/enums/Rarity";

export class ShieldProvider {
    private static shieldsFolderPath = "images/hero-equipment/shields";

    public static getRoundWoodenShield(): LootItemModel {
        return new LootItemBuilder()
            .lootItemName("Wooden Shield")
            .lootValue(Randomizer.getRandomIntInRange(20, 30))
            .price(20)
            .itemType(ItemType.SHIELD)
            .lootRarity(Rarity.COMMON)
            .lootItemImgPath(`${this.shieldsFolderPath}/common-type/wooden-shield.png`)
            .build();
    }

    public static getSquareWoodenShield(): LootItemModel {
        return new LootItemBuilder()
            .lootItemName("Wooden Shield")
            .lootValue(Randomizer.getRandomIntInRange(20, 30))
            .price(20)
            .itemType(ItemType.SHIELD)
            .lootRarity(Rarity.COMMON)
            .lootItemImgPath(`${this.shieldsFolderPath}/common-type/square-wooden-shield.png`)
            .build();
    }

    public static getDreadwallShield(): LootItemModel {
        return new LootItemBuilder()
            .lootItemName("Dreadwall")
            .lootValue(Randomizer.getRandomIntInRange(200, 400))
            .price(2500)
            .itemType(ItemType.SHIELD)
            .lootRarity(Rarity.MYTHIC)
            .lootItemImgPath(`${this.shieldsFolderPath}/mythic-type/dreadwall-shield.png`)
            .build();
    }

    public static getCommonShieldsList(): LootItemModel[] {
        return Array.of(this.getRoundWoodenShield(), this.getSquareWoodenShield());
    }
}