import {ChestModel} from "./ChestModel";
import EnemyModel from "./EnemyModel";
import {HeroModel} from "./HeroModel";

export interface ICoordinates {
    x: number;
    y: number;
}

export interface ITile {
    id: number;
    enemies: EnemyModel[];
    isInitial: boolean;
    inBattle: boolean;
    isCamping: boolean;
    imageSrc: string;
    backgroundSrc: string;
    hero?: HeroModel;
    chest?: ChestModel;
    coordinates: ICoordinates;
    isReachable: boolean;
    isHeroHere: boolean;
    isEnemyHere: boolean;
    isBlocked: boolean;
    isChestTile: boolean;
}

export class TileModel implements ITile {
    id: number;
    enemies: EnemyModel[] = [];
    imageSrc = '';
    backgroundSrc = '';
    isInitial = false;
    isCamping = false;
    inBattle = false;
    hero?: HeroModel;
    chest?: ChestModel;
    coordinates: ICoordinates;
    isReachable = false;
    isHeroHere = false;
    isEnemyHere = false;
    isBlocked = false;
    isChestTile = false;

    constructor(id: number, coordinates: ICoordinates) {
        this.id = id;
        this.coordinates = coordinates;
    }

    setImageSrc(path: string) {
        this.imageSrc = path;
    }

    setBackgroundSrc(path: string) {
        this.backgroundSrc = path;
    }

    setIsInitial(status: boolean) {
        this.isInitial = status;
    }

    setEnemies(enemies: EnemyModel[]) {
        this.enemies = enemies;
    }

    setChest(chest: ChestModel) {
        this.isChestTile = true;
        this.chest = chest;
    }

    setHero(hero: HeroModel) {
        this.hero = hero;
    }

    get isEmpty(): boolean {
        console.log(`🟡 [DEBUG] isEmpty called for tile ${this.id}`, {
            hero: this.isHeroHere,
            enemy: this.isEnemyHere,
            chest: this.isChestTile,
            initial: this.isInitial,
        });
        return !this.isHeroHere &&
            !this.isEnemyHere &&
            !this.isChestTile &&
            !this.isInitial;
    }

    static mapToModel(data: any): TileModel {
        const tile = new TileModel(data.id, data.coordinates);
        Object.assign(tile, data);

        if (Array.isArray(data.enemies)) {
            console.log('data.enemies is aaray')
            tile.enemies = data.enemies.map((e: any) => EnemyModel.mapToModel(e));
        }

        return tile;
    }
}

export default TileModel;
