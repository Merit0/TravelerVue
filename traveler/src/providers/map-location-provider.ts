import {MapLocationModel} from "@/models/map-location-model";
import {MapLocationBuilder} from "@/builders/map-location-builder";
import {Randomizer} from "@/utils/Randomizer";
import {Complexity} from "@/enums/complexity";
import {IPosition} from "@/interfaces/el-position-interface";

export class MapLocationProvider {
    static getOldForestLocations(): MapLocationModel[] {
        const mapLocationsList: MapLocationModel[] = [];
        const mapLocations: {
            name: string,
            backgroundImagePath: string
            endPoint: string,
            position: IPosition
        }[] = [
            {
                name: 'Forest Entrance',
                backgroundImagePath: '/images/map-location/old-forest-location/tiles-grid-background/tiles-grid-background-forest-entrance.png',
                endPoint: 'forest-entrance',
                position: {
                    top: "15%",
                    left: "35%"
                }
            },
            {
                name: 'Mountain Hill',
                backgroundImagePath: '',
                endPoint: 'mountain-hill',
                position: {
                    top: "30%",
                    left: "65%"
                }
            },
            {
                name: 'Forest Peak',
                backgroundImagePath: '',
                endPoint: 'forest-peak',
                position: {
                    top: "45%",
                    left: "20%"
                }
            },
            {
                name: 'Forest Cave',
                backgroundImagePath: '',
                endPoint: 'forest-cave',
                position: {
                    top: "62%",
                    left: "58%"
                }
            },
            {
                name: 'Forest Shadows',
                backgroundImagePath: '',
                endPoint: 'forest-shadows',
                position: {
                    top: "90%",
                    left: "40%"
                }
            }
        ];
        mapLocations.forEach((mapLocation: { name: string, backgroundImagePath: string, endPoint: string, position: IPosition }) => {
            mapLocationsList.push(new MapLocationBuilder()
                .name(mapLocation.name)
                .tilesNumber(90)
                .complexity(Complexity.EASY)
                .position(mapLocation.position)
                .tilesGridBackgroundImagePath(mapLocation.backgroundImagePath)
                .endPoint(mapLocation.endPoint)
                .build())
        });
        return mapLocationsList;
    }
}