import EnemyModel from '../models/EnemyModel';
import { EnemyType } from '../enums/EnemyType';
export class EnemyBuilder {

    private enemy: EnemyModel = new EnemyModel();

    public enemyName(name: string): EnemyBuilder {
        this.enemy.setName(name);
        return this;
    }

    public enemyType(enemyType: EnemyType): EnemyBuilder {
        this.enemy.setEnemyType(enemyType);
        return this;
    }

    public enemyImgPath(path: string): EnemyBuilder {
        this.enemy.setImage(path);
        return this;
    }

    public enemyBorderFrame(frameColor: string): EnemyBuilder {
        this.enemy.setEnemyFrameColor(frameColor);
        return this;
    }

    public build(): EnemyModel {
        this.enemy.generateAttack();
        this.enemy.generateHealth();
        return this.enemy;
    }
}