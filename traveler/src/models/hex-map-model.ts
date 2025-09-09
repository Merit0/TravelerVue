import {IRegionConfig} from "@/abstraction/region-config-interface";
import {HexTileModel} from "@/models/hex-tile-model";

export class HexMapModel {
    name: string;
    width: number;
    height: number;
    regions: IRegionConfig[];
    tiles: HexTileModel[] = [];

    constructor(name: string, width: number, height: number, regions: IRegionConfig[]) {
        this.name = name;
        this.width = width;
        this.height = height;
        this.regions = regions;
    }
}