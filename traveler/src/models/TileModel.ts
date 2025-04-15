import {ChestModel} from "./ChestModel";
import EnemyModel from "./EnemyModel";
import {HealPortionModel} from "./HealPortionModel";
import {HeroModel} from "./HeroModel";

export interface ITile {
    id: number;
    enemies: EnemyModel[];
    isInitial: boolean;
    isEmpty: boolean;
    inBattle: boolean;
    isCamping: boolean;
    imageSrc: string;
    backgroundSrc: string;
    hero: HeroModel;
    chest: ChestModel;
}

export class TileModel implements ITile {
    id: number;
    enemies: EnemyModel[] = [];
    item: HealPortionModel;
    imageSrc: string;
    backgroundSrc: string;
    isEmpty: boolean;
    isInitial: boolean;
    isCamping: boolean;
    inBattle: boolean;
    hero: HeroModel;
    chest: ChestModel;

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

    public getChest(): ChestModel {
        return this.chest;
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

    public setIsInitial(status: boolean) {
        this.isInitial = status;
    }

    public setIsCamping(status: boolean) {
        this.isCamping = status;
    }

    public setImageSrc(imageSrcPath: string) {
        this.imageSrc = imageSrcPath;
    }

    public setBackgroundSrc(imageSrcPath: string) {
        this.backgroundSrc = imageSrcPath;
    }

    public setInBattle(status: boolean): void {
        this.inBattle = status;
    }

    public setChest(chest: ChestModel): void {
        this.chest = chest;
    }
}

export default TileModel;
