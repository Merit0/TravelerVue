import {MapLocationBuilder} from "@/a-game-scenes/location-scene/builders/map-location-builder";
import {Complexity} from "@/enums/complexity";
import {BossProvider} from "@/providers/BossProvider";
import EnemyModel from "@/models/EnemyModel";
import {MapLocationModel} from "@/a-game-scenes/location-scene/models/map-location-model";

export class MapLocationProvider {
    private static readonly LOCATION_CONTENT_IMAGES_PATH = '/src/a-game-scenes/location-scene/assets/'
    static getSilesiaLocations(): MapLocationModel[] {
        const bosses: EnemyModel[] = BossProvider.getHumansBosses();
        const randIndex = Math.floor(Math.random() * bosses.length);
        const mapLocationsList: MapLocationModel[] = [];
        const mapLocations: {
            name: string,
            backgroundImagePath: string,
            tileImage: string,
            tileBackground: string,
            endPoint: string,
            boss: EnemyModel,
            enemiesStatsModifier: number
        }[] = [
            {
                name: 'Forest',
                backgroundImagePath: `${this.LOCATION_CONTENT_IMAGES_PATH}tiles-grid-background.png`,
                tileImage: `${this.LOCATION_CONTENT_IMAGES_PATH}tree-tile-image.png`,
                tileBackground: `${this.LOCATION_CONTENT_IMAGES_PATH}ground-tile-background.png`,
                endPoint: 'forest',
                boss: bosses[randIndex],
                enemiesStatsModifier: 0
            }
        ];
        mapLocations.forEach((mapLocation: {
            name: string,
            backgroundImagePath: string,
            chestImage: string,
            tileImage: string,
            tileBackground: string,
            endPoint: string,
            enemiesStatsModifier: number
            boss: EnemyModel
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
                .build())
        });
        return mapLocationsList;
    }
}