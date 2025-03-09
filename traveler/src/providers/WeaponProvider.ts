import { LootItemModel } from "../models/LootItemModel";
import { LootItemBuilder } from "../builders/LootItemBuilder";
import { Rarity } from "@/enums/Rarity";
import { ItemType } from "@/enums/ItemType";
import { Randomizer } from "@/utils/Randomizer";

export class WeaponProvider {
  public static getRipper(): LootItemModel {
    return new LootItemBuilder()
      .lootItemName("Soul Reaper")
      .lootValue(10)
      .itemType(ItemType.WEAPON)
      .lootRarity(Rarity.LEGEND)
      .lootItemImgPath("equipment/sword_soul_ripper.png")
      .dropChance(Randomizer.getChance(5))
      .build();
  }

  public static getAxe(): LootItemModel {
    return new LootItemBuilder()
      .lootItemName("Wood Axe")
      .itemType(ItemType.WEAPON)
      .lootRarity(Rarity.COMMON)
      .lootItemImgPath("equipment/common_axe.png")
      .dropChance(Randomizer.getChance(50))
      .generateAmount()
      .build();
  }

  public static getSlasher(): LootItemModel {
    return new LootItemBuilder()
      .lootItemName("Zombie Slasher")
      .lootValue(50)
      .itemType(ItemType.WEAPON)
      .lootRarity(Rarity.LEGEND)
      .lootItemImgPath("equipment/slasher_axe.png")
      .dropChance(Randomizer.getChance(5))
      .build();
  }

  public static getProtector(): LootItemModel {
    return new LootItemBuilder()
      .lootItemName("Protector")
      .lootValue(50)
      .itemType(ItemType.ARMOR)
      .lootRarity(Rarity.LEGEND)
      .lootItemImgPath("equipment/protector_armor.png")
      .dropChance(Randomizer.getChance(5))
      .build();
  }

  public static getExecutor(): LootItemModel {
    return new LootItemBuilder()
      .lootItemName("Executor")
      .lootValue(50)
      .itemType(ItemType.HELM)
      .lootRarity(Rarity.LEGEND)
      .lootItemImgPath("equipment/executor_helm.png")
      .dropChance(Randomizer.getChance(5))
      .build();
  }

  public static getHealPotion(): LootItemModel {
    return new LootItemBuilder()
      .lootItemName("Heal Potion")
      .lootValue(50)
      .itemType(ItemType.HEAL)
      .lootRarity(Rarity.COMMON)
      .lootItemImgPath("items/healSmall.png")
      .dropChance(Randomizer.getChance(100))
      .build();
  }

  public static getEmpty(): LootItemModel {
    return new LootItemBuilder().lootItemName("Empty").build();
  }

  public static getCommon(): LootItemModel[] {
    return Array.of(this.getHealPotion(), this.getAxe());
  }

  public static getLegends(): LootItemModel[] {
    return Array.of(
      this.getRipper(),
      this.getProtector(),
      this.getExecutor(),
      this.getSlasher()
    );
  }
}
