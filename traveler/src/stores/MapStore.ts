import { defineStore } from "pinia";
import TileModel from "@/models/TileModel";
import EnemyModel from "@/models/EnemyModel";
import { Randomizer } from "../utils/Randomizer";
import MapModel from "../models/MapModel";
import { EnemyProvider } from "../providers/EnemyProvider";
import { BossProvider } from "../providers/BossProvider";
import { IHero } from "../abstraction/IHero";
import { HeroModel } from "../models/HeroModel";
import { ChestModel } from "../models/ChestModel";
import { useHeroStore } from "./HeroStore";
import { WeaponProvider } from "@/providers/WeaponProvider";
import { EnemyType } from "@/enums/EnemyType";

export const useMapStore = defineStore("map", {
  state: () => {
    return {
      mapName: "",
      tiles: [],
      tile: null,
      isCleared: false,
      boss: BossProvider.getSkeletonBoss(),
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
      return (
        state.tiles.filter((tile) => tile.isEmpty == true).length ===
          state.tiles.length - 1 && state.tiles.length !== 0
      );
    },
    resetMap: (state) => {
      state.mapName = "";
      state.tiles = [];
      state.isCleared = false;
    },
  },
  actions: {
    async buildMap(map: MapModel) {
      if (!JSON.parse(localStorage.getItem("map")) || this.tiles.length === 0) {
        this.mapName = map.getName();
        this.generateTiles(map.getTilesNumber());
        this.addHero(map.getHero());
        this.addEnemies();
        this.isCleared = false;
      }
    },
    async generateTiles(tilesNumber: number) {
      for (let i = 0; i < tilesNumber; i++) {
        const tile: TileModel = new TileModel(i);
        tile.setIsATree(true);
        this.tiles.push(tile);
      }
    },

    async addHero(hero: IHero) {
      this.tiles[0].hero = hero;
      this.removeAllItemsFromTile(this.tiles[0]);
    },

    async moveHero(nextTile: TileModel) {
      const heroStore = useHeroStore();
      for (let i = 0; i < this.tiles.length; i++) {
        const tile: TileModel = this.tiles[i];
        if (tile.hero) {
          const hero: HeroModel = this.tiles[i].hero;
          tile.hero = null;
          tile.isEmpty = true;
          nextTile.hero = hero;
          heroStore.setLocation(nextTile);
          this.removeAllItemsFromTile(nextTile);
          return;
        }
      }
    },

    async addEnemies() {
      const randNumber: number =
        Math.floor(Math.random() * this.tiles.length) + 1;
      for (let i = 1; i < this.tiles.length; i++) {
        if (!this.tiles[i].hero) {
          const enemies = this.generateEnemies(i);
          this.tiles[i].setEnemies(enemies);
          if (enemies.length > 0) {
            this.tiles[i].setChest(this.generateChest(enemies));
          }
        }
      }
      const bossIndex =
        randNumber < this.tiles.length ? randNumber : this.tiles.length;
      this.tiles[bossIndex].setEnemies(Array.of(this.boss));
    },

    generateChest(enemies: EnemyModel[]): ChestModel {
      const chest: ChestModel = new ChestModel();
      for (let i = 0; i < enemies.length; i++) {
        if (enemies[i].loot.chance) {
          enemies[i].loot.location = "Chest";
          chest.addLoot(enemies[i].loot);
        }
      }
      return chest.items.find((item) => item.name) != null ? chest : null;
    },

    generateEnemies(id: number): EnemyModel[] {
      const createdEnemies = new Array<EnemyModel>();
      const enemiesList: EnemyModel[] = EnemyProvider.getEvilLandsEnemies();
      if (Randomizer.getChance(20)) {
        let randIndex: number = Math.floor(
          Math.random() * enemiesList.length
        );
        for (let i = 0; i < Math.floor(Math.random() * 5) + 1; i++) {
          let enemy: EnemyModel = enemiesList[
            randIndex
          ].setId(id + i);
          let loot = null;
          if (enemy.enemyType === EnemyType.WARRIOR) {
            if (Randomizer.getChance(5)) {
              loot = Randomizer.getRandomEquipment(WeaponProvider.getLegends());
            } else {
              loot = Randomizer.getRandomEquipment(WeaponProvider.getCommon());
            }
          } else {
            loot = Randomizer.getRandomEquipment(WeaponProvider.getLegends());
          }
          enemy.setLoot(loot);
          createdEnemies.push(enemy);
          enemy = null;
        }
        randIndex = 0;
      }
      return createdEnemies;
    },

    removeAllItemsFromTile(tile: TileModel): void {
      tile.isEmpty = false;
      tile.isTree = false;
    },
  },
});
