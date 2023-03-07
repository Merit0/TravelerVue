import EnemyModel from './EnemyModel';
import { ITile } from '../stores/MapStore';
import { HealPortionModel } from './HealPortionModel';

export class TileModel implements ITile {

    id: number;
    enemies: EnemyModel[];
    item: HealPortionModel;
    isTree: boolean;
    isEmpty: boolean;

    constructor(id: number) {
        this.id = id;
    }

    public getId(): number {
        return this.id;
    }

    public getItem(): HealPortionModel {
        return this.item;
    }

    public isATree(): boolean {
        return this.isTree;
    }

    public setId(id: number): TileModel {
        this.id = id;
        return this;
    }

    public setEnemies(enemies: EnemyModel[]): void {
        this.enemies = enemies;
    }

    public setItem(item: HealPortionModel): void {
        this.item = item;
    }

    public setIsATree(status: boolean): void {
        this.isTree = status;
    }
}

export default TileModel;
