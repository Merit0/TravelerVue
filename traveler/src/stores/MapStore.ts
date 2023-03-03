import { defineStore, storeToRefs } from "pinia";
import TileModel from "@/models/TileModel";
import EnemyModel from "@/models/EnemyModel";

// const {tiles} = storeToRefs(useMapStore())

type IMapState = {
    map: string,
    tiles: TileModel[],
    tile: TileModel
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
        },
    },
    actions: {
        async generateTiles(tilesNumber: number) {
            console.log("generate tiles")
            for (let i = 0; i < tilesNumber; i++) {
                this.tiles.push(new TileModel());
            }
        },
        async clearTiles() {
            this.tiles = [];
        },
        async addEnemies() {
            this.mapTiles.forEach(tile => {
                const randNumber: number = Math.random();
                const createdEnemies = new Array<EnemyModel>();
                if (randNumber < 0.2) {
                    for (let i = 0; i < Math.floor(Math.random() * 5) + 1; i++) {
                        createdEnemies.push(new EnemyModel(tile.getId() + i))
                    }
                    tile.addEnemies(createdEnemies);
                }
            })
            // this.mapTiles.forEach(tile => console.log(tile)); //TODO to remove 
            return this;
        }
    }
});