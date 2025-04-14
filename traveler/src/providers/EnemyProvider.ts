import EnemyModel from "@/models/EnemyModel";
import {EnemyBuilder} from "@/builders/EnemyBuilder";
import {EnemyType} from "@/enums/EnemyType";

export class EnemyProvider {
    private static enemyImageRootFolder = '/images/enemies_150_150/';

    public static getOrcMale(): EnemyModel {
        return new EnemyBuilder()
            .enemyName("Orc Warrior")
            .enemyType(EnemyType.WARRIOR)
            .enemyImgPath(this.enemyImageRootFolder + "orc_male.png")
            .enemyBackgroundSrc("rgb(153 211 146)")
            .build();
    }

    public static getOrcMage(): EnemyModel {
        return new EnemyBuilder()
            .enemyName("Orc Mage")
            .enemyType(EnemyType.WARRIOR)
            .enemyImgPath(this.enemyImageRootFolder + "orc_mage.png")
            .enemyBackgroundSrc("rgb(155, 115, 0)")
            .build();
    }

    public static getOrcBowMale(): EnemyModel {
        return new EnemyBuilder()
            .enemyName("Orc Bow")
            .enemyType(EnemyType.WARRIOR)
            .enemyImgPath(this.enemyImageRootFolder + "orc_male_bow.png")
            .enemyBackgroundSrc("rgb(255, 115, 0)")
            .build();
    }

    public static getDemon(): EnemyModel {
        return new EnemyBuilder()
            .enemyName("Poisoner")
            .enemyType(EnemyType.WARRIOR)
            .enemyImgPath(this.enemyImageRootFolder + "greenDemon1.png")
            .enemyBackgroundSrc("rgb(15, 115, 0)")
            .build();
    }

    public static getZombies(): EnemyModel {
        return new EnemyBuilder()
            .enemyName("Zombies")
            .enemyType(EnemyType.WARRIOR)
            .enemyImgPath(this.enemyImageRootFolder + "twoEnemies.png")
            .enemyBackgroundSrc("rgb(255, 15, 0)")
            .build();
    }

    public static getBullTank(): EnemyModel {
        return new EnemyBuilder()
            .enemyName("Bull Tank")
            .enemyType(EnemyType.WARRIOR)
            .enemyImgPath(this.enemyImageRootFolder + "bull_tank.png")
            .enemyBackgroundSrc("rgb(255, 215, 0)")
            .build();
    }

    public static getSkeletonTank(): EnemyModel {
        return new EnemyBuilder()
            .enemyName("Steal Bones")
            .enemyType(EnemyType.WARRIOR)
            .enemyImgPath(this.enemyImageRootFolder + "skeleton_warior.png")
            .enemyBackgroundSrc("rgb(201,255,156)")
            .build();
    }

    public static getSkeletonMage(): EnemyModel {
        return new EnemyBuilder()
            .enemyName("Magic Bones")
            .enemyType(EnemyType.WARRIOR)
            .enemyImgPath(this.enemyImageRootFolder + "skeleton_mage.png")
            .enemyBackgroundSrc("rgb(201,255,156)")
            .build();
    }

    public static getSkeletonBerserk(): EnemyModel {
        return new EnemyBuilder()
            .enemyName("Mad Bones")
            .enemyType(EnemyType.WARRIOR)
            .enemyImgPath(this.enemyImageRootFolder + "skeleton_berserk.png")
            .enemyBackgroundSrc("rgb(201,255,156)")
            .build();
    }

    public static getFireDragon(): EnemyModel {
        return new EnemyBuilder()
            .enemyName("Fire Dragon")
            .enemyType(EnemyType.WARRIOR)
            .enemyImgPath(this.enemyImageRootFolder + "fire_dragon.png")
            .enemyBackgroundSrc("rgb(255, 115, 100)")
            .build();
    }

    public static getBosses(): EnemyModel[] {
        return Array.of(
            this.getOrcMale(),
            this.getDemon(),
            this.getOrcMage(),
            this.getOrcBowMale(),
            this.getZombies(),
            this.getBullTank(),
            this.getFireDragon()
        );
    }

    public static getEvilLandsEnemies(): EnemyModel[] {
        return Array.of(
            this.getSkeletonBerserk(),
            this.getSkeletonMage(),
            this.getSkeletonTank()
        );
    }
}
