import {EnemyBuilder} from "@/builders/EnemyBuilder";
import {EnemyType} from "@/enums/EnemyType";
import EnemyModel from "@/models/EnemyModel";

export class BossProvider {
    private static creaturesImageRootFolder = '/images/creatures_500_500/';

    public static getSkeletonBoss(): EnemyModel {
        return new EnemyBuilder()
            .enemyName("Fallen King")
            .enemyType(EnemyType.BOSS)
            .enemyImgPath(this.creaturesImageRootFolder + "skeletons/boss-skeleton.png")
            .enemyBackgroundSrc('rgb(157 118 118)')
            .build();
    }

    public static getBosses(): EnemyModel[] {
        return Array.of(
            this.getSkeletonBoss(),
        );
    }
}