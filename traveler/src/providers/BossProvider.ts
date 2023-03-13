import { EnemyBuilder } from "@/builders/EnemyBuilder";
import { EnemyType } from "@/enums/EnemyType";
import EnemyModel from "@/models/EnemyModel";

export class BossProvider {

    public static getSkeletonBoss(): EnemyModel {
        return new EnemyBuilder()
            .enemyName("Fallen King")
            .enemyType(EnemyType.BOSS)
            .enemyImgPath("enemies_150_150/skeleton_boss.png")
            .enemyBorderFrame('rgb(220,20,60)')
            .build();
    }

}