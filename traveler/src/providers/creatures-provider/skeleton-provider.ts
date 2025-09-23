import EnemyModel from "@/models/EnemyModel";
import {EnemyBuilder} from "@/builders/EnemyBuilder";
import {EnemyType} from "@/enums/EnemyType";

export class SkeletonProvider {
    private static skeletonsImageRootFolder = '/images/creatures_500_500/skeletons';

    public static getSkeletor(): EnemyModel {
        return new EnemyBuilder()
            .enemyName('Skeletor')
            .enemyType(EnemyType.WARRIOR)
            .enemyImgPath(`${this.skeletonsImageRootFolder}/skeletor.png`)
            .build();
    }
    public static getBossSkeleton(): EnemyModel {
        return new EnemyBuilder()
            .enemyName('Bone Caster')
            .enemyType(EnemyType.BOSS)
            .enemyImgPath(`${this.skeletonsImageRootFolder}/boss-skeleton.png`)
            .build();
    }

    public static getSkeletons(): EnemyModel[] {
        return Array.of(
            this.getSkeletor(),
        );
    }
}
