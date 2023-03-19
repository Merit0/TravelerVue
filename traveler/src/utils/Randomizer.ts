import { Equipment } from "@/models/Equipment";
import { LootItemModel } from "@/models/LootItemModel";
import { EnemyType } from "../enums/EnemyType";

export class Randomizer {
  static getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }

  static getRandomIntInRange(min: number, max: number): number {
    return Math.floor(Math.random() * max) + min;
  }

  static getRandomEnemyType(): EnemyType {
    const keys: string[] = Object.keys(EnemyType).filter(
      (k) => typeof EnemyType[k as any] === "number"
    );
    const index = this.getRandomInt(keys.length);

    return EnemyType.WARRIOR;
  }

  static getRandomEquipment(equipmentList: LootItemModel[]): LootItemModel {
    const index = this.getRandomInt(equipmentList.length);

    return equipmentList[index];
  }

  static getChance(percentage: number): boolean {
    const randNumber: number = Math.floor(Math.random() * 100);
    const val = Math.floor(Math.random() * 100) - percentage;
    const min = val < 0 ? 0 : val;
    const max = min + percentage;
    if (randNumber > min && randNumber < max) {
      return true;
    }
    return false;
  }
}
