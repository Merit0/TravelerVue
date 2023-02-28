import { EnemyType } from '../enums/EnemyType';


export class Randomizer {

    static getRandomInt(max: number): number {
        return Math.floor(Math.random() * max);
    }

    static getRandomEnemyType(): EnemyType {
        const keys: string[] = Object.keys(EnemyType).filter(k => typeof EnemyType[k as any] === "number");
        const index = this.getRandomInt(keys.length);

        return EnemyType.COMMON;
    }
}
