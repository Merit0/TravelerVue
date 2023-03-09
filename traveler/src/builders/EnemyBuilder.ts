import EnemyModel from '../models/EnemyModel';
import { EnemyType } from '../enums/EnemyType';
export class EnemyBuilder {

    private enemy: EnemyModel = new EnemyModel().setId(1);

    public enemyName(name: string): EnemyBuilder {
        this.enemy.setName(name);
        return this;
    }

    public enemyType(type: EnemyType): EnemyBuilder {
        this.enemy.setEnemyType(type);
        return this;
    }

    public enemyImgPath(path: string): EnemyBuilder {
        this.enemy.setImage(path);
        return this;
    }

    public build(): EnemyModel {
        return this.enemy;
    }
}