import {DungeonModel} from "@/models/DungeonModel";

import {Complexity} from "@/enums/complexity";
import {v4 as uuid} from "uuid";

interface IMap {
    readonly name: string;
    readonly dungeons: DungeonModel[];
    readonly uuid: string;
    readonly complexity: Complexity;
}

export class MapModel implements IMap {
    private _mapName: string;
    private _dungeonsList: DungeonModel[];
    private readonly _mapId: string;
    private _mapComplexity: Complexity;

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
}

export default MapModel;