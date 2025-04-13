import {MapLocationModel} from "@/models/map-location-model";
import {MapLocationBuilder} from "@/builders/map-location-builder";
import {Complexity} from "@/enums/complexity";
import {IPosition} from "@/interfaces/el-position-interface";
import {BossProvider} from "@/providers/BossProvider";
import EnemyModel from "@/models/EnemyModel";

export class MapLocationProvider {
    static getOldForestLocations(): MapLocationModel[] {
        const boss: EnemyModel = BossProvider.getSkeletonBoss();
        const mapLocationsList: MapLocationModel[] = [];
        const mapLocations: {
            name: string,
            backgroundImagePath: string,
            chestImage: string,
            initialTileImageImage: string,
            endPoint: string,
            position: IPosition,
            boss: EnemyModel,
            enemiesStatsModifier: number
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
                },
                boss: boss,
                enemiesStatsModifier: 1
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
                },
                boss: boss,
                enemiesStatsModifier: 2
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
                },
                boss: boss,
                enemiesStatsModifier: 3
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
                },
                boss: boss,
                enemiesStatsModifier: 4
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
                },
                boss: boss,
                enemiesStatsModifier: 5
            }
        ];
        mapLocations.forEach((mapLocation: {
            name: string,
            backgroundImagePath: string,
            chestImage: string,
            initialTileImageImage: string,
            endPoint: string,
            position: IPosition,
            enemiesStatsModifier: number
            boss: EnemyModel
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
                .boss(mapLocation.boss)
                .enemiesStatsModifier(mapLocation.enemiesStatsModifier)
                .build())
        });
        return mapLocationsList;
    }
}