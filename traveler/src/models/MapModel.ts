import {DungeonModel} from "@/models/DungeonModel";

import {Complexity} from "@/enums/complexity";
import {v4 as uuid} from "uuid";

interface IMap {
    readonly name: string;
    readonly dungeons: DungeonModel[];
    readonly uuid: string;
    readonly complexity: Complexity;
    readonly imgPath: string;
    readonly isLocked: boolean;
}

export class MapModel implements IMap {
    private _mapName: string;
    private _imgPath: string;
    private _dungeonsList: DungeonModel[];
    private readonly _mapId: string;
    private _mapComplexity: Complexity;
    private _isLocked: boolean;

    constructor() {
        this._mapId = uuid();
    }

    get uuid(): string {
        return this._mapId
    }

    get name(): string {
        return this._mapName;
    }

    set name(mapName: string) {
        this._mapName = mapName;
    }

    get imgPath(): string {
        return this._imgPath;
    }

    set imgPath(path: string) {
        this._imgPath = path;
    }

    get dungeons(): DungeonModel[] {
        return this._dungeonsList;
    }

    setDungeons(dungeons: DungeonModel[]) {
        this._dungeonsList = dungeons;
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