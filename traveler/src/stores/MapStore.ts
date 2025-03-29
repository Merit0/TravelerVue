import {defineStore} from "pinia";
import TileModel from "@/models/TileModel";
import EnemyModel from "@/models/EnemyModel";
import {Randomizer} from "@/utils/Randomizer";
import MapModel from "../models/MapModel";
import {EnemyProvider} from "@/providers/EnemyProvider";
import {BossProvider} from "@/providers/BossProvider";
import {IHero} from "@/abstraction/IHero";
import {ChestModel} from "@/models/ChestModel";
import {useHeroStore} from "./HeroStore";
import {WeaponProvider} from "@/providers/WeaponProvider";
import {EnemyType} from "@/enums/EnemyType";
import {EnemyBuilder} from "@/builders/EnemyBuilder";
import {EquipmentGroupProvider} from "@/providers/equipment-group-provider";

interface MapState {
    mapName: string;
    tiles: TileModel[];
    isCleared: boolean;
    boss: EnemyModel | undefined;
}

export const useMapStore = defineStore("map", {
    state: (): MapState => {
        return {
            mapName: "",
            tiles: [],
            isCleared: false,
            boss: undefined,
        };
    },

    getters: {
        countTiles: (state) => state.tiles.length,
        showTiles: (state) => {
            state.tiles.forEach((tile, i) => console.log(`Tile ${i}:`, tile));
        },
        isMapCleared: (state) => {
            return (
                state.tiles.filter((tile) => tile.isEmpty == true).length ===
                state.tiles.length - 1 && state.tiles.length !== 0
            );
        }
    },
    actions: {
        async resetMap(): Promise<void> {
            console.log('Resetting map state');
            this.mapName = '';
            this.tiles = [];
            this.isCleared = false;
            this.boss = "";
            localStorage.removeItem("map");
            console.log('Map state after reset:', this.$state);
        },
        buildMap(map: MapModel) {
            const firstDungeon = map.dungeons[0];
            if (!JSON.parse(localStorage.getItem("map")) || this.tiles.length === 0) {
                this.mapName = map.name;
                this.generateTiles(firstDungeon.tilesNumber);
                this.addHero(firstDungeon.hero);
                this.addEnemies();
                this.isCleared = false;
            }
        },
        generateTiles(tilesNumber: number): void {
            console.log('Tiles number =>> ' + tilesNumber);
            this.tiles = Array.from({length: tilesNumber}, (_, i) => {
                const tile = new TileModel(i);
                tile.setIsATree(true);
                return tile;
            });
        },

        addHero(hero: IHero) {
            if (!this.tiles.length) return;
            this.tiles[0].hero = hero;
            this.removeAllItemsFromTile(this.tiles[0]);
        },

        moveHero(nextTile: TileModel) {
            const heroStore = useHeroStore();
            const currentTile = this.tiles.find((tile: TileModel) => tile.hero);

            if (!currentTile) return;

            const hero = currentTile.hero;
            currentTile.hero = null;
            currentTile.isEmpty = true;

            nextTile.hero = hero;
            heroStore.setLocation(nextTile);
            this.removeAllItemsFromTile(nextTile);
        },

        addEnemies() {
            if (!this.tiles.length) return;
            const randNumber: number = Math.floor(Math.random() * this.tiles.length);
            this.tiles.forEach((tile: TileModel, index: number) => {
                if (index === 0 || tile.hero) return;

                const enemies = this.generateEnemies(index);
                tile.setEnemies(enemies);

                if (enemies.length > 0) {
                    tile.setChest(this.generateChest(enemies));
                }
            });
            if (randNumber < this.tiles.length) {
                this.resetBoss();
                this.tiles[randNumber].setEnemies([this.boss]);
            }
        },

        generateChest(enemies: EnemyModel[]): ChestModel {
            const chest: ChestModel = new ChestModel();
            for (let i = 0; i < enemies.length; i++) {
                if (enemies[i].loot.chance) {
                    enemies[i].loot.place = "Chest";
                    chest.addLoot(enemies[i].loot);
                }
            }
            return chest.items.find((item) => item.name) != null ? chest : null;
        },

        generateEnemies(id: number): EnemyModel[] {
            if (!Randomizer.getChance(20)) return [];
            const createdEnemies: EnemyModel[] = [];
            const enemiesList = EnemyProvider.getEvilLandsEnemies();
            if (!enemiesList.length) return createdEnemies;
            const numberOfEnemies = Math.floor(Math.random() * 5) + 1;
            for (let i = 0; i < numberOfEnemies; i++) {
                const randIndex = Math.floor(Math.random() * enemiesList.length);
                const enemy = new EnemyBuilder()
                    .enemyName(enemiesList[randIndex].name)
                    .enemyType(enemiesList[randIndex].enemyType)
                    .enemyImgPath(enemiesList[randIndex].imgPath)
                    .enemyBorderFrame(enemiesList[randIndex].enemyFrameColor)
                    .build();

                enemy.setId(id + i);

                let loot = null;
                if (enemy.enemyType === EnemyType.WARRIOR) {
                    loot = Randomizer.getChance(5)
                        ? Randomizer.getRandomEquipment(WeaponProvider.getLegends())
                        : Randomizer.getRandomEquipment(EquipmentGroupProvider.getCommonEquipment());
                } else {
                    loot = Randomizer.getRandomEquipment(WeaponProvider.getLegends());
                }

                enemy.setLoot(loot);
                createdEnemies.push(enemy);
            }

            return createdEnemies;
        },

        removeAllItemsFromTile(tile: TileModel): void {
            tile.isEmpty = false;
            tile.isTree = false;
        },

        resetBoss() {
            this.boss = BossProvider.getSkeletonBoss();
        }
    },
});
