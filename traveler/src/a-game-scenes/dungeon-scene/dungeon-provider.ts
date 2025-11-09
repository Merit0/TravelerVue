import {DungeonModel} from "@/a-game-scenes/dungeon-scene/dungeon-model";
import {MapLocationModel} from "@/a-game-scenes/location-scene/models/map-location-model";
import {KeyProvider} from "@/a-game-scenes/dungeon-scene/door-key-provider";
import {MapLocationProvider} from "@/a-game-scenes/location-scene/providers/map-location-provider";

export class DungeonProvider {
    static getSkeletonCave(): DungeonModel {
        const skeletonCaveLocation: MapLocationModel = MapLocationProvider.getDungeonLocations().find(
            location => location.name === 'Skeleton Cave'
        );
        return new DungeonModel({
            dungeonName: "Skeleton Cave",
            doorKey: KeyProvider.skeletonBone,
            dungeonMap: skeletonCaveLocation,
            imageFileName: 'dungeon-tile-with-eyes.png',
        });
    }
}