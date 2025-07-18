import {MapLocationModel} from "@/models/map-location-model";
import {MapLocationBuilder} from "@/builders/map-location-builder";
import {Complexity} from "@/enums/complexity";
import {IPosition} from "@/interfaces/el-position-interface";
import {BossProvider} from "@/providers/BossProvider";
import EnemyModel from "@/models/EnemyModel";

export class MapLocationProvider {
    private static readonly CAMPING_MAP_LOCATIONS_IMAGE_PATH = '/images/map-location/camping-map-location/'
    static getSilesiaLocations(): MapLocationModel[] {
        const bosses: EnemyModel[] = BossProvider.getHumansBosses();
        const randIndex = Math.floor(Math.random() * bosses.length);
        const mapLocationsList: MapLocationModel[] = [];
        const mapLocations: {
            name: string,
            backgroundImagePath: string,
            chestImage: string,
            tileImage: string,
            tileBackground: string,
            endPoint: string,
            position: IPosition,
            boss: EnemyModel,
            enemiesStatsModifier: number
        }[] = [
            {
                name: 'Camping Place',
                backgroundImagePath: `${this.CAMPING_MAP_LOCATIONS_IMAGE_PATH}tiles-grid-background/tiles-grid-background.png`,
                chestImage: '/images/chests/map_chest.png',
                tileImage: `${this.CAMPING_MAP_LOCATIONS_IMAGE_PATH}tile-image-500-500/tree-tile-image.png`,
                tileBackground: `${this.CAMPING_MAP_LOCATIONS_IMAGE_PATH}tile-background-500-500/ground-tile-background-2.png`,
                endPoint: 'forest-entrance',
                position: {
                    top: "15%",
                    left: "35%"
                },
                boss: bosses[randIndex],
                enemiesStatsModifier: 0
            },
            // {
            //     name: 'Mountain Hill',
            //     backgroundImagePath: `${this.OLD_FOREST_FILES_PATH}tiles-grid-background/ground-image.png`,
            //     chestImage: '/images/chests/map_chest.png',
            //     tileImage: `${this.OLD_FOREST_FILES_PATH}/tile-image-500-500/tree-tile-image.png`,
            //     tileBackground: `${this.OLD_FOREST_FILES_PATH}tile-background-500-500/ground-tile-background.png`,
            //     endPoint: 'mountain-hill',
            //     position: {
            //         top: "30%",
            //         left: "65%"
            //     },
            //     boss: bosses[randIndex],
            //     enemiesStatsModifier: 1
            // },
            // {
            //     name: 'Forest Peak',
            //     backgroundImagePath: `${this.OLD_FOREST_FILES_PATH}tiles-grid-background/tiles-grid-background.png`,
            //     chestImage: '/images/chests/map_chest.png',
            //     tileImage: `${this.OLD_FOREST_FILES_PATH}tile-image-500-500/tree-image-2.png`,
            //     tileBackground: `${this.OLD_FOREST_FILES_PATH}tile-background-500-500/grass-tile-background-3.png`,
            //     endPoint: 'forest-peak',
            //     position: {
            //         top: "45%",
            //         left: "20%"
            //     },
            //     boss: bosses[randIndex],
            //     enemiesStatsModifier: 2
            // },
            // {
            //     name: 'Forest Cave',
            //     backgroundImagePath: `${this.OLD_FOREST_FILES_PATH}tiles-grid-background/tiles-grid-background.png`,
            //     chestImage: '/images/chests/map_chest.png',
            //     tileImage: `${this.OLD_FOREST_FILES_PATH}tile-image-500-500/tree-image-3.png`,
            //     tileBackground: `${this.OLD_FOREST_FILES_PATH}tile-background-500-500/tile-background-4.png`,
            //     endPoint: 'forest-cave',
            //     position: {
            //         top: "62%",
            //         left: "58%"
            //     },
            //     boss: bosses[randIndex],
            //     enemiesStatsModifier: 3
            // },
            // {
            //     name: 'Forest Shadows',
            //     backgroundImagePath: `${this.OLD_FOREST_FILES_PATH}tiles-grid-background/tiles-grid-background.png`,
            //     chestImage: '/images/chests/map_chest.png',
            //     tileImage: `${this.OLD_FOREST_FILES_PATH}/tile-image-500-500/tree-carbon.png`,
            //     tileBackground: `${this.OLD_FOREST_FILES_PATH}tile-background-500-500/grass-tile-background-2.png`,
            //     endPoint: 'forest-shadows',
            //     position: {
            //         top: "90%",
            //         left: "40%"
            //     },
            //     boss: bosses[randIndex],
            //     enemiesStatsModifier: 4
            // }
        ];
        mapLocations.forEach((mapLocation: {
            name: string,
            backgroundImagePath: string,
            chestImage: string,
            tileImage: string,
            tileBackground: string,
            endPoint: string,
            position: IPosition,
            enemiesStatsModifier: number
            boss: EnemyModel
        }) => {
            mapLocationsList.push(new MapLocationBuilder()
                .name(mapLocation.name)
                .tilesNumber(56)
                .complexity(Complexity.EASY)
                .position(mapLocation.position)
                .tilesGridBackgroundImagePath(mapLocation.backgroundImagePath)
                .chestImage(mapLocation.chestImage)
                .tileImage(mapLocation.tileImage)
                .tileBackground(mapLocation.tileBackground)
                .endPoint(mapLocation.endPoint)
                .boss(mapLocation.boss)
                .enemiesStatsModifier(mapLocation.enemiesStatsModifier)
                .build())
        });
        return mapLocationsList;
    }
}