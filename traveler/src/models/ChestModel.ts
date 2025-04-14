import { LootItemModel } from "./LootItemModel";
import {IChest} from "@/abstraction/chest-interface";

export class ChestModel implements IChest {
  items: LootItemModel[] = new Array(6).fill(new LootItemModel());
  imgPath: string;

  public setImagePath(imagePath: string): void {
    this.imgPath = imagePath;
  }

  public addLoot(lootItem: LootItemModel): void {
    this.items.unshift(lootItem);
    this.items.pop();
  }
}
