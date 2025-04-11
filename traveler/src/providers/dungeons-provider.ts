import {DungeonModel} from "@/models/map-location-model";
import {MapLocationBuilder} from "@/builders/map-location-builder";
import {Randomizer} from "@/utils/Randomizer";
import {Complexity} from "@/enums/complexity";
import {IPosition} from "@/interfaces/el-position-interface";

export class DungeonProvider {
    static getOldForestDungeons(): DungeonModel[] {
        const dungeonsList: DungeonModel[] = [];
        const dungeons: { name: string, position: IPosition }[] = [
            {
                name: 'Forest Entrance',
                position: {
                    top: "15%",
                    left: "35%"
                }
            },
            {
                name: 'Mountain Hill',
                position: {
                    top: "30%",
                    left: "65%"
                }
            },
            {
                name: 'Forest Peak',
                position: {
                    top: "45%",
                    left: "20%"
                }
            },
            {
                name: 'Forest Cave',
                position: {
                    top: "62%",
                    left: "58%"
                }
            },
            {
                name: 'Forest Entrance',
                position: {
                    top: "90%",
                    left: "40%"
                }
            }
        ];
        dungeons.forEach((dungeon: { name: string, position: IPosition }) => {
            dungeonsList.push(new MapLocationBuilder()
                .name(dungeon.name)
                .tilesNumber(Randomizer.getRandomIntInRange(20, 39))
                .complexity(Complexity.EASY)
                .position(dungeon.position)
                .build())
        });
        return dungeonsList;
    }
}