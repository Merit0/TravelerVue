import {defineStore} from 'pinia';
import TileModel from '@/models/TileModel';
import EnemyModel from '@/models/EnemyModel';
import {useHeroStore} from './HeroStore';
import {useDiceStore} from '@/stores/DiceStore';
import {useMapLocationStore} from '@/stores/map-location-store';

interface BattleArena {
    tiles: TileModel[];
    battleTile: TileModel | null;
    battleTileId: number | null;
    enemies: EnemyModel[];
    previousHeroTileId: number | null;
}

export const useBattleStore = defineStore('battle-store', {
    state: (): BattleArena => ({
        tiles: [],
        battleTile: null,
        battleTileId: null,
        enemies: [],
        previousHeroTileId: null
    }),

    actions: {
        startBattleOnTile(tile: TileModel) {
            const GRID_SIZE = 5;
            const CENTER = {x: 2, y: 2};

            const heroStore = useHeroStore();
            const hero = heroStore.hero;

            this.battleTile = tile;
            this.battleTileId = tile.id;
            this.previousHeroTileId = hero.currentTile?.id ?? null;

            // Ініціалізуємо тайли арени
            const tiles: TileModel[] = [];
            for (let y = 0; y < GRID_SIZE; y++) {
                for (let x = 0; x < GRID_SIZE; x++) {
                    const index = y * GRID_SIZE + x;
                    const t = new TileModel(index, {x, y});
                    t.setBackgroundSrc(tile.backgroundSrc);
                    tiles.push(t);
                }
            }

            // Ставимо героя в центр
            const centerIndex = CENTER.y * GRID_SIZE + CENTER.x;
            tiles[centerIndex].isHeroHere = true;
            hero.currentTile = tiles[centerIndex];

            // Розставляємо ворогів навколо
            const used = new Set([`${CENTER.x},${CENTER.y}`]);
            const arenaEnemies = Array.isArray(tile.enemies) ? tile.enemies : [];
            const placedEnemies: EnemyModel[] = [];

            for (const enemy of arenaEnemies) {
                let placed = false;
                let attempts = 0;

                while (!placed && attempts < 100) {
                    const dx = Math.floor(Math.random() * 7) - 3;
                    const dy = Math.floor(Math.random() * 7) - 3;
                    const x = CENTER.x + dx;
                    const y = CENTER.y + dy;
                    const dist = Math.abs(dx) + Math.abs(dy);
                    const key = `${x},${y}`;
                    const index = y * GRID_SIZE + x;

                    if (
                        x >= 0 && x < GRID_SIZE &&
                        y >= 0 && y < GRID_SIZE &&
                        dist >= 2 &&
                        !used.has(key)
                    ) {
                        tiles[index].isEnemyHere = true;
                        tiles[index].setEnemies([enemy]);
                        placedEnemies.push(enemy);
                        used.add(key);
                        placed = true;
                    }

                    attempts++;
                }
            }

            this.tiles = tiles;
            this.enemies = placedEnemies;
        },

        finishBattle() {
            const mapLocationStore = useMapLocationStore();
            const diceStore = useDiceStore();
            const heroStore = useHeroStore();
            const hero = heroStore.hero;

            const allEnemiesDead = this.enemies.every(e => e.isDead);

            if (this.battleTile) {
                this.battleTile.enemies = [];
                this.battleTile.isEnemyHere = false;

                if (allEnemiesDead) {
                    this.battleTile.isEmpty = false;
                    mapLocationStore.moveHero(this.battleTile);
                } else {
                    // Повертаємо героя на попередній тайл, якщо ID є
                    if (this.previousHeroTileId !== null) {
                        const mapLocation = mapLocationStore.currentLocation;
                        const previousTile = mapLocation?.tiles.find(t => t.id === this.previousHeroTileId);
                        if (previousTile) {
                            previousTile.isHeroHere = true;
                            previousTile.isEmpty = false;
                            hero.currentTile = previousTile;
                        }
                    }
                }
            }

            // Прибираємо героя з бойових тайлів
            this.tiles.forEach(t => t.isHeroHere = false);

            // Очищення
            diceStore.removeDices();

            this.tiles = [];
            this.enemies = [];
            this.battleTile = null;
            this.battleTileId = null;
            this.previousHeroTileId = null;
        },

        restoreAfterReload(allTiles: TileModel[]) {
            if (this.battleTileId) {
                const tile = allTiles.find(t => t.id === this.battleTileId);
                if (tile) {
                    tile.setEnemies(this.enemies.map(e => ({...e})));
                    this.battleTile = tile;
                }
            }
        },
    },
});
