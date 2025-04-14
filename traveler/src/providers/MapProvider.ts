import MapModel from '../models/MapModel';
import {MapBuilder} from '@/builders/MapBuilder';
import {Complexity} from '@/enums/complexity';
import {MapLocationProvider} from "@/providers/map-location-provider";

export class MapProvider {
    static getOldForest(): MapModel {
        return new MapBuilder()
            .name("Old Forest")
            .imagePath('/images/maps-page/map-1-old-forest.png')
            .mapLocations(MapLocationProvider.getOldForestLocations())
            .complexity(Complexity.EASY)
            .isLocked(false)
            .build();
    }

    static getEvilTree(): MapModel {
        return new MapBuilder()
            .name("Прокляте Дерево")
            .imagePath('/images/maps-page/map-2-evil-tree.png')
            .mapLocations([])
            .complexity(Complexity.EASY)
            .isLocked(true)
            .build();
    }

    static getMagicCircle(): MapModel {
        return new MapBuilder()
            .name("Магічне Коло")
            .imagePath('/images/maps-page/map-3-magic-circle.png')
            .mapLocations([])
            .complexity(Complexity.EASY)
            .isLocked(true)
            .build();
    }
}