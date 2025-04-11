import MapModel from '../models/MapModel';
import {MapLocationModel} from "@/models/map-location-model";
import {Complexity} from "@/enums/complexity";

interface IMapBuilder {
    name(name: string): this;
    mapLocations(mapLocationsList: MapLocationModel[]): this;
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

    public mapLocations(locationsList: MapLocationModel[]): this {
        this.map.setMapLocations(locationsList);
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