import { ItemType } from "@/enums/ItemType";
import { LootItemModel } from "@/models/LootItemModel";

export interface IEquipment {
  sword: LootItemModel & { itemType: ItemType.SWORD };
  shield: LootItemModel;
  helm: LootItemModel;
  armor: LootItemModel;
  ring: LootItemModel;
}
