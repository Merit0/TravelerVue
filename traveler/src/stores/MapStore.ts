import { HealPortion } from './../enums/HealPortion';
import { defineStore } from "pinia";
import TileModel from "@/models/TileModel";
import EnemyModel from "@/models/EnemyModel";
import { HealPortionModel } from "@/models/HealPortionModel";
import { Randomizer } from '../utils/Randomizer';
import MapModel from '../models/MapModel';
import { EnemyProvider } from '../providers/EnemyProvider';

export const useMapStore = defineStore("map", {
    state: () => {
        return {
            mapName: "",
            tiles: [],
            tile: null,
            isCleared: false
        };
    },

    getters: {
        countTiles: (state) => state.tiles.length,
        showTiles: (state) => {
            for (let i = 0; i < state.tiles.length; i++) {
                console.log(state.tiles[i]);
            }
        },
        isMapCleared: (state) => {
            console.log(state.isCleared);
            return state.tiles.filter(tile => tile.isEmpty == true).length === state.tiles.length && state.tiles.length !== 0;
        },
        resetMap: (state) => {
            state.mapName = "";
            state.tiles = [];
            state.isCleared = true;
        }
    },
    actions: {
        async buildMap(map: MapModel) {
            if (!JSON.parse(localStorage.getItem("map")) || this.isCleared) {
                this.mapName = map.getName();
                this.generateTiles(map.getTilesNumber());
                this.addEnemies();
                this.isCleared = false;
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
            if (Randomizer.getChance(10)) {
                for (let i = 0; i < Math.floor(Math.random() * 5) + 1; i++) {
                    let enemy = Randomizer.getRandomEnemy(EnemyProvider.getEvilLandsEnemies()).setId(id + i);
                    createdEnemies.push(enemy);
                    enemy = null;
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