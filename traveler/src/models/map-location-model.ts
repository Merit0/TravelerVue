import {Complexity} from "@/enums/complexity";
import {IHero} from "@/abstraction/IHero";
import {v4 as uuid} from "uuid";
import {IPosition} from "@/interfaces/el-position-interface";
import EnemyModel from "@/models/EnemyModel";

export interface IMapLocation {
    readonly name: string;
    readonly tilesNumber: number;
    readonly enemyModifier: number;
    readonly uuid: string;
    readonly complexity: Complexity;
    readonly hero: IHero;
    readonly position: IPosition
    readonly imgPath: string;
    readonly endPoint: string;
    readonly chestImage: string;
    readonly initialTileImage: string;
    readonly boss: EnemyModel;
}

export class MapLocationModel implements IMapLocation {
    private _dungeonName: string;
    private _tilesNumber: number;
    private _enemyModifier: number;
    private readonly _id: string;
    private _imgPath: string;
    private _endPoint: string;
    private _chestImage: string;
    private _initialTileImage: string;
    private _complexity: Complexity;
    private _position: IPosition;
    private _hero: IHero;
    private _bose: EnemyModel;

    constructor() {
        this._id = uuid();
    }

    get uuid(): string {
        return this._id;
    }

    get chestImage(): string {
        return this._chestImage;
    }

    set chestImage(chestImage: string) {
        this._chestImage = chestImage;
    }

    get initialTileImage(): string {
        return this._initialTileImage;
    }

    set initialTileImage(initialTileImagePath: string) {
        this._initialTileImage = initialTileImagePath;
    }

    get name(): string {
        return this._dungeonName;
    }

    set name(name: string) {
        this._dungeonName = name;
    }

    get tilesNumber(): number {
        return this._tilesNumber
    }

    set tilesNumber(numberOfTiles: number) {
        this._tilesNumber = numberOfTiles;
    }

    get enemyModifier(): number {
        return this._enemyModifier
    }

    set enemyModifier(enemyModifier: number) {
        this._enemyModifier = enemyModifier;
    }

    get hero(): IHero {
        return this._hero;
    }

    set hero(hero: IHero) {
        this._hero = hero;
    }

    get boss(): EnemyModel {
        return this._bose;
    }

    set boss(bossModel: EnemyModel) {
        this._bose = bossModel;
    }

    get complexity(): Complexity {
        return this._complexity;
    }

    set complexity(complexityValue: Complexity) {
        this._complexity = complexityValue;
    }

    get position(): IPosition {
        return this._position;
    }

    set position(position: IPosition) {
        this._position = position;
    }

    get imgPath(): string {
        return this._imgPath;
    }

    set imgPath(path: string) {
        this._imgPath = path;
    }

    get endPoint(): string {
        return this._endPoint;
    }

    set endPoint(endPointPath: string) {
        this._endPoint = endPointPath;
    }
}
