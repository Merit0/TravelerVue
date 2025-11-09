import {MapLocationBuilder} from "@/a-game-scenes/location-scene/builders/map-location-builder";
import {Complexity} from "@/enums/complexity";
import {BossProvider} from "@/providers/boss-provider";
import EnemyModel from "@/models/EnemyModel";
import {MapLocationModel} from "@/a-game-scenes/location-scene/models/map-location-model";
import {SkeletonProvider} from "@/providers/creatures-provider/skeleton-provider";
import {HumanProvider} from "@/providers/creatures-provider/human-provider";
import {AnimalProvider} from "@/providers/creatures-provider/animal-provider";

export class MapLocationProvider {
    private static readonly LOCATION_CONTENT_IMAGES_PATH = '/src/a-game-scenes/location-scene/assets/'

    static getSilesiaLocations(): MapLocationModel[] {
        const mapLocationsList: MapLocationModel[] = [];
        const mapLocations: {
            name: string,
            backgroundImagePath: string,
            tileImage: string,
            tileBackground: string,
            endPoint: string,
            boss: EnemyModel,
            enemies: EnemyModel[],
            enemiesStatsModifier: number,
            withCamping: boolean,
            tilesSchema: { rows: number, columns: number },
            heroStartPointTileIndex: number,
        }[] = [
            {
                name: 'Camping Forest',
                backgroundImagePath: `${this.LOCATION_CONTENT_IMAGES_PATH}tiles-grid-background.png`,
                tileImage: `${this.LOCATION_CONTENT_IMAGES_PATH}forest-tile-image.png`,
                tileBackground: `${this.LOCATION_CONTENT_IMAGES_PATH}ground-tile-background.png`,
                endPoint: 'forest',
                boss: BossProvider.getThiefBoss(),
                enemies: [ ...HumanProvider.getThieves(), AnimalProvider.getPig()],
                enemiesStatsModifier: 0,
                withCamping: true,
                tilesSchema: {rows: 7, columns: 13},
                heroStartPointTileIndex: 47
            }
        ];
        mapLocations.forEach((mapLocation: {
            name: string,
            backgroundImagePath: string,
            chestImage: string,
            tileImage: string,
            tileBackground: string,
            endPoint: string,
            enemiesStatsModifier: number,
            boss: EnemyModel,
            enemies: EnemyModel[],
            withCamping: boolean,
            tilesSchema: { rows: number, columns: number },
            heroStartPointTileIndex: number,
        }) => {
            mapLocationsList.push(new MapLocationBuilder()
                .name(mapLocation.name)
                .tilesNumber(56)
                .complexity(Complexity.EASY)
                .tilesGridBackgroundImagePath(mapLocation.backgroundImagePath)
                .tileImage(mapLocation.tileImage)
                .tileBackground(mapLocation.tileBackground)
                .endPoint(mapLocation.endPoint)
                .boss(mapLocation.boss)
                .enemiesStatsModifier(mapLocation.enemiesStatsModifier)
                .withCamping(mapLocation.withCamping)
                .mapTilesSchema(mapLocation.tilesSchema)
                .startPointTileIndex(mapLocation.heroStartPointTileIndex)
                .enemies(mapLocation.enemies)
                .build())
        });
        return mapLocationsList;
    }

    static getDungeonLocations(): MapLocationModel[] {
        const dungeonMapsList: MapLocationModel[] = [];
        const dungeonMaps: {
            name: string,
            backgroundImagePath: string,
            tileImage: string,
            tileBackground: string,
            endPoint: string,
            boss: EnemyModel,
            enemiesStatsModifier: number
            withCamping: boolean,
            tilesSchema: { rows: number, columns: number },
            heroStartPointTileIndex: number,
            enemies: EnemyModel[],
        }[] = [
            {
                name: 'Fallen Bones',
                backgroundImagePath: `${this.LOCATION_CONTENT_IMAGES_PATH}dungeon-tiles-grid-background.png`,
                tileImage: `${this.LOCATION_CONTENT_IMAGES_PATH}bones-tile-image.png`,
                tileBackground: `${this.LOCATION_CONTENT_IMAGES_PATH}underground-tile-background.png`,
                endPoint: 'fallen-bones',
                boss: BossProvider.getSkeletonBoss(),
                enemies: SkeletonProvider.getSkeletons(),
                enemiesStatsModifier: 2,
                withCamping: false,
                tilesSchema: {rows: 7, columns: 7},
                heroStartPointTileIndex: 1
            }
        ];
        dungeonMaps.forEach((mapLocation: {
            name: string,
            backgroundImagePath: string,
            chestImage: string,
            tileImage: string,
            tileBackground: string,
            endPoint: string,
            enemiesStatsModifier: number
            boss: EnemyModel,
            enemies: EnemyModel[],
            dungeonName: string,
            withCamping: boolean,
            heroStartPointTileIndex: number,
            tilesSchema: { rows: number, columns: number },

        }) => {
            dungeonMapsList.push(new MapLocationBuilder()
                .name(mapLocation.name)
                .tilesNumber(56)
                .complexity(Complexity.EASY)
                .tilesGridBackgroundImagePath(mapLocation.backgroundImagePath)
                .tileImage(mapLocation.tileImage)
                .tileBackground(mapLocation.tileBackground)
                .endPoint(mapLocation.endPoint)
                .boss(mapLocation.boss)
                .enemiesStatsModifier(mapLocation.enemiesStatsModifier)
                .dungeonName(mapLocation.dungeonName)
                .withCamping(mapLocation.withCamping)
                .mapTilesSchema(mapLocation.tilesSchema)
                .startPointTileIndex(mapLocation.heroStartPointTileIndex)
                .enemies(mapLocation.enemies)
                .build())
        });
        return dungeonMapsList;
    }
}