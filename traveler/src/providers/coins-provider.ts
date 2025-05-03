import {LootItemModel} from "@/models/LootItemModel";
import {LootItemBuilder} from "@/builders/LootItemBuilder";
import {ItemType} from "@/enums/ItemType";

export class CoinsProvider {
    private static elixirsFolderPath = "images/chests";

    public static getCoins(coinsValue: number): LootItemModel {
        return new LootItemBuilder()
            .lootItemName("Coins")
            .lootValue(coinsValue)
            .itemType(ItemType.COIN)
            .lootItemImgPath(`${this.elixirsFolderPath}/loot-icons/bag-with-coins-image.png`)
            .build();
    }
}