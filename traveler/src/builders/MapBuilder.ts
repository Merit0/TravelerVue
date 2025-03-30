import MapModel from '../models/MapModel';
import {DungeonModel} from "@/models/DungeonModel";
import {Complexity} from "@/enums/complexity";

interface IMapBuilder {
    name(name: string): this;
    dungeons(dungeonsList: DungeonModel[]): this;
    complexity(complexityLevel: Complexity): this;
    isLocked(status: boolean): this;
    imagePath(path: string): this;
}

export class MapBuilder implements IMapBuilder {
    private map: MapModel;

    constructor() {
        this.reset();
    }

    private reset(): void {
        this.map = new MapModel();
    }

    public name(name: string): this {
        this.map.name = name;
        return this;
    }

    public dungeons(dungeonsList: DungeonModel[]): this {
        this.map.setDungeons(dungeonsList);
        return this;
    }

    public complexity(complexityLevel: Complexity): this {
        this.map.complexity = complexityLevel;
        return this;
    }

    public imagePath(path: string): this {
        this.map.imgPath = path;
        return this;
    }

    public isLocked(status: boolean): this {
        this.map.isLocked = status;
        return this;
    }

    public build(): MapModel {
        const createdMap = this.map;
        this.reset();
        return createdMap;
    }

}