import { IHeroItem } from "@/abstraction/IHeroItem";
import { ItemType } from "@/enums/ItemType";
import { Rarity } from "@/enums/Rarity";
import { v4 as uuidv4 } from "uuid";

export class LootItemModel implements IHeroItem {
  name: string;
  value: number;
  imgPath: string;
  borderFrame: string;
  itemType: ItemType;
  rarity: Rarity;
  id = uuidv4();
  chance: boolean;
}
