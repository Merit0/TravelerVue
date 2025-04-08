import { Complexity } from '@/enums/complexity';
import {DungeonModel} from "@/models/DungeonModel";
import {IPosition} from "@/interfaces/el-position-interface";

interface IDungeonBuilder {
    name(name: string): this;
    tilesNumber(num: number): this;
    complexity(complexityLevel: Complexity): this;
    position(position: IPosition): this;
    build(): DungeonModel;
}

export class DungeonBuilder implements IDungeonBuilder {
    private _dungeon: DungeonModel;

    constructor() {
        this.reset();
    }

    private reset(): void {
        this._dungeon = new DungeonModel();
    }

    public name(name: string): this {
        this._dungeon.name = name;
        return this;
    }

    public tilesNumber(num: number): this {
        this._dungeon.tilesNumber = num;
        return this;
    }

    public complexity(complexityLevel: Complexity): this {
        this._dungeon.complexity = complexityLevel;
        return this;
    }

    public position(position: IPosition): this {
        this._dungeon.position = position;
        return this;
    }

    public build(): DungeonModel {
        const createdMap = this._dungeon;
        this.reset();
        return createdMap;
    }

}