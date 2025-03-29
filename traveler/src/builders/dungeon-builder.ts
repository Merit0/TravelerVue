import { Complexity } from '@/enums/complexity';
import {DungeonModel} from "@/models/DungeonModel";

interface IDungeonBuilder {
    name(name: string): DungeonBuilder;
    tilesNumber(num: number): DungeonBuilder;
    complexity(complexityLevel: Complexity): DungeonBuilder;
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

    public build(): DungeonModel {
        const createdMap = this._dungeon;
        this.reset();
        return createdMap;
    }

}