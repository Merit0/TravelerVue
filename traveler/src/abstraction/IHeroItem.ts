import { ItemType } from "@/enums/ItemType";
import { Rarity } from "@/enums/Rarity";

export interface IHeroItem {
  name: string;
  value: number;
  imgPath: string;
  borderFrame: string;
  itemType: ItemType;
  rarity: Rarity;
  id: string;
  chance: boolean;
}
