import MapModel from '../models/MapModel';
import { MapBuilder } from '../builders/MapBuilder';
import { MapComplexity } from '../enums/MapComplexity';
export class MapProvider {

    static getEvilLand(): MapModel {
        return MapBuilder
            .tilesNumber(52)
            .mapName("EvilLand")
            .complexity(MapComplexity.EASY)
            .build();
    }
}