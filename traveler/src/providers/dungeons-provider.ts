import {DungeonModel} from "@/models/DungeonModel";
import {DungeonBuilder} from "@/builders/dungeon-builder";
import {Randomizer} from "@/utils/Randomizer";
import {Complexity} from "@/enums/complexity";

export class DungeonProvider {
    static getOldForestDungeons(): DungeonModel[] {
        const dungeonsList: DungeonModel[] = [];
        const names: string[] = ['Forest Entrance', 'Forest road', 'Forest River', 'Forest River'];
        names.forEach(name => {
            dungeonsList.push(new DungeonBuilder()
                .name(name)
                .tilesNumber(Randomizer.getRandomIntInRange(20, 39))
                .complexity(Complexity.EASY)
                .build())
        });
        return dungeonsList;
    }
}