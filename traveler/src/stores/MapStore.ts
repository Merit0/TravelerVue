import { HealPortion } from './../enums/HealPortion';
import { defineStore } from "pinia";
import TileModel from "@/models/TileModel";
import EnemyModel from "@/models/EnemyModel";
import { HealPortionModel } from "@/models/HealPortionModel";
import { Randomizer } from '../utils/Randomizer';
import MapModel from '../models/MapModel';

export const useMapStore = defineStore("map", {
    state: () => {
        return {
            mapName: "",
            tiles: [],
            tile: null,
            tilesCleared: 0
        };
    },

    getters: {
        countTiles: (state) => state.tiles.length,
        showTiles: (state) => {
            for (let i = 0; i < state.tiles.length; i++) {
                console.log(state.tiles[i]);
            }
        },
        clearTile: (state) => state.tilesCleared += 1
    },
    actions: {
        async buildMap(map: MapModel) {
            if (!JSON.parse(localStorage.getItem("map"))) {
                this.mapName = map.getName();
                this.generateTiles(map.getTilesNumber());
                this.addEnemies();
            }
        },

        async generateTiles(tilesNumber: number) {
            for (let i = 0; i < tilesNumber; i++) {
                const tile = new TileModel(i);
                tile.setIsATree(true);
                this.tiles.push(tile);
            }
        },
        async addEnemies() {
            for (let i = 0; i < this.tiles.length; i++) {
                this.tiles[i].setEnemies(this.generateEnemies(i));
                if (this.tiles[i].enemies.length === 0) {
                    this.tiles[i].setItem(this.generateItem());
                    this.tiles[i].isEmpty = false;
                }
            }
        },

        generateEnemies(id: number): EnemyModel[] {
            const createdEnemies = new Array<EnemyModel>();
            if (Randomizer.getChance(20)) {
                for (let i = 0; i < Math.floor(Math.random() * 5) + 1; i++) {
                    createdEnemies.push(new EnemyModel(id + i))
                }
            }
            return createdEnemies;
        },

        generateItem(): HealPortionModel {
            if (Randomizer.getChance(5)) {
                return new HealPortionModel(HealPortion.SMALL);
            }
        }
    }
});