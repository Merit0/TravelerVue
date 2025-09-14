import { IEquipment } from "@/abstraction/IEquipment";
import { ItemType } from "@/enums/ItemType";
import { LootItemModel } from "../../../models/LootItemModel";

export class EquipmentModel implements IEquipment {
  weapon: LootItemModel & { itemType: ItemType.WEAPON };
  shield: LootItemModel;
  helm: LootItemModel;
  armor: LootItemModel;
  ring: LootItemModel;
  boots: LootItemModel;
  belt: LootItemModel;
  pants: LootItemModel;
}
