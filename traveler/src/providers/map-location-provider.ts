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
            endPoint: string,
            position: IPosition
        }[] = [
            {
                name: 'Forest Entrance',
                endPoint: 'forest-entrance',
                position: {
                    top: "15%",
                    left: "35%"
                }
            },
            {
                name: 'Mountain Hill',
                endPoint: 'mountain-hill',
                position: {
                    top: "30%",
                    left: "65%"
                }
            },
            {
                name: 'Forest Peak',
                endPoint: 'forest-peak',
                position: {
                    top: "45%",
                    left: "20%"
                }
            },
            {
                name: 'Forest Cave',
                endPoint: 'forest-cave',
                position: {
                    top: "62%",
                    left: "58%"
                }
            },
            {
                name: 'Forest Shadows',
                endPoint: 'forest-shadows',
                position: {
                    top: "90%",
                    left: "40%"
                }
            }
        ];
        mapLocations.forEach((mapLocation: { name: string, endPoint: string, position: IPosition }) => {
            mapLocationsList.push(new MapLocationBuilder()
                .name(mapLocation.name)
                .tilesNumber(Randomizer.getRandomIntInRange(20, 39))
                .complexity(Complexity.EASY)
                .position(mapLocation.position)
                .endPoint(mapLocation.endPoint)
                .build())
        });
        return mapLocationsList;
    }
}