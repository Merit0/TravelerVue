import {Complexity} from "@/enums/complexity";
import {IHero} from "@/abstraction/IHero";
import {v4 as uuid} from "uuid";
import {IPosition} from "@/interfaces/el-position-interface";

export interface IMapLocation {
    readonly name: string;
    readonly tilesNumber: number;
    readonly uuid: string;
    readonly complexity: Complexity;
    readonly hero: IHero;
    readonly position: IPosition
    readonly imgPath: string;
}

export class MapLocationModel implements IMapLocation {
    private _dungeonName: string;
    private _tilesNumber: number;
    private readonly _id: string;
    private _imgPath: string;
    private _complexity: Complexity;
    private _position: IPosition;

    private _hero: IHero;

    constructor() {
        this._id = uuid();
    }

    get uuid(): string {
        return this._id;
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

    get hero(): IHero {
        return this._hero;
    }

    set hero(hero: IHero) {
        this._hero = hero;
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
}
