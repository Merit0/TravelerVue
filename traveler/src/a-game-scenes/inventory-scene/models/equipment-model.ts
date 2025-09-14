import { IEquipment } from "@/abstraction/IEquipment";
import { ItemType } from "@/enums/ItemType";
import { LootItemModel } from "@/models/LootItemModel";

export class EquipmentModel implements IEquipment {
  weapon: LootItemModel & { itemType: ItemType.WEAPON };
  shield: LootItemModel;
  helm: LootItemModel;
  armor: LootItemModel;
  ring: LootItemModel;
  boots: LootItemModel;
  belt: LootItemModel;
  pants: LootItemModel;

  static slotMap: Partial<Record<ItemType, keyof EquipmentModel | null>> = {
    [ItemType.WEAPON]: "weapon",
    [ItemType.SHIELD]: "shield",
    [ItemType.HELM]: "helm",
    [ItemType.ARMOR]: "armor",
    [ItemType.RING]: "ring",
    [ItemType.BOOTS]: "boots",
    [ItemType.BELT]: "belt",
    [ItemType.PANTS]: "pants",
    [ItemType.HEAL]: null,
  };
}
