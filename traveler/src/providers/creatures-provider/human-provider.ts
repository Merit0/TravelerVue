import EnemyModel from "@/models/EnemyModel";
import {EnemyBuilder} from "@/builders/EnemyBuilder";
import {EnemyType} from "@/enums/EnemyType";

export class HumanProvider {
    private static skeletonsImageRootFolder = '/images/creatures_500_500/humans_500_500';

    public static getThief(): EnemyModel {
        return new EnemyBuilder()
            .enemyName('Thief')
            .enemyType(EnemyType.WARRIOR)
            .enemyImgPath(`${this.skeletonsImageRootFolder}/male-thief-enemy-image.png`)
            .build();
    }

    public static getThieves(): EnemyModel[] {
        return Array.of(
            this.getThief(),
        );
    }
}
