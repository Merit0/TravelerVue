import {defineStore} from 'pinia'
import TileModel from '@/models/TileModel'
import EnemyModel from '@/models/EnemyModel'
import {useHeroStore} from './HeroStore'
import {useDiceStore} from '@/stores/DiceStore'
import {useMapLocationStore} from "@/stores/map-location-store";

interface BattleArena {
    tiles: TileModel[];
    heroPosition: { x: number; y: number };
    enemies: EnemyModel[];
    battleTile: TileModel | null;
    heroTile: TileModel | null;
    battleTileId: number | null;
}

export const useBattleStore = defineStore('battle-store', {
    state: (): BattleArena => ({
        tiles: [],
        heroPosition: {x: 2, y: 2},
        enemies: [],
        battleTile: null,
        heroTile: null,
        battleTileId: null
    }),

    actions: {
        startBattleOnTile(tile: TileModel) {
            const GRID_SIZE = 5;
            const center = {x: 2, y: 2};
            const heroStore = useHeroStore();
            const hero = heroStore.hero;

            this.heroTile = hero.currentTile;
            this.battleTile = tile;
            this.battleTileId = tile.id;

            const tiles: TileModel[] = [];
            for (let y = 0; y < GRID_SIZE; y++) {
                for (let x = 0; x < GRID_SIZE; x++) {
                    const index = y * GRID_SIZE + x;
                    const t = new TileModel(index, {x, y});
                    t.setBackgroundSrc(tile.backgroundSrc);
                    tiles.push(t);
                }
            }

            const centerIndex = center.y * GRID_SIZE + center.x;
            tiles[centerIndex].isHeroHere = true;
            hero.currentTile = tiles[centerIndex];
            this.heroPosition = {...center};

            const used = new Set([`${center.x},${center.y}`]);
            const enemies: EnemyModel[] = [];
            const arenaEnemies = Array.isArray(tile.enemies) ? tile.enemies : [];

            if (arenaEnemies.length === 0) {
                console.warn('⚠️ В tile.enemies немає ворогів', tile);
            }

            for (const enemy of arenaEnemies) {
                let placed = false;
                let attempts = 0;

                while (!placed && attempts < 100) {
                    const dx = Math.floor(Math.random() * 7) - 3;
                    const dy = Math.floor(Math.random() * 7) - 3;
                    const x = center.x + dx;
                    const y = center.y + dy;
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
                        enemies.push(enemy);
                        used.add(key);
                        placed = true;
                    }

                    attempts++;
                }
            }

            this.tiles = tiles;
            this.enemies = enemies;
        },

        finishBattle() {
            const mapLocationStore = useMapLocationStore();
            const diceStore = useDiceStore();
            const allEnemiesDead = this.enemies.every((e: EnemyModel) => e.isDead);

            if (allEnemiesDead && this.battleTile) {
                console.warn('All enemies are dead');

                // 1. Очистити тайл від ворогів
                this.battleTile.enemies = [];
                this.battleTile.isEnemyHere = false;

                // 2. Перемістити героя
                mapLocationStore.moveHero(this.battleTile);

                // 3. Позначити старий тайл як порожній
                if (this.heroTile) {
                    this.heroTile.isHeroHere = false;
                    this.heroTile.isEmpty = true;
                }

                // 4. Переконатися, що battleTile вже не пустий
                this.battleTile.isEmpty = false;
            }

            // Очищаємо кубики
            diceStore.removeDices();

            // Очищаємо бойовий стан
            this.tiles = [];
            this.enemies = [];
            this.battleTile = null;
            this.heroTile = null;
            this.battleTileId = null;
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