import { LootItemModel } from "../models/LootItemModel";
import { LootItemBuilder } from "../builders/LootItemBuilder";
import { Rarity } from "@/enums/Rarity";
import { ItemType } from "@/enums/ItemType";
import { Randomizer } from "@/utils/Randomizer";

export class SwordProvider {
  public static getRipper(): LootItemModel {
    return new LootItemBuilder()
      .lootItemName("Soul Reaper")
      .lootValue(10)
      .itemType(ItemType.SWORD)
      .lootRarity(Rarity.COMMON)
      .lootItemImgPath("weapons/sword_soul_ripper.png")
      .dropChance(Randomizer.getChance(10))
      .build();
  }

  public static getEmpty(): LootItemModel {
    return new LootItemBuilder().lootItemName("Empty").build();
  }
}
