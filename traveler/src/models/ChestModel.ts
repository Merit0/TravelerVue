import { LootItemModel } from "./LootItemModel";

export class ChestModel {
  items: LootItemModel[] = new Array(6).fill(new LootItemModel());

  public setLootItems(items: LootItemModel[]): void {
    this.items = items;
  }

  public getLootItems(): LootItemModel[] {
    return this.items;
  }

  public addLoot(lootItem: LootItemModel): void {
    this.items.unshift(lootItem);
    this.items.pop();
  }
}
