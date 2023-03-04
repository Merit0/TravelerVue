import { defineStore, storeToRefs } from "pinia";
import TileModel from "@/models/TileModel";
import EnemyModel from "@/models/EnemyModel";

export interface ITile {
    id: number;
    enemies: EnemyModel[];
    item: IGameItem;
    isTree: boolean;
}

export const useMapStore = defineStore("map", {
    state: () => {
        return {
            map: null,
            tiles: [],
            tile: null
        };
    },

    getters: {
        countTiles: (state) => state.tiles.length,
        showTiles: (state) => {
            for (let i = 0; i < state.tiles.length; i++) {
                console.log(state.tiles[i]);
            }
        }
    },
    actions: {
        async generateTiles(tilesNumber: number) {
            if (!JSON.parse(localStorage.getItem("map"))) {
                for (let i = 0; i < tilesNumber; i++) {
                    const tile = new TileModel(i);
                    tile.setIsATree(true);
                    tile.setEnemies(this.generateEnemies(i));
                    this.tiles.push(tile);
                }
            }
        },
        generateEnemies(id: number): EnemyModel[] {
            const randNumber: number = Math.random();
            const createdEnemies = new Array<EnemyModel>();
            if (randNumber < 0.2) {
                for (let i = 0; i < Math.floor(Math.random() * 5) + 1; i++) {
                    createdEnemies.push(new EnemyModel(id + i))
                }
            }
            return createdEnemies;
        }
    }
});