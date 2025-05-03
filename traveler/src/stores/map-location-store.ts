import {defineStore} from "pinia";
import TileModel from "@/models/TileModel";
import EnemyModel from "@/models/EnemyModel";
import {EnemyProvider} from "@/providers/EnemyProvider";
import {ChestModel} from "@/models/ChestModel";
import {useHeroStore} from "./HeroStore";
import {EnemyBuilder} from "@/builders/EnemyBuilder";
import {MapLocationModel} from "@/models/map-location-model";
import MapModel from "@/models/MapModel";
import {toKebabCase} from "@/utils/string-utils";
import {MapProvider} from "@/providers/MapProvider";
import {HeroModel} from "@/models/HeroModel";
import {EnemyLootProvider, ILootChanceConfig} from "@/providers/loot-provider";
import {DropLootChanceConfigProvider} from "@/providers/loot-chance-drop-provider";
import {Randomizer} from "@/utils/Randomizer";
import {LootItemModel} from "@/models/LootItemModel";
import {ItemType} from "@/enums/ItemType";
import {CoinsProvider} from "@/providers/coins-provider";

interface MapLocationState {
    tiles: TileModel[];
    isCleared: boolean;
    boss?: EnemyModel;
}

interface IMapLocationState {
    mapLocationName: string;
    locationStates: Record<string, MapLocationState>;
    mapsList: MapModel[];
}

