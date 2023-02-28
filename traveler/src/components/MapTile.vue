<template>
    <tree-tile :treeShown="treeTileShown"  @click="clearTile(tile)"></tree-tile>
    <enemy-tile :enemyShown = "enemyTileShown" :enemyAlive="enemyAlive" @click="attackEnemy(tile)"></enemy-tile>
    <empty-tile v-model:epmtyTile="emptyTileShown"></empty-tile>
</template>

<script lang="ts">
import TileModel from '@/models/TileModel';
import EnemyTile from '@/components/EnemyTile.vue';
import TreeTile from '@/components/TreeTile.vue'
import EmptyTile from '@/components/EmptyTile.vue';
import { useHeroStore } from '@/stores/HeroStore'

export default {
    name: "map-tile",
    props: {
        tile: {
            type: TileModel,
            required: true
        }
    },
    components: { EnemyTile, TreeTile, EmptyTile },
    data() {
        const heroStore = useHeroStore();
        const hero = heroStore.hero;
            let treeTileShown = true;
            let enemyTileShown = false;
            let emptyTileShown = false;
            let enemyAlive = true;
            return { treeTileShown, enemyTileShown, emptyTileShown, enemyAlive, hero }
        },
    methods: {
        async clearTile(tile: TileModel) {
            this.treeTileShown = false;
               if(tile.getEnemies()) {
                    this.enemyTileShown = true;
               } else {
                    this.emptyTileShown = true;
               }
        },
        async hideEnemyTile(enemyTileStatus: boolean) {
            this.enemyTileShown = enemyTileStatus;
            this.emptyTileShown = true;
        },
        async attackEnemy(tile: TileModel) {
            const enemies = tile.getEnemies();
            if(this.hero.getHealth() > 0) {
                for(let i=0; i < enemies.length; i++ ) {
                    enemies[i].takeDamage(this.hero.getAttack());
                    if(enemies[i].getHealth() <= 0) {
                        this.hero.addKilled();
                        enemies.splice(i, 1);
                    } else{
                        this.hero.takeDamage(enemies[i].getAttack());
                    }
                    if(!enemies.length) {
                        this.enemyAlive= false;
                    }
                }
                if(!this.enemyAlive) {
                    this.emptyTileShown = true;
                    return;
                }
            } else {
                return console.log("Game Over");
            }
        }
    }
}
</script>