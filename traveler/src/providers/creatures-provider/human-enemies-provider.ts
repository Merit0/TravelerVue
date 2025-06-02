import EnemyModel from "@/models/EnemyModel";
import {EnemyBuilder} from "@/builders/EnemyBuilder";
import {EnemyType} from "@/enums/EnemyType";

export class HumanEnemiesProvider {
    private static humansImageRootFolder = '/images/creatures_500_500/';

    public static getMaleThief(): EnemyModel {
        return new EnemyBuilder()
            .enemyName('Alex')
            .enemyType(EnemyType.WARRIOR)
            .enemyImgPath(`${this.humansImageRootFolder}/humans_500_500/male-thief-enemy-image.png`)
            .build();
    }

    public static getFemaleThief(): EnemyModel {
        return new EnemyBuilder()
            .enemyName('Lora')
            .enemyType(EnemyType.WARRIOR)
            .enemyImgPath(`${this.humansImageRootFolder}/humans_500_500/female-thief-enemy-image.png`)
            .build();
    }

    public static getFemaleBandit(): EnemyModel {
        return new EnemyBuilder()
            .enemyName('Vanessa')
            .enemyType(EnemyType.WARRIOR)
            .enemyImgPath(`${this.humansImageRootFolder}/humans_500_500/female-bandit-enemy-image.png`)
            .build();
    }

    public static getMaleBandit(): EnemyModel {
        return new EnemyBuilder()
            .enemyName('Ikar')
            .enemyType(EnemyType.WARRIOR)
            .enemyImgPath(`${this.humansImageRootFolder}/humans_500_500/male-bandit-enemy-image.png`)
            .build();
    }

    public static getHumansEnemies(): EnemyModel[] {
        return Array.of(
            this.getFemaleThief(),
            this.getFemaleBandit(),
            this.getMaleBandit(),
            this.getMaleThief(),
        );
    }
}
