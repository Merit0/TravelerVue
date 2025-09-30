import { EquipmentModel } from "@/a-game-scenes/inventory-scene/models/equipment-model";

export interface Hero {
  name: string;
  health: number;
  attack: number;
  id: number;
  kills: number;
  defense: number;
  equipment: EquipmentModel;
}

export default Hero;
