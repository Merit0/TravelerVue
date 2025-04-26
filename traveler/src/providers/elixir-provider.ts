import {LootItemModel} from "@/models/LootItemModel";
import {LootItemBuilder} from "@/builders/LootItemBuilder";
import {Randomizer} from "@/utils/Randomizer";
import {ItemType} from "@/enums/ItemType";
import {Rarity} from "@/enums/Rarity";

export class ElixirsProvider {
    private static elixirsFolderPath = "images/healing-items";

    public static getCommonElixir(): LootItemModel {
        return new LootItemBuilder()
            .lootItemName("Vital Sip")
            .lootValue(Randomizer.getRandomIntInRange(20, 30))
            .price(50)
            .itemType(ItemType.HEAL)
            .lootRarity(Rarity.COMMON)
            .lootItemImgPath(`${this.elixirsFolderPath}/common-elixir.png`)
            .dropChance(Randomizer.getChance(50))
            .build();
    }

    public static getRareElixir(): LootItemModel {
        return new LootItemBuilder()
            .lootItemName("Scarlet Surge")
            .lootValue(Randomizer.getRandomIntInRange(30, 40))
            .price(100)
            .itemType(ItemType.HEAL)
            .lootRarity(Rarity.RARE)
            .lootItemImgPath(`${this.elixirsFolderPath}/rare-elixir.png`)
            .dropChance(Randomizer.getChance(70))
            .build();
    }

    public static getMythicElixir(): LootItemModel {
        return new LootItemBuilder()
            .lootItemName("Divine Rebirth")
            .lootValue(Randomizer.getRandomIntInRange(40, 50))
            .price(200)
            .itemType(ItemType.HEAL)
            .lootRarity(Rarity.LEGEND)
            .lootItemImgPath(`${this.elixirsFolderPath}/mythic-elixir.png`)
            .dropChance(Randomizer.getChance(30))
            .build();
    }

    public static getSmallPotion(): LootItemModel {
        return new LootItemBuilder()
            .lootItemName("Crimson Drop")
            .lootValue(Randomizer.getRandomIntInRange(5, 10))
            .price(10)
            .itemType(ItemType.HEAL)
            .lootRarity(Rarity.COMMON)
            .lootItemImgPath(`${this.elixirsFolderPath}/healSmall.png`)
            .dropChance(Randomizer.getChance(100))
            .build();
    }

    public static getElixirsList(): LootItemModel[] {
        return Array.of(this.getCommonElixir(), this.getRareElixir(), this.getMythicElixir());
    }
}