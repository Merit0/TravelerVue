import {defineStore} from "pinia";
import TileModel from "@/a-game-scenes/silesia-world-scene/models/tile-model";
import EnemyModel from "@/models/EnemyModel";
import {useHeroStore} from "./HeroStore";
import {EnemyBuilder} from "@/builders/EnemyBuilder";
import {MapLocationModel} from "@/a-game-scenes/location-scene/models/map-location-model";
import MapModel from "@/a-game-scenes/silesia-world-scene/models/map-model";
import {toKebabCase} from "@/utils/string-utils";
import {MapProvider} from "@/a-game-scenes/silesia-world-scene/providers/map-provider";
import {HeroModel} from "@/models/HeroModel";
import {Randomizer} from "@/utils/Randomizer";
import {reactive} from 'vue';
import {AnimalProvider} from "@/providers/creatures-provider/animal-provider";
import {EnemyType} from "@/enums/EnemyType";
import {SkeletonProvider} from "@/providers/creatures-provider/skeleton-provider";

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
        getSilesia: (state) => (): MapModel | undefined => {
            return state.mapsList.find((map) => map.name === 'Silesia') as MapModel;
        },
    },
    actions: {
        initMapsList() {
            this.mapsList = [
                MapProvider.getSilesiaMap(),
            ];

            this.mapLocationName = "";
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
                        tiles: parsed.tiles.map((t: TileModel) => reactive(TileModel.mapToModel(t))),
                        isCleared: parsed.isMapLocationCleared,
                        boss: parsed.boss,
                    };
                } else {
                    const tiles = this.generateTiles(locationMap);
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

        generateTiles(locationMap: MapLocationModel, rows = 7, cols = 13): TileModel[] {
            const tiles: TileModel[] = [];

            const centerX = Math.floor(cols / 2);
            const centerY = Math.floor(rows / 2);

            const blockStartX = centerX - 1;
            const blockStartY = centerY - 1;

            const blockEndX = centerX + 1;
            const blockEndY = centerY + 1;

            for (let y = 0; y < rows; y++) {
                for (let x = 0; x < cols; x++) {
                    const index = y * cols + x;
                    const tile = new TileModel(index, {x, y});

                    tile.setIsInitial(index !== 47); //hero start position tile
                    tile.setImageSrc(locationMap.tileImage);
                    tile.setBackgroundSrc(locationMap.tileBackgroundSrc);
                    tile.isHeroHere = false;

                    const isInCampZone = x >= blockStartX && x <= blockEndX &&
                        y >= blockStartY && y <= blockEndY;

                    if (isInCampZone) {
                        tile.isBlocked = true;
                        tile.setBackgroundSrc("")
                        tile.setImageSrc("");
                        tile.isReachable = false;
                    }

                    tiles.push(tile);
                }
            }

            return tiles;
        },

        generatePodiumTiles(): TileModel[] {
            const GRID_SIZE = 3;
            const CENTER = {x: 1, y: 1};

            const podiumTiles: TileModel[] = [];

            for (let y = 0; y < GRID_SIZE; y++) {
                for (let x = 0; x < GRID_SIZE; x++) {
                    const index = y * GRID_SIZE + x;
                    const t = new TileModel(index, {x, y});
                    t.isInitial = true;
                    t.backgroundSrc = '/images/map-location/camping-map-location/tile-background-500-500/ground-tile-background.png';
                    podiumTiles.push(t);
                }
            }

            const centerIndex = CENTER.y * GRID_SIZE + CENTER.x;
            podiumTiles[centerIndex].isHeroHere = true;
            podiumTiles[centerIndex].isInitial = false;

            return podiumTiles;
        },

        addHeroToTiles(tiles: TileModel[], hero: HeroModel) {
            tiles.forEach((tile: TileModel) => {
                tile.isHeroHere = false;
            })
            const startTile = tiles[47];
            startTile.isHeroHere = true;
            hero.currentTile = startTile;
            hero.heroLocation = {...startTile.coordinates};
            this.calculateReachableTiles(startTile, tiles);
        },

        moveHero(nextTile: TileModel) {
            const heroStore = useHeroStore();
            const hero = heroStore.hero;
            const currentTile = hero.currentTile;

            if (!currentTile) return;
            if (nextTile.isBlocked) {
                console.warn("❌ Hero tried to move to a blocked tile:", nextTile.coordinates);
                return;
            }

            this.tiles.forEach((tile: TileModel) => {
                tile.isHeroHere = false;
            });

            if (nextTile.coordinates.x < currentTile.coordinates.x) {
                hero.flippedImage = false;
            } else if (nextTile.coordinates.x > currentTile.coordinates.x) {
                hero.flippedImage = true;
            }

            currentTile.isHeroHere = false;

            nextTile.isHeroHere = true;

            hero.currentTile = nextTile;
            hero.heroLocation = {...nextTile.coordinates};
            hero.heroSteps++;

            this.removeAllItemsFromTile(nextTile);
            this.calculateReachableTiles(nextTile, this.tiles);
        },

        addEnemiesToTiles(tiles: TileModel[], locationMap: MapLocationModel) {
            tiles.forEach((tile, index) => {
                if (tile.isBlocked || tile.isHeroHere) return;

                const enemies = this.generateEnemies(index, locationMap.enemyModifier);
                tile.setEnemies(enemies);
            });
        },

        addBossOnTile(tiles: TileModel[], locationMap: MapLocationModel) {
            const boss: EnemyModel = locationMap.boss;
            boss.setPowerModifierLvl(locationMap.enemyModifier);

            const validTiles = tiles.filter(tile =>
                !tile.isBlocked &&
                !tile.isHeroHere
            );

            if (validTiles.length === 0) {
                console.warn("⚠️ No valid tiles found to place the boss.");
                return;
            }

            const randomIndex = Math.floor(Math.random() * validTiles.length);
            const bossTile = validTiles[randomIndex];
            bossTile.enemies = [];
            bossTile.setEnemies([boss]);
        },

        generateEnemies(id: number, enemyPowerModifierNumber: number): EnemyModel[] {
            if (!Randomizer.getChance(20)) return [];
            const createdEnemies: EnemyModel[] = [];
            const enemyKindsList: EnemyType[] = [EnemyType.ANIMAL, EnemyType.WARRIOR]
            const animalsList: EnemyModel[] = AnimalProvider.getForestAnimals();
            const skeletonsList: EnemyModel[] = SkeletonProvider.getSkeletons();
            let enemiesList: EnemyModel[];

            let numberOfEnemiesOnTile: number;

            const chosenKind = enemyKindsList[Math.floor(Math.random() * enemyKindsList.length)];
            if (chosenKind === EnemyType.ANIMAL) {
                numberOfEnemiesOnTile = 1;
                enemiesList = animalsList;
            } else {
                numberOfEnemiesOnTile = Math.floor(Math.random() * 3) + 1;
                enemiesList = skeletonsList;
            }

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
                createdEnemies.push(enemy);
            }
            return createdEnemies;
        },

        removeAllItemsFromTile(tile: TileModel) {
            tile.isEnemyHere = false;
            tile.isInitial = false;
            tile.inBattle = false;
        },

        calculateReachableTiles(heroTile: TileModel, allTiles: TileModel[]) {
            const directions = [
                {x: 0, y: -1},  // top
                {x: 1, y: 0},   // right
                {x: 0, y: 1},   // bottom
                {x: -1, y: 0},  // left
                {x: 1, y: -1},  // top-right
                {x: -1, y: -1}, // top-left
                {x: 1, y: 1},   // bottom-right
                {x: -1, y: 1},  // bottom-left
            ];

            allTiles.forEach(tile => tile.isReachable = false);

            for (const dir of directions) {
                const tx = heroTile.coordinates.x + dir.x;
                const ty = heroTile.coordinates.y + dir.y;
                const neighbor = allTiles.find(
                    t => t.coordinates.x === tx && t.coordinates.y === ty
                );
                if (neighbor && !neighbor.isBlocked) {
                    neighbor.isReachable = true;
                }
            }
        },

        resetCurrentLocation() {
            const key = `${toKebabCase(this.mapLocationName)}-location-map`;
            localStorage.removeItem(key);
            delete this.locationStates[this.mapLocationName];
            this.mapLocationName = "";
        }
    },
});
