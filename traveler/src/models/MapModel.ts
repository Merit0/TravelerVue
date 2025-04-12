import {MapLocationModel} from "@/models/map-location-model";

import {Complexity} from "@/enums/complexity";
import {v4 as uuid} from "uuid";

interface IMap {
    readonly name: string;
    readonly mapLocations: MapLocationModel[];
    readonly uuid: string;
    readonly complexity: Complexity;
    readonly imgPath: string;
    readonly isLocked: boolean;
}

export class MapModel implements IMap {
    private _mapName: string;
    private _imgPath: string;
    private _mapLocationsList: MapLocationModel[];
    private readonly _mapId: string;
    private _mapComplexity: Complexity;
    private _isLocked: boolean;

    constructor() {
        this._mapId = uuid();
    }

    public get uuid(): string {
        return this._mapId
    }

    public get name(): string {
        return this._mapName;
    }

    set name(mapName: string) {
        this._mapName = mapName;
    }

    public get imgPath(): string {
        return this._imgPath;
    }

    set imgPath(path: string) {
        this._imgPath = path;
    }

    public get mapLocations(): MapLocationModel[] {
        return this._mapLocationsList;
    }

    set mapLocations(locations: MapLocationModel[]) {
        this._mapLocationsList = locations;
    }

    get complexity(): Complexity {
        return this._mapComplexity;
    }

    set complexity(complexity: Complexity) {
        this._mapComplexity = complexity;
    }

    get isLocked(): boolean {
        return this._isLocked;
    }

    set isLocked(isLocked: boolean) {
        this._isLocked = isLocked;
    }
}

export default MapModel;