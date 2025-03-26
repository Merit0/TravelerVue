import { LootItemModel } from "@/models/LootItemModel";
import { LootItemBuilder } from "@/builders/LootItemBuilder";
import { Rarity } from "@/enums/Rarity";
import { ItemType } from "@/enums/ItemType";
import { Randomizer } from "@/utils/Randomizer";

export class WeaponProvider {
  private static heroWeaponsFolderPath = "images/hero-equipment/weapons/";
  public static getSoulRipper(): LootItemModel {
    return new LootItemBuilder()
      .lootItemName("Soul Reaper")
      .lootValue(Randomizer.getRandomIntInRange(20, 50))
      .itemType(ItemType.WEAPON)
      .lootRarity(Rarity.LEGEND)
      .lootItemImgPath(this.heroWeaponsFolderPath + "knives/legend-type/sword_soul_ripper.png")
      .dropChance(Randomizer.getChance(100))
      .build();
  }

  public static getWoodCopperAxe(): LootItemModel {
    return new LootItemBuilder()
      .lootItemName("Wood Axe")
      .itemType(ItemType.WEAPON)
      .lootRarity(Rarity.COMMON)
      .lootItemImgPath(this.heroWeaponsFolderPath + "axes/common-type/common_axe.png")
      .dropChance(Randomizer.getChance(100))
      .generateAmount()
      .build();
  }

  public static getZombieSlasherAxe(): LootItemModel {
    return new LootItemBuilder()
      .lootItemName("Zombie Slasher")
      .lootValue(50)
      .itemType(ItemType.WEAPON)
      .lootRarity(Rarity.LEGEND)
      .lootItemImgPath(this.heroWeaponsFolderPath + "axes/legend-type/slasher_axe.png")
      .dropChance(Randomizer.getChance(100))
      .build();
  }

  public static getProtectorArmor(): LootItemModel {
    return new LootItemBuilder()
      .lootItemName("Protector")
      .lootValue(50)
      .itemType(ItemType.ARMOR)
      .lootRarity(Rarity.LEGEND)
      .lootItemImgPath("images/hero-equipment/armor/legend-type/protector_armor.png")
      .dropChance(Randomizer.getChance(100))
      .build();
  }

  public static getExecutorHelm(): LootItemModel {
    return new LootItemBuilder()
      .lootItemName("Executor")
      .lootValue(50)
      .itemType(ItemType.HELM)
      .lootRarity(Rarity.LEGEND)
      .lootItemImgPath("images/hero-equipment/helmets/legend-type/executor_helm.png")
      .dropChance(Randomizer.getChance(100))
      .build();
  }

  public static getHealPotion(): LootItemModel {
    return new LootItemBuilder()
      .lootItemName("Heal Potion")
      .lootValue(50)
      .itemType(ItemType.HEAL)
      .lootRarity(Rarity.COMMON)
      .lootItemImgPath("images/healing-items/healSmall.png")
      .dropChance(Randomizer.getChance(55))
      .build();
  }

  public static getEmpty(): LootItemModel {
    return new LootItemBuilder().lootItemName("Empty").build();
  }

  public static getCommonWeaponsList(): LootItemModel[] {
    return Array.of(this.getHealPotion(), this.getWoodCopperAxe());
  }

  public static getLegends(): LootItemModel[] {
    return Array.of(
      this.getHealPotion(), //to remove
      this.getSoulRipper(),
      this.getProtectorArmor(),
      this.getExecutorHelm(),
      this.getZombieSlasherAxe()
    );
  }
}
