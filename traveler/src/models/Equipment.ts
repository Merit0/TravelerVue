import { IEquipment } from "@/abstraction/IEquipment";
import { ItemType } from "@/enums/ItemType";
import { LootItemModel } from "./LootItemModel";

export class Equipment implements IEquipment {
  weapon: LootItemModel & { itemType: ItemType.WEAPON };
  shield: LootItemModel;
  helm: LootItemModel;
  armor: LootItemModel;
  ring: LootItemModel;
  boots: LootItemModel;
  gloves: LootItemModel;
}
