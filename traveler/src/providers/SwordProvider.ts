import { LootItemModel } from '../models/LootItemModel';
import { LootItemBuilder } from '../builders/LootItemBuilder';
import { Rarity } from '@/enums/Rarity';
import { ItemType } from '@/enums/ItemType';
export class SwordProvider {

    public static getRipper(): LootItemModel {
        return new LootItemBuilder()
            .lootItemName("Soul Reaper")
            .lootValue(10)
            .itemType(ItemType.SWORD)
            .lootRarity(Rarity.COMMON)
            .lootItemImgPath("weapons/sword_soul_ripper.png")
            .build();
    }

    public static getEmpty(): LootItemModel {
        return new LootItemBuilder()
            .lootItemName("Empty")
            .build();
    }
}