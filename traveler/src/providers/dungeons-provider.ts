import {DungeonModel} from "@/models/DungeonModel";
import {DungeonBuilder} from "@/builders/dungeon-builder";
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
                    top: "20%",
                    left: "50%"
                }
            },
            {
                name: 'Mountain Hill',
                position: {
                    top: "33%",
                    left: "90%"
                }
            },
            {
                name: 'Forest Peak',
                position: {
                    top: "50%",
                    left: "30%"
                }
            },
            {
                name: 'Forest Cave',
                position: {
                    top: "72%",
                    left: "75%"
                }
            },
            {
                name: 'Forest Entrance',
                position: {
                    top: "95%",
                    left: "60%"
                }
            }
        ];
        dungeons.forEach((dungeon: { name: string, position: IPosition }) => {
            dungeonsList.push(new DungeonBuilder()
                .name(dungeon.name)
                .tilesNumber(Randomizer.getRandomIntInRange(20, 39))
                .complexity(Complexity.EASY)
                .position(dungeon.position)
                .build())
        });
        return dungeonsList;
    }
}