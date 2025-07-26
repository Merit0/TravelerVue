import {TerrainType} from "@/abstraction/IRegionConfig";

export class HexTileModel {
    q: number;
    r: number;
    isBlocked: boolean;
    terrain: TerrainType;
    imagePath: string;
    regionKey?: string;
    name?: string;

    constructor(q: number, r: number) {
        this.q = q;
        this.r = r;
        this.isBlocked = true;
        this.terrain = 'no-terrain';
        this.imagePath = '';
    }

    setTerrain(type: TerrainType, imagePath: string, regionKey?: string, name?: string) {
        this.terrain = type;
        this.imagePath = imagePath;
        this.regionKey = regionKey;
        if (name) this.name = name;
    }

    get id(): string {
        return `${this.q},${this.r}`;
    }
}
