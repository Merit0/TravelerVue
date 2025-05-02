import {LootItemModel} from "@/models/LootItemModel";

export interface IChest {
    setImagePath(imagePath: string): void,
    addLoot(lootItem: LootItemModel[]): void
}
