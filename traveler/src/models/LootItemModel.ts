import { IHeroItem } from "@/abstraction/IHeroItem";
import { ItemType } from "@/enums/ItemType";
import { Rarity } from "@/enums/Rarity";
import { v4 as uuid } from "uuid";

export class LootItemModel implements IHeroItem {
  name: string;
  value: number;
  price: number;
  imgPath: string;
  borderFrame: string;
  itemType: ItemType;
  rarity: Rarity;
  id = uuid();
  chance: boolean;
  place: "bag" | "chest";
}
