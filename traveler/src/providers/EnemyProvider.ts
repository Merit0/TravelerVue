import EnemyModel from '../models/EnemyModel';
import { EnemyBuilder } from '../builders/EnemyBuilder';
import { EnemyType } from '@/enums/EnemyType';
export class EnemyProvider {

    public static getOrcMale(): EnemyModel {
        return new EnemyBuilder()
            .enemyName("Orc Warrior")
            .enemyType(EnemyType.WARRIOR)
            .enemyImgPath("enemies_150_150/orc_male.png")
            .build();
    }

    public static getOrcMage(): EnemyModel {
        return new EnemyBuilder()
            .enemyName("Orc Mage")
            .enemyType(EnemyType.WARRIOR)
            .enemyImgPath("enemies_150_150/orc_mage.png")
            .build();
    }

    public static getOrcBowMale(): EnemyModel {
        return new EnemyBuilder()
            .enemyName("Orc Bow")
            .enemyType(EnemyType.WARRIOR)
            .enemyImgPath("enemies_150_150/orc_male_bow.png")
            .build();
    }

    public static getDemon(): EnemyModel {
        return new EnemyBuilder()
            .enemyName("Poisoner")
            .enemyType(EnemyType.WARRIOR)
            .enemyImgPath("enemies_150_150/greenDemon1.png")
            .build();
    }

    public static getZombies(): EnemyModel {
        return new EnemyBuilder()
            .enemyName("Zombies")
            .enemyType(EnemyType.WARRIOR)
            .enemyImgPath("enemies_150_150/twoEnemies.png")
            .build();
    }

    public static getBullTank(): EnemyModel {
        return new EnemyBuilder()
            .enemyName("Bull Tank")
            .enemyType(EnemyType.WARRIOR)
            .enemyImgPath("enemies_150_150/bull_tank.png")
            .build();
    }

    public static getFireDragon(): EnemyModel {
        return new EnemyBuilder()
            .enemyName("Fire Dragon")
            .enemyType(EnemyType.WARRIOR)
            .enemyImgPath("enemies_150_150/fire_dragon.png")
            .build();
    }

    public static getEvilLandsEnemies(): EnemyModel[] {
        return Array.of(this.getOrcMale(), this.getDemon(), this.getOrcMage(), this.getOrcBowMale(), this.getZombies(), this.getBullTank(), this.getFireDragon());
    }
}