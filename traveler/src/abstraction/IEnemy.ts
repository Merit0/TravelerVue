import { DropChestModel } from '@/models/DropChestModel';
import { EnemyType } from '../enums/EnemyType';

export interface IEnemy {
    name: string;
    health: number;
    maxHealth: number;
    minHealth: number;
    attack: number;
    defence: number;
    id: number;
    type: EnemyType;
    chest: DropChestModel;
    imgPath: string
}