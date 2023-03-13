import EnemyModel from '../models/EnemyModel';
import { EnemyType } from '../enums/EnemyType';

interface IEnemyBuilder {
    enemyName(name: string): void;
    enemyType(enemyType: EnemyType): void;
    enemyImgPath(imgPath: string): void;
    enemyBorderFrame(frameColor: string): void;
}

export class EnemyBuilder implements IEnemyBuilder {

    private enemy: EnemyModel;

    constructor() {
        this.reset();
    }

    private reset(): void {
        this.enemy = new EnemyModel();
    }

    public enemyName(name: string): EnemyBuilder {
        this.enemy.setName(name);
        return this;
    }

    public enemyType(enemyType: EnemyType): EnemyBuilder {
        this.enemy.setEnemyType(enemyType);
        return this;
    }

    public enemyImgPath(imgPath: string): EnemyBuilder {
        this.enemy.setImage(imgPath);
        return this;
    }

    public enemyBorderFrame(frameColor: string): EnemyBuilder {
        this.enemy.setEnemyFrameColor(frameColor);
        return this;
    }

    public build(): EnemyModel {
        const enemy = this.enemy;
        this.reset();
        enemy.generateAttack();
        enemy.generateHealth();
        return enemy;
    }
}