import MapModel from '../models/MapModel';
import { MapBuilder } from '../builders/MapBuilder';
import { MapComplexity } from '../enums/MapComplexity';
export class MapProvider {

    static getEvilLand(): MapModel {
        return new MapBuilder()
            .tilesNumber(40)
            .mapName("EvilLand")
            .complexity(MapComplexity.EASY)
            .build();
    }
}