import {Complexity} from '@/enums/complexity';
import {MapLocationModel} from "@/models/map-location-model";
import {IPosition} from "@/interfaces/el-position-interface";
import {IEnemy} from "@/abstraction/IEnemy";
import EnemyModel from "@/models/EnemyModel";

interface IMapLocationBuilder {
    name(name: string): this;
    tilesNumber(num: number): this;
    tilesGridBackgroundImagePath(imagePath: string): this;
    chestImage(imagePath: string): this;
    tileImage(imagePath: string): this;
    tileBackground(imagePath: string): this;
    endPoint(endPointPath: string): this;
    complexity(complexityLevel: Complexity): this;
    position(position: IPosition): this;
    boss(bossModel: IEnemy): this;
    enemiesStatsModifier(modifierNumber: number): this;
    build(): MapLocationModel;
}

export class MapLocationBuilder implements IMapLocationBuilder {
    private _mapLocation: MapLocationModel;

    constructor() {
        this.reset();
    }

    private reset(): void {
        this._mapLocation = new MapLocationModel();
    }

    public name(name: string): this {
        this._mapLocation.name = name;
        return this;
    }

    public tilesNumber(num: number): this {
        this._mapLocation.tilesNumber = num;
        return this;
    }

    public enemiesStatsModifier(modifierNumber: number): this {
        this._mapLocation.enemyModifier = modifierNumber;
        return this;
    }

    public complexity(complexityLevel: Complexity): this {
        this._mapLocation.complexity = complexityLevel;
        return this;
    }

    public position(position: IPosition): this {
        this._mapLocation.position = position;
        return this;
    }

    public endPoint(endPointPath: string): this {
        this._mapLocation.endPoint = endPointPath;
        return this;
    }

    public tilesGridBackgroundImagePath(imagePath: string): this {
        this._mapLocation.imgPath = imagePath;
        return this;
    }

    public chestImage(imagePath: string): this {
        this._mapLocation.chestImage = imagePath;
        return this;
    }

    public tileImage(imagePath: string): this {
        this._mapLocation.tileImage = imagePath;
        return this;
    }

    public tileBackground(imagePath: string): this {
        this._mapLocation.tileBackgroundSrc = imagePath;
        return this;
    }

    public boss(boseModel: EnemyModel): this {
        this._mapLocation.boss = boseModel;
        return this;
    }

    public build(): MapLocationModel {
        const createdMap = this._mapLocation;
        this.reset();
        return createdMap;
    }

}