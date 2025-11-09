import { v4 as uuidv4 } from 'uuid';
import { MapLocationModel } from "@/a-game-scenes/location-scene/models/map-location-model";
import {DoorKeyModel} from "@/a-game-scenes/dungeon-scene/door-key-model";

export interface IDungeon {
    dungeonId: string;
    dungeonName: string;
    doorKey: DoorKeyModel;
    dungeonMap: MapLocationModel;
    imagePath: string;
}

export class DungeonModel implements IDungeon {
    private readonly _dungeonId: string;
    private _dungeonName: string;
    private _doorKey: DoorKeyModel;
    private _dungeonMap: MapLocationModel;
    private _imagePath: string;

    constructor({
                    dungeonId = uuidv4(),
                    dungeonName = "Unnamed Dungeon",
                    doorKey,
                    dungeonMap,
                    imageFileName = "default.png"
                }: {
        dungeonId?: string;
        dungeonName?: string;
        doorKey: DoorKeyModel;
        dungeonMap: MapLocationModel;
        imageFileName?: string;
    }) {
        this._dungeonId = dungeonId;
        this._dungeonName = dungeonName;
        this._doorKey = doorKey;
        this._dungeonMap = dungeonMap;
        this._imagePath = `/src/a-game-scenes/location-scene/assets/${imageFileName}`;
    }

    get dungeonId(): string {
        return this._dungeonId;
    }

    get dungeonName(): string {
        return this._dungeonName;
    }

    set dungeonName(value: string) {
        this._dungeonName = value;
    }

    get doorKey(): DoorKeyModel {
        return this._doorKey;
    }

    set doorKey(value: DoorKeyModel) {
        this._doorKey = value;
    }

    get dungeonMap(): MapLocationModel {
        return this._dungeonMap;
    }

    set dungeonMap(value: MapLocationModel) {
        this._dungeonMap = value;
    }

    get imagePath(): string {
        return this._imagePath;
    }

    set imagePath(fileName: string) {
        this._imagePath = `/images/dungeons/${fileName}`;
    }

    toJSON() {
        return {
            dungeonId: this._dungeonId,
            dungeonName: this._dungeonName,
            doorKey: this._doorKey,
            dungeonMap: this._dungeonMap,
            imagePath: this._imagePath,
        };
    }

    static fromJSON(json: any): DungeonModel {
        return new DungeonModel({
            dungeonId: json.dungeonId,
            dungeonName: json.dungeonName,
            doorKey: json.doorKey,
            dungeonMap: json.dungeonMap,
            imageFileName: json.imagePath?.split('/').pop() || "default.png",
        });
    }
}
