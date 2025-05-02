import {LootItemModel} from "./LootItemModel";
import {IChest} from "@/abstraction/chest-interface";

export class ChestModel implements IChest {
    items: LootItemModel[] = new Array(12).fill(new LootItemModel());
    imgPath: string;

    public setImagePath(imagePath: string): void {
        this.imgPath = imagePath;
    }

    public addLoot(lootItem: LootItemModel[]): void {
        lootItem.forEach((item) => {
            this.items.unshift(item);
            this.items.pop();
        })
    }
}
