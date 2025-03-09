import { LootItemModel } from "@/models/LootItemModel";

export class Randomizer {
  static getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }

  static getRandomIntInRange(min: number, max: number): number {
    return Math.floor(Math.random() * max) + min;
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
