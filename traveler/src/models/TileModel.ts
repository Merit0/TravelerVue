import {ChestModel} from "./ChestModel";
import EnemyModel from "./EnemyModel";
import {HeroModel} from "./HeroModel";
import {GraveModel} from "@/models/grave-model";
import {LootItemModel} from "@/models/LootItemModel";

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
    grave?: GraveModel;
    coordinates: ICoordinates;
    isReachable: boolean;
    isHeroHere: boolean;
    isEnemyHere: boolean;
    isBlocked: boolean;
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
    grave?: GraveModel;
    coordinates: ICoordinates;
    isReachable = false;
    isHeroHere = false;
    isEnemyHere = false;
    isBlocked = false;
    isGrave = false;

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
        this.isEnemyHere = enemies.some(e => e.health > 0);
    }

    setHero(hero: HeroModel) {
        this.hero = hero;
    }

    get isEmpty(): boolean {
        console.log(`🟡 [DEBUG] isEmpty called for tile ${this.id}`, {
            hero: this.isHeroHere,
            enemy: this.isEnemyHere,
            initial: this.isInitial,
        });
        return !this.isHeroHere &&
            !this.isEnemyHere &&
            !this.isInitial;
    }

    static mapToModel(data: any): TileModel {
        const tile = new TileModel(data.id, data.coordinates);
        Object.assign(tile, data);

        if (Array.isArray(data.enemies)) {
            tile.enemies = data.enemies.map((e: any) => EnemyModel.mapToModel(e));
        }

        if (data.grave) {
            // Відновлюємо grave (якщо треба — можеш додати fromSaved)
            const grave = new GraveModel();
            grave.graveImgPath = data.grave.graveImgPath;

            // Відновлення луту, якщо збережене
            if (Array.isArray(data.grave.graveTreasureItems)) {
                grave.graveTreasureItems = data.grave.graveTreasureItems.map(
                    (i: any) => LootItemModel.mapToModel(i)
                );
            }

            tile.grave = grave;
            tile.isGrave = true;
        }

        return tile;
    }
}

export default TileModel;
