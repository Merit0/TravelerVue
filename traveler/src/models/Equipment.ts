import { IEquipment } from "@/abstraction/IEquipment";
import { ItemType } from "@/enums/ItemType";
import { LootItemModel } from "./LootItemModel";

export class Equipment implements IEquipment {
  sword: LootItemModel & { itemType: ItemType.SWORD };
  shield: LootItemModel;
  helm: LootItemModel;
  armor: LootItemModel;
  ring: LootItemModel;
}
