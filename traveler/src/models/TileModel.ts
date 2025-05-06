import { ChestModel } from "./ChestModel";
import EnemyModel from "./EnemyModel";
import { HeroModel } from "./HeroModel";

export interface ICoordinates {
    x: number;
    y: number;
}

export interface ITile {
    id: number;
    enemies: EnemyModel[];
    isInitial: boolean;
    isEmpty: boolean;
    inBattle: boolean;
    isCamping: boolean;
    imageSrc: string;
    backgroundSrc: string;
    hero?: HeroModel;
    chest?: ChestModel;
    coordinates: ICoordinates;
    isReachable: boolean;
    isHeroHere: boolean;
}

export class TileModel implements ITile {
    id: number;
    enemies: EnemyModel[] = [];
    imageSrc = '';
    backgroundSrc = '';
    isEmpty = false;
    isInitial = false;
    isCamping = false;
    inBattle = false;
    hero?: HeroModel;
    chest?: ChestModel;
    coordinates: ICoordinates;
    isReachable = false;
    isHeroHere = false;
    isExit = false;

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
        this.chest = chest;
    }

    setHero(hero: HeroModel) {
        this.hero = hero;
    }
}

export default TileModel;
