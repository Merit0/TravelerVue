import {LootItemModel} from "@/models/LootItemModel";

export class Randomizer {
    static getRandomInt(max: number): number {
        return Math.floor(Math.random() * max);
    }

    static getRandomIntInRange(min: number, max: number): number {
        if (min > max) {
            throw new Error("Min value must be less than or equal to max value.");
        }
        return Math.floor(Math.random() * (max - min + 1)) + min;
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
        return randNumber > min && randNumber < max;
    }
}
