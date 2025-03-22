import MapModel from '../models/MapModel';
import { MapBuilder } from '@/builders/MapBuilder';
import { MapComplexity } from '@/enums/MapComplexity';
export class MapProvider {

    static getOldForest(): MapModel {
        return new MapBuilder()
            .tilesNumber(40)
            .mapName("Old Forest")
            .complexity(MapComplexity.EASY)
            .build();
    }
}