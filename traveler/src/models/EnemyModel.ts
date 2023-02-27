import { EnemyType } from '@/enums/EnemyType';
import { IEnemy } from '../abstraction/IEnemy';
import { DropChestModel } from './DropChestModel';
export default class EnemyModel implements IEnemy {

    name: string;
    type: EnemyType;
    health: number;
    attack: number;
    defence: number;
    id: number;
    chest: DropChestModel;

}