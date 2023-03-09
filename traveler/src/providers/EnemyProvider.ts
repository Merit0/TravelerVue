import EnemyModel from '../models/EnemyModel';
import { EnemyBuilder } from '../builders/EnemyBuilder';
import { EnemyType } from '@/enums/EnemyType';
export class EnemyProvider {

    public static getOrc(): EnemyModel {
        return new EnemyBuilder()
            .enemyName("Orc Warrior")
            .enemyType(EnemyType.WARRIOR)
            .enemyImgPath("enemies_150_150/twoEnemies.png")
            .build();
    }

    public static getDemon(): EnemyModel {
        return new EnemyBuilder()
            .enemyName("Poisoner")
            .enemyType(EnemyType.WARRIOR)
            .enemyImgPath("enemies_150_150/greenDemon1.png")
            .build();
    }
}