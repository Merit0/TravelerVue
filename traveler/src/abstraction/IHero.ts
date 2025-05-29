import { Equipment } from "@/models/Equipment";
import TileModel, {ICoordinates} from "@/models/TileModel";

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
  experienceCollector(): void;
}
