import { Equipment } from "@/models/Equipment";

export interface Hero {
  name: string;
  health: number;
  attack: number;
  id: number;
  kills: number;
  defense: number;
  equipment: Equipment;
}

export default Hero;
