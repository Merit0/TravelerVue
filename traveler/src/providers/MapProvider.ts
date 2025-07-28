import MapModel from '../models/MapModel';
import {MapBuilder} from '@/builders/MapBuilder';
import {Complexity} from '@/enums/complexity';
import {MapLocationProvider} from "@/providers/map-location-provider";

export class MapProvider {
    static getSilesiaMap(): MapModel {
        return new MapBuilder()
            .name("Silesia")
            .imagePath('/images/maps-page/map-1-old-forest.png')
            .mapLocations(MapLocationProvider.getSilesiaLocations())
            .complexity(Complexity.EASY)
            .isLocked(false)
            .build();
    }
}