import {LootItemModel} from "@/models/LootItemModel";

export interface IGrave {
    setGraveImagePath(imagePath: string): void,
    addLoot(lootItem: LootItemModel[]): void
}