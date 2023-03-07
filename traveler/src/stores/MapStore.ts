import { HealPortion } from './../enums/HealPortion';
import { defineStore, storeToRefs } from "pinia";
import TileModel from "@/models/TileModel";
import EnemyModel from "@/models/EnemyModel";
import { HealPortionModel } from "@/models/HealPortionModel";

export interface ITile {
    id: number;
    enemies: EnemyModel[];
    item: HealPortionModel;
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
                    if (tile.enemies.length === 0) {
                        tile.setItem(this.generateItem());
                        tile.isEmpty = false;
                    }
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
        },

        generateItem(): HealPortionModel {
            const randNumber: number = Math.random();
            if (randNumber < 0.5) {
                return new HealPortionModel(HealPortion.SMALL);
            }
        }
    }
});