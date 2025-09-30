import MapModel from '../models/map-model';
import {MapBuilder} from '@/a-game-scenes/silesia-world-scene/builders/map-builder';
import {Complexity} from '@/enums/complexity';
import {MapLocationProvider} from "@/a-game-scenes/location-scene/providers/map-location-provider";

export class MapProvider {
    static getSilesiaMap(): MapModel {
        return new MapBuilder()
            .name("Silesia")
            .mapLocations(MapLocationProvider.getSilesiaLocations())
            .complexity(Complexity.EASY)
            .isLocked(false)
            .build();
    }
}