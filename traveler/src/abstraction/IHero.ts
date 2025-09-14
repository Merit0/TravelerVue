import { EquipmentModel } from "@/a-game-scenes/inventory-scene/models/equipment-model";
import TileModel, {ICoordinates} from "@/a-game-scenes/silesia-world-scene/models/tile-model";
import {DiceModel} from "@/a-game-scenes/battlefield-scene/dice-roller/models/DiceModel";

export interface IHero {
  name: string;
  currentHealth: number;
  maxHealth: number;
  attack: number;
  defense: number;
  coins: number;
  stats: boolean;
  kills: number;
  currentEnergy: number;
  maxEnergy: number;
  id: number;
  imgPath: string;
  available: boolean;
  equipment: EquipmentModel;
  currentTile: TileModel;
  heroLocation: ICoordinates;
  heroSteps: number;
  heroDices: DiceModel[]
  experienceCollector(): void;
  getHeroDices(): DiceModel[];
}
