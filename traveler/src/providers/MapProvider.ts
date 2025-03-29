import MapModel from '../models/MapModel';
import {MapBuilder} from '@/builders/MapBuilder';
import {Complexity} from '@/enums/complexity';
import {DungeonProvider} from "@/providers/dungeons-provider";

export class MapProvider {

    static getOldForest(): MapModel {
        return new MapBuilder()
            .name("Old Forest")
            .dungeons(DungeonProvider.getOldForestDungeons())
            .complexity(Complexity.EASY)
            .build();
    }
}