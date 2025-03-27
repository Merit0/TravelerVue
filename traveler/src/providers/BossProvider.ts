import {EnemyBuilder} from "@/builders/EnemyBuilder";
import {EnemyType} from "@/enums/EnemyType";
import EnemyModel from "@/models/EnemyModel";

export class BossProvider {
    private static bossImageRootFolder = '/images/enemies_150_150/';

    public static getSkeletonBoss(): EnemyModel {
        return new EnemyBuilder()
            .enemyName("Fallen King")
            .enemyType(EnemyType.BOSS)
            .enemyImgPath(this.bossImageRootFolder + "skeleton_boss.png")
            .enemyBorderFrame('rgb(220,20,60)')
            .build();
    }

}