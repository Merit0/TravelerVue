import {EnemyBuilder} from "@/builders/EnemyBuilder";
import {EnemyType} from "@/enums/EnemyType";
import EnemyModel from "@/models/EnemyModel";

export class BossProvider {
    private static creaturesImageRootFolder = '/images/creatures_500_500/';

    public static getSkeletonBoss(): EnemyModel {
        return new EnemyBuilder()
            .enemyName("Skeletor")
            .enemyType(EnemyType.BOSS)
            .enemyImgPath(this.creaturesImageRootFolder + "skeletons/boss-skeletor.png")
            .enemyBackgroundSrc('rgb(157 118 118)')
            .build();
    }

    public static getThiefBoss(): EnemyModel {
        return new EnemyBuilder()
            .enemyName("Robin Hood")
            .enemyType(EnemyType.BOSS)
            .enemyImgPath(this.creaturesImageRootFolder + "humans_500_500/boss-robbin-hood-image.png")
            .enemyBackgroundSrc('rgb(157 118 118)')
            .build();
    }
}