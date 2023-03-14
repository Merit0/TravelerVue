import { SwordProvider } from '@/providers/SwordProvider';
import { LootItemModel } from './LootItemModel';

export class ChestModel {

    items: LootItemModel[] = new Array(6).fill(SwordProvider.getEmpty());

    public setLootItems(items: LootItemModel[]): void {
        this.items = items;
    }

    public getLootItems(): LootItemModel[] {
        return this.items;
    }

}