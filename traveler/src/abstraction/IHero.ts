import { Equipment } from "@/models/Equipment";
import TileModel from "@/models/TileModel";

export interface IHero {
  name: string;
  currentHealth: number;
  maxHealth: number;
  attack: number;
  defense: number;
  coins: number;
  stats: boolean;
  kills: number;
  id: number;
  imgPath: string;
  available: boolean;
  equipment: Equipment;
  heroLocation: TileModel;
  experienceCollector(): void;
}
