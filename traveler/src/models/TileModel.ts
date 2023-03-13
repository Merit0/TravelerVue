import EnemyModel from './EnemyModel';
import { HealPortionModel } from './HealPortionModel';
import { HeroModel } from './HeroModel';

export interface ITile {
    id: number;
    enemies: EnemyModel[];
    item: HealPortionModel;
    isTree: boolean;
    isEmpty: boolean;
    inBattle: boolean;
    hero: HeroModel;
}

export class TileModel implements ITile {

    id: number;
    enemies: EnemyModel[] = [];
    item: HealPortionModel;
    isTree: boolean;
    isEmpty: boolean;
    inBattle: boolean;
    hero: HeroModel;

    constructor(id: number) {
        this.id = id;
    }

    public getId(): number {
        return this.id;
    }

    public getItem(): HealPortionModel {
        return this.item;
    }

    public getIsEmpty(): boolean {
        return this.isEmpty;
    }

    public getHero(): HeroModel {
        return this.hero;
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

    public setIsEmpty(status: boolean): void {
        this.isEmpty = status;
    }

    public setInBattle(status: boolean): void {
        this.inBattle = status;
    }
}

export default TileModel;
