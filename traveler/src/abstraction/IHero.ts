import { Equipment } from "@/models/Equipment";
import TileModel, {ICoordinates} from "@/models/TileModel";
import {DiceModel} from "@/models/DiceModel";

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
  equipment: Equipment;
  currentTile: TileModel;
  heroLocation: ICoordinates;
  heroSteps: number;
  heroDices: DiceModel[]
  experienceCollector(): void;
  getHeroDices(): DiceModel[];
}
