<template>
    <button class="enemyTile" @click="attackEnemy(tile)" v-if="enemyShown && enemyAlive"></button>
</template>

<script lang="ts">
import TileModel from '@/models/TileModel';
import { useHeroStore } from '@/stores/HeroStore'

export default {
    name: "enemy-tile",
    props: {
        tile: {
            type: TileModel,
            required: true
        },
        enemyShown: {
            type: Boolean,
            default: false
        }
    },
    data() {
        const heroStore = useHeroStore();
        const hero = heroStore.hero;
        let enemyAlive = true;
        let emptyTileShown = false;
            return { hero, enemyAlive, emptyTileShown}
        },
    methods: {
        async attackEnemy(tile: TileModel) {
            if(this.hero.getHealth() > 0) {
                tile.getEnemy().takeDamage(this.hero.getAttack()) //TODO can be addded logic who atack first related on speed prop
                this.hero.takeDamage(tile.getEnemy().getAttack());
                if(this.hero.getHealth() < 1) {
                    console.log("Game Over");
                    this.$emit("player-dead", false);
                    return;
                }
                if(tile.getEnemy().getHealth() <= 0) {
                    this.hero.addKilled();
                    this.enemyAlive= false;
                }
               
                if(!this.enemyAlive) {
                    this.$emit("enemy-tile", false);
                    return;
                }
            } else {
                return console.log("Game Over");
            }
        }
    }
}
</script>
<style>
.enemyTile {
    width: 100px;
    height: 100px;
    background: none;
    border: 2px solid rgb(255, 115, 0);
    border-radius: 50%;
    margin-left: 2%;
    display: inline-flex;
    align-items: flex-end;
    background-image: url('../assets/images/enemies/twoEnemies.png');
    background-size: 100% 100%;
}
</style>