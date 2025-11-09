import EnemyModel from "@/models/EnemyModel";
import {EnemyBuilder} from "@/builders/EnemyBuilder";
import {EnemyType} from "@/enums/EnemyType";

export class SkeletonProvider {
    private static skeletonsImageRootFolder = '/images/creatures_500_500/skeletons';

    public static getSkeleton(): EnemyModel {
        return new EnemyBuilder()
            .enemyName('Skeleton')
            .enemyType(EnemyType.WARRIOR)
            .enemyImgPath(`${this.skeletonsImageRootFolder}/skeleton.png`)
            .build();
    }

    public static getSkeletons(): EnemyModel[] {
        return Array.of(
            this.getSkeleton(),
        );
    }
}
