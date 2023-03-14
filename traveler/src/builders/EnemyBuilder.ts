import EnemyModel from '../models/EnemyModel';
import { EnemyType } from '../enums/EnemyType';
import { LootItemModel } from '../models/LootItemModel';

interface IEnemyBuilder {
    enemyName(name: string): EnemyBuilder;
    enemyType(enemyType: EnemyType): EnemyBuilder;
    enemyLoot(enemyLootItem: LootItemModel): EnemyBuilder;
    enemyImgPath(imgPath: string): EnemyBuilder;
    enemyBorderFrame(frameColor: string): EnemyBuilder;
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

    public enemyLoot(enemyLootItem: LootItemModel): EnemyBuilder {
        this.enemy.setLoot(enemyLootItem);
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