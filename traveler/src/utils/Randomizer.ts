import {LootItemModel} from "@/models/LootItemModel";
import EnemyModel from "@/models/EnemyModel";
import {AnimalProvider} from "@/providers/creatures-provider/animal-provider";

export class Randomizer {
    static getRandomAnimal(animalNamesList: string[]): EnemyModel {
        const index = this.getRandomInt(animalNamesList.length);
        return AnimalProvider.getForestAnimal(animalNamesList[index])
    }

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

    static roll(chance: number): boolean {
        return Math.random() * 100 < chance;
    }

    static pickOne<T>(array: T[]): T | null {
        if (!array || array.length === 0) return null;
        const index = Math.floor(Math.random() * array.length);
        return array[index];
    }

    static weightedRollFromMap<T extends string | number>(
        chanceMap: Record<T, number>
    ): T {
        const roll = Math.random() * 100;
        let cumulative = 0;

        for (const key in chanceMap) {
            cumulative += chanceMap[key as T];
            if (roll <= cumulative) {
                return key as T;
            }
        }

        const fallback = Object.keys(chanceMap)[Object.keys(chanceMap).length - 1];
        return fallback as T;
    }
}
