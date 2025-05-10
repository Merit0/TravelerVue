import {LootItemModel} from "@/models/LootItemModel";
import {LootItemBuilder} from "@/builders/LootItemBuilder";
import {Rarity} from "@/enums/Rarity";
import {ItemType} from "@/enums/ItemType";
import {Randomizer} from "@/utils/Randomizer";

export class WeaponProvider {
    private static heroWeaponsFolderPath = "images/hero-equipment/weapons";

    public static getSoulRipper(): LootItemModel {
        return new LootItemBuilder()
            .lootItemName("Soul Reaper")
            .lootValue(Randomizer.getRandomIntInRange(20, 50))
            .price(250)
            .itemType(ItemType.WEAPON)
            .lootRarity(Rarity.LEGEND)
            .lootItemImgPath(this.heroWeaponsFolderPath + "/knives/legend-type/sword_soul_ripper.png")
            .dropChance(Randomizer.getChance(100))
            .build();
    }

    public static getWoodCopperAxe(): LootItemModel {
        return new LootItemBuilder()
            .lootItemName("Wood Axe")
            .price(20)
            .itemType(ItemType.WEAPON)
            .lootRarity(Rarity.COMMON)
            .lootItemImgPath(this.heroWeaponsFolderPath + "/axes/common-type/common_axe.png")
            .dropChance(Randomizer.getChance(100))
            .generateAmount()
            .build();
    }

    public static getZombieSlasherAxe(): LootItemModel {
        return new LootItemBuilder()
            .lootItemName("Zombie Slasher")
            .lootValue(50)
            .price(500)
            .itemType(ItemType.WEAPON)
            .lootRarity(Rarity.LEGEND)
            .lootItemImgPath(this.heroWeaponsFolderPath + "/axes/legend-type/slasher_axe.png")
            .build();
    }

    public static getSkyDestroyerAxe(): LootItemModel {
        return new LootItemBuilder()
            .lootItemName("Sky Destroyer")
            .lootValue(100)
            .price(3000)
            .itemType(ItemType.WEAPON)
            .lootRarity(Rarity.MYTHIC)
            .lootItemImgPath(this.heroWeaponsFolderPath + "/axes/mythic-type/sky-destroyer-axe.png")
            .build();
    }

    public static getVenomspireKnife(): LootItemModel {
        return new LootItemBuilder()
            .lootItemName("Venom Spire")
            .lootValue(100)
            .price(3000)
            .itemType(ItemType.WEAPON)
            .lootRarity(Rarity.MYTHIC)
            .lootItemImgPath(this.heroWeaponsFolderPath + "/knives/mythic-type/venomspire-knife.png")
            .build();
    }

    public static getProtectorArmor(): LootItemModel {
        return new LootItemBuilder()
            .lootItemName("Protector")
            .lootValue(50)
            .price(400)
            .itemType(ItemType.ARMOR)
            .lootRarity(Rarity.LEGEND)
            .lootItemImgPath("images/hero-equipment/armor/legend-type/protector_armor.png")
            .build();
    }



    public static getCommonWeaponsList(): LootItemModel[] {
        return Array.of(this.getWoodCopperAxe());
    }

    public static getLegends(): LootItemModel[] {
        return Array.of(
            this.getSoulRipper(),
            this.getProtectorArmor(),
            this.getZombieSlasherAxe()
        );
    }

    public static getAll(): LootItemModel[] {
        return [...this.getLegends(), ...this.getCommonWeaponsList()];
    }
}
