import MapModel from '../models/MapModel';
import { MapComplexity } from '../enums/MapComplexity';
export class MapBuilder {

    private static map: MapModel = new MapModel();

    public static mapName(name: string): typeof MapBuilder {
        this.map.setMapName(name);
        return this;
    }

    public static tilesNumber(num: number): typeof MapBuilder {
        this.map.setNumberOfTiles(num);
        return this;
    }

    public static complexity(complexityLevel: MapComplexity): typeof MapBuilder {
        this.map.setComplexity(complexityLevel);
        return this;
    }

    public static build(): MapModel {
        return this.map;
    }

}