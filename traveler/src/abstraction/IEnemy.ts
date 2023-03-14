import { EnemyType } from '../enums/EnemyType';
import { LootItemModel } from '../models/LootItemModel';

export interface IEnemy {
    name: string;
    health: number;
    maxHealth: number;
    minHealth: number;
    attack: number;
    defence: number;
    id: number;
    enemyType: EnemyType;
    imgPath: string
    loot: LootItemModel;
}