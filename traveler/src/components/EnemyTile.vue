<template>
    <button class="enemyTile" v-if="enemyShown" @click="attackEnemy(tile)"></button>
</template>

<script lang="ts">
import TileModel from '@/models/TileModel';
import heroStore from '@/stores/HeroStore'
export default {
    name: "enemy-tile",
    props: {
        tile: {
            type: TileModel,
            required: true
        }
    },
    data() {
        const hero = heroStore.state.hero;
            let enemyShown = true;
            return { enemyShown, hero }
        },
    methods: {
        async attackEnemy(tile: TileModel) {
            const el = document.getElementById("" + tile.id);
            if(el) {
                if(this.hero.getHealth() != 0) {
                    this.hero.takeDamage(10);
                    this.hero.addKilled();
                    el.style.visibility = 'hidden';
                    } else {
                        return;
                    }
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