export const useMapLocationStore = defineStore("map-location-store", {
    state: (): IMapLocationState => {
        return {
            mapLocationName: "",
            locationStates: {},
            mapsList: [] as MapModel[],
        };
    },

    getters: {
        currentLocation(state): MapLocationState | undefined {
            return state.locationStates[state.mapLocationName];
        },
        tiles(state): TileModel[] {
            return state.locationStates[state.mapLocationName]?.tiles || [];
        },
        boss(state): EnemyModel | undefined {
            return state.locationStates[state.mapLocationName]?.boss;
        },
        isMapLocationCleared(state): boolean {
            const loc = state.locationStates[state.mapLocationName];
            if (!loc) return false;
            return (
                loc.tiles.filter((tile) => tile.isEmpty === true).length ===
                loc.tiles.length - 1 &&
                loc.tiles.length !== 0
            );
        },
        getMapsList(state) {
            return state.mapsList;
        },
        getOldForestMap: (state) => (): MapModel | undefined => {
            return state.mapsList.find((map) => map.name === 'Old Forest') as MapModel;
        },
    },
    actions: {
        initMapsList() {
            this.mapsList = [
                MapProvider.getOldForest(),
                MapProvider.getEvilTree(),
                MapProvider.getMagicCircle(),
            ];
        },
        async saveProgress(locationName: string) {
            const key = `${toKebabCase(locationName)}-location-map`;
            const state = this.locationStates[locationName];
            if (state) {
                localStorage.setItem(
                    key,
                    JSON.stringify({
                        tiles: state.tiles,
                        isMapLocationCleared: state.isCleared,
                        boss: state.boss,
                    })
                );
            }
        },

        async resetMapLocation(locationName: string) {
            const key = `${toKebabCase(locationName)}-location-map`;
            delete this.locationStates[locationName];
            localStorage.removeItem(key);
        },

        async resetAllMapLocations(map: MapModel) {
            map.mapLocations.forEach((location) => {
                const key = `${toKebabCase(location.name)}-location-map`;
                delete this.locationStates[location.name];
                localStorage.removeItem(key);
            });
        },
        buildLocationMap(locationMap: MapLocationModel) {
            const key = `${toKebabCase(locationMap.name)}-location-map`;
            const saved = localStorage.getItem(key);

            if (!this.locationStates[locationMap.name]) {
                if (saved) {
                    const parsed = JSON.parse(saved);
                    this.locationStates[locationMap.name] = {
                        tiles: parsed.tiles,
                        isCleared: parsed.isMapLocationCleared,
                        boss: parsed.boss,
                    };
                } else {
                    const tiles = this.generateTiles(locationMap);
                    this.addCamping(tiles);
                    this.addHeroToTiles(tiles, locationMap.hero);
                    this.addEnemiesToTiles(tiles, locationMap);
                    this.addBossOnTile(tiles, locationMap)
                    this.locationStates[locationMap.name] = {
                        tiles,
                        isCleared: false,
                        boss: locationMap.boss,
                    };
                }
            }

            this.mapLocationName = locationMap.name;
        },

        generateTiles(locationMap: MapLocationModel): TileModel[] {
            const tilesNumber = locationMap.tilesNumber;
            return Array.from({length: tilesNumber}, (_, i) => {
                const tile = new TileModel(i);
                tile.setIsInitial(i !== 0);
                tile.setImageSrc(locationMap.tileImage)
                tile.setBackgroundSrc(locationMap.tileBackgroundSrc)
                return tile;
            });
        },

        addHeroToTiles(tiles: TileModel[], hero: HeroModel) {
            if (!tiles.length) return;
            this.removeAllItemsFromTile(tiles[1]);
            tiles[1].hero = hero;
        },

        addCamping(tiles: TileModel[]) {
            if (!tiles.length) return;
            const firstTile: TileModel = tiles[0];
            firstTile.isCamping = true;
            firstTile.setIsInitial(false);
            this.removeAllItemsFromTile(firstTile);
        },

        moveHero(nextTile: TileModel) {
            const heroStore = useHeroStore();
            const tiles = this.tiles;
            const currentTile = tiles.find((tile: TileModel) => tile.hero);
            if (!currentTile) return;

            const hero = currentTile.hero;
            currentTile.hero = null;
            currentTile.isEmpty = true;

            nextTile.hero = hero;
            heroStore.setLocation(nextTile);
            this.removeAllItemsFromTile(nextTile);
        },

        addEnemiesToTiles(tiles: TileModel[], locationMap: MapLocationModel) {
            tiles.forEach((tile, index) => {
                if (index === 0 || tile.hero) return;

                const enemies = this.generateEnemies(index, locationMap.enemyModifier);
                tile.setEnemies(enemies);

                if (enemies.length > 0) {
                    const chest: ChestModel = this.generateChest(enemies, locationMap.chestImage);
                    tile.setChest(chest);
                }
            });
        },

        addBossOnTile(tiles: TileModel[], locationMap: MapLocationModel) {
            const dropChanceConfig: ILootChanceConfig = DropLootChanceConfigProvider.getBossDropChanceConfig()
            const bossLoot = EnemyLootProvider.getLoot(dropChanceConfig)
            const min = 5;
            const max = tiles.length - 2;
            const randNumber = Math.floor(Math.random() * (max - min + 1)) + min;
            if (randNumber < tiles.length) {
                const boss: EnemyModel = locationMap.boss;
                boss.setPowerModifierLvl(locationMap.enemyModifier);
                boss.setLoot(bossLoot);
                const bossTile: TileModel = tiles[randNumber];
                bossTile.setEnemies([boss]);
                const chest: ChestModel = this.generateChest([ boss ], locationMap.chestImage);
                bossTile.setChest(chest);
            }
        },

        generateChest(enemies: EnemyModel[], chestImage: string): ChestModel {
            let totalCoins = 0;
            const nonCoinLoot: LootItemModel[] = [];
            const chest = new ChestModel();
            chest.setImagePath(chestImage);
            for (const enemy of enemies) {
                for (const lootItem of enemy.loot) {
                    lootItem.place = 'chest';

                    if (lootItem.itemType === ItemType.COIN) {
                        totalCoins += lootItem.value;
                    } else {
                        nonCoinLoot.push(lootItem);
                    }
                }
            }

            if (totalCoins > 0) {
                const coinItem: LootItemModel = CoinsProvider.getCoins(totalCoins);
                coinItem.place = 'chest';
                chest.addLoot([coinItem]);
            }

            chest.addLoot(nonCoinLoot);

            return chest.items.length > 0 ? chest : null;
        },

        generateEnemies(id: number, enemyPowerModifierNumber: number): EnemyModel[] {
            if (!Randomizer.getChance(20)) return [];
            const createdEnemies: EnemyModel[] = [];
            const enemiesList = EnemyProvider.getEvilLandsEnemies();
            const numberOfEnemiesOnTile = Math.floor(Math.random() * 5) + 1;

            for (let i = 0; i < numberOfEnemiesOnTile; i++) {
                const randIndex = Math.floor(Math.random() * enemiesList.length);
                const base = enemiesList[randIndex];

                const enemy = new EnemyBuilder()
                    .enemyName(base.name)
                    .enemyType(base.enemyType)
                    .enemyImgPath(base.imgPath)
                    .enemyBackgroundSrc(base.enemyBackgroundColor)
                    .powerModifierLvl(enemyPowerModifierNumber)
                    .build();

                enemy.setId(id + i);

                const dropChanceConfig: ILootChanceConfig = DropLootChanceConfigProvider.getCommonDropChanceConfig()
                const loot = EnemyLootProvider.getLoot(dropChanceConfig)

                enemy.setLoot(loot);
                createdEnemies.push(enemy);
            }
            return createdEnemies;
        },

        removeAllItemsFromTile(tile: TileModel) {
            tile.isEmpty = false;
            tile.isInitial = false;
        },
    },
});
