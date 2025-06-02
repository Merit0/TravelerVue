import {EnemyBuilder} from "@/builders/EnemyBuilder";
import {EnemyType} from "@/enums/EnemyType";
import EnemyModel from "@/models/EnemyModel";

export class BossProvider {
    private static bossImageRootFolder = '/images/enemies_150_150/';
    private static humansImageRootFolder = '/images/creatures_500_500/';

    public static getSkeletonBoss(): EnemyModel {
        return new EnemyBuilder()
            .enemyName("Fallen King")
            .enemyType(EnemyType.BOSS)
            .enemyImgPath(this.bossImageRootFolder + "skeleton_boss.png")
            .enemyBackgroundSrc('rgb(157 118 118)')
            .build();
    }

    public static getThiefBoss(): EnemyModel {
        return new EnemyBuilder()
            .enemyName("Allan")
            .enemyType(EnemyType.BOSS)
            .enemyImgPath(`${this.humansImageRootFolder}/humans_500_500/thief-boss-enemy-image.png`)
            .build();
    }

    public static getBanditBoss(): EnemyModel {
        return new EnemyBuilder()
            .enemyName("Jack")
            .enemyType(EnemyType.BOSS)
            .enemyImgPath(`${this.humansImageRootFolder}/humans_500_500/bandit-boss-enemy-image.png`)
            .build();
    }

    public static getHumansBosses(): EnemyModel[] {
        return Array.of(
            this.getThiefBoss(),
            this.getBanditBoss(),
        );
    }
}