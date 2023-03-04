import EnemyModel from './EnemyModel';
import { ITile } from '../stores/MapStore';

export class TileModel implements ITile {

    id: number;
    enemies: EnemyModel[];
    item: IGameItem;
    isTree: boolean;

    constructor(id: number) {
        this.id = id;
    }

    public getId(): number {
        return this.id;
    }

    public getEnemies(): EnemyModel[] {
        return this.enemies;
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

    public setIsATree(status: boolean): void {
        this.isTree = status;
    }
}

export default TileModel;
