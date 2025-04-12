import {Complexity} from '@/enums/complexity';
import {MapLocationModel} from "@/models/map-location-model";
import {IPosition} from "@/interfaces/el-position-interface";

interface IMapLocationBuilder {
    name(name: string): this;
    tilesNumber(num: number): this;
    endPoint(endPointPath: string): this;
    complexity(complexityLevel: Complexity): this;
    position(position: IPosition): this;
    build(): MapLocationModel;
}

export class MapLocationBuilder implements IMapLocationBuilder {
    private _mapLocation: MapLocationModel;

    constructor() {
        this.reset();
    }

    private reset(): void {
        this._mapLocation = new MapLocationModel();
    }

    public name(name: string): this {
        this._mapLocation.name = name;
        return this;
    }

    public tilesNumber(num: number): this {
        this._mapLocation.tilesNumber = num;
        return this;
    }

    public complexity(complexityLevel: Complexity): this {
        this._mapLocation.complexity = complexityLevel;
        return this;
    }

    public position(position: IPosition): this {
        this._mapLocation.position = position;
        return this;
    }

    public endPoint(endPointPath: string): this {
        this._mapLocation.endPoint = endPointPath;
        return this;
    }

    public build(): MapLocationModel {
        const createdMap = this._mapLocation;
        this.reset();
        return createdMap;
    }

}