import {MapLocationModel} from "@/models/map-location-model";
import {MapLocationBuilder} from "@/builders/map-location-builder";
import {Complexity} from "@/enums/complexity";
import {IPosition} from "@/interfaces/el-position-interface";

export class MapLocationProvider {
    static getOldForestLocations(): MapLocationModel[] {
        const mapLocationsList: MapLocationModel[] = [];
        const mapLocations: {
            name: string,
            backgroundImagePath: string,
            chestImage: string,
            initialTileImageImage: string,
            endPoint: string,
            position: IPosition,
        }[] = [
            {
                name: 'Forest Entrance',
                backgroundImagePath: '/images/map-location/old-forest-location/tiles-grid-background/tiles-grid-background.png',
                chestImage: '/images/chests/map_chest.png',
                initialTileImageImage: '/images/map-location/tree-tile-image.png',
                endPoint: 'forest-entrance',
                position: {
                    top: "15%",
                    left: "35%"
                }
            },
            {
                name: 'Mountain Hill',
                backgroundImagePath: '',
                chestImage: '/images/chests/map_chest.png',
                initialTileImageImage: '/images/maps/lost-forest/tree-tile.png',
                endPoint: 'mountain-hill',
                position: {
                    top: "30%",
                    left: "65%"
                }
            },
            {
                name: 'Forest Peak',
                backgroundImagePath: '',
                chestImage: '/images/chests/map_chest.png',
                initialTileImageImage: '/images/maps/lost-forest/tree-tile.png',
                endPoint: 'forest-peak',
                position: {
                    top: "45%",
                    left: "20%"
                }
            },
            {
                name: 'Forest Cave',
                backgroundImagePath: '',
                chestImage: '/images/chests/map_chest.png',
                initialTileImageImage: '/images/maps/lost-forest/tree-tile.png',
                endPoint: 'forest-cave',
                position: {
                    top: "62%",
                    left: "58%"
                }
            },
            {
                name: 'Forest Shadows',
                backgroundImagePath: '',
                chestImage: '/images/chests/map_chest.png',
                initialTileImageImage: '/images/maps/lost-forest/tree-tile.png',
                endPoint: 'forest-shadows',
                position: {
                    top: "90%",
                    left: "40%"
                }
            }
        ];
        mapLocations.forEach((mapLocation: {
            name: string,
            backgroundImagePath: string,
            chestImage: string,
            initialTileImageImage: string,
            endPoint: string,
            position: IPosition
        }) => {
            mapLocationsList.push(new MapLocationBuilder()
                .name(mapLocation.name)
                .tilesNumber(90)
                .complexity(Complexity.EASY)
                .position(mapLocation.position)
                .tilesGridBackgroundImagePath(mapLocation.backgroundImagePath)
                .chestImage(mapLocation.chestImage)
                .initialTileImageImage(mapLocation.initialTileImageImage)
                .endPoint(mapLocation.endPoint)
                .build())
        });
        return mapLocationsList;
    }
}