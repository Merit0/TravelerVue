import MapModel from '../models/MapModel';
import { MapComplexity } from '../enums/MapComplexity';

interface IMapBuilder {

    mapName(name: string): MapBuilder;
    tilesNumber(num: number): MapBuilder;
    complexity(complexityLevel: MapComplexity): MapBuilder;

}

export class MapBuilder {

    private map: MapModel;

    constructor() {
        this.reset();
    }

    private reset(): void {
        this.map = new MapModel();
    }

    public mapName(name: string): MapBuilder {
        this.map.setMapName(name);
        return this;
    }

    public tilesNumber(num: number): MapBuilder {
        this.map.setNumberOfTiles(num);
        return this;
    }

    public complexity(complexityLevel: MapComplexity): MapBuilder {
        this.map.setComplexity(complexityLevel);
        return this;
    }

    public build(): MapModel {
        const createdMap = this.map;
        this.reset();
        return createdMap;
    }

}