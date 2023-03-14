import { LootItemModel } from './LootItemModel';

export class ChestModel {

    items: LootItemModel[] = [];

    public setLootItems(items: LootItemModel[]): void {
        this.items = items;
    }

    public getLootItems(): LootItemModel[] {
        return this.items;
    }

}