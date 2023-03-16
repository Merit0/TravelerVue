<template>
  <div class="overlay" v-if="showOverlay">
    <div class="battlefieldOverlay">
      <div class="battleArea">
        <div class="heroSide">
            <button class="escapeButton" @click="closeBattlefield(tile)">X</button>
        </div>
        <div class="attackButtonContainer">
            <button class="attackButton activeBtn" @click="attackEnemy(tile)"></button>
        </div>
        <div class="enemySide">
          <enemy-tile 
            :tile="tile"
            :enemyShown="enemyTileShown"
            :enemyAlive="enemyAlive"
            v-for="enemy in tile.enemies" :key="enemy.id">
          </enemy-tile>
        </div>
      </div>
      <div class="battleReporter">
        <h1 style="font-size: 18px; margin-left: 550px; color:maroon">Battle:</h1>
        <div v-for="enemy in tile.enemies" :key="enemy.id">
          <p v-if="isAttacked" style="font-size: 15px;">
            =>
            <span class="pHero">{{ hero.getName() }}</span>
              hitted enemy by {{ hero.getAttack() }}
            <span class="pEnemy">{{ enemy.name }}'s</span>
              [health:
            <span>{{ enemy.health }}]. ---  </span>
            <span class="pEnemy">{{ enemy.name }}</span>
              hitted 
              <span class="pHero">{{ hero.getName() }}</span>
              by {{ enemy.attack }}.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import EnemyTile from "./EnemyTile.vue";
import { PropType } from "vue";
import TileModel from "../models/TileModel";
import { useHeroStore } from "@/stores/HeroStore";
import { useMapStore } from '../stores/MapStore';

export default {
  name: "battle-field",
  components: { EnemyTile },
  props: {
    tile: {
      type: Object as PropType<TileModel>,
      required: true,
    },
    showOverlay: {
        type: Boolean,
        required: true,
        default: false
    }
  },
  data() {
    const mapStore = useMapStore();
    const heroStore = useHeroStore();
    const hero = heroStore.hero;
    let enemyTileShown = true;
    let enemyAlive = true;
    let isAttacked = false;
    return { enemyTileShown, enemyAlive, hero, isAttacked, mapStore };
  },
  methods: {
    async attackEnemy(tile: TileModel) {
            this.isAttacked = true; 
            tile.inBattle = true;
            const enemies = tile.enemies;
            if(this.hero.getHealth() > 0) {
                for(let i=0; i < enemies.length; i++ ) {
                    enemies[i].health -= this.hero.getAttack();
                    if(enemies[i].health <= 0) {
                      await this.hero.addKilled();
                        const enemyIndex = enemies.findIndex(e => e.id === i);
                        enemies.splice(enemyIndex, 1);
                    } else{
                        this.hero.takeDamage(enemies[i].attack);
                    }
                    if(!enemies.length) {
                        this.enemyAlive = false;
                    }
                }
                if(!this.enemyAlive && !enemies.length) {
                  this.$emit("isBattle", false);
                  if(!tile.chest) {
                    tile.isEmpty = true;
                    this.mapStore.moveHero(tile);
                  }
                  tile.inBattle = false;
                  return;
                }
            }
        },
        async closeBattlefield(tile: TileModel) {
            this.$emit('isBattle', false)
            tile.inBattle = false;
            
        }
  }
};
</script>

<style>

.pHero {
  color: #0800ff; 
  font-weight:bold; 
}

.pEnemy {
  color: #ff0000; 
  font-weight:bold; 

}
.battleReporter {
  width: 1200px;
  height: 150px;
  margin: auto;
  display: flex-direction;
  background-color: rgb(218, 218, 218);
  border-radius: 20px;
  padding: 4px;
  
}

.attackButtonContainer {
  width: 200px;
  height: 600px;
  display: flex;
  align-items: center;
}

.attackButton {
  margin: auto;
  position: relative;
  width: 200px;
  height: 200px;
  background-image: url("@/assets/images/battlefield/crossedSwordsBtn.png");
  outline-width: 1px;
  outline-style: solid;
  outline-color: rgba(0, 0, 0, 0.295);
  outline-width: 3px;

  border-radius: 30%;
  transition: 0.2s all;

}

.escapeButton {
  position: relative;
  width: 30px;
  height: 30px;
  background-color: rgb(255, 0, 0);
  outline-color: rgba(255, 0, 0, 0.589);
  outline-width: 2px;
  outline-style: solid;
  border-radius: 100%;
}
.heroSide {
  height: 600px;
  width: 500px;
  background-image: url("@/assets/images/battlefield/HeroBody500_600.png");
  background-size: flex-direction;
  border-radius: 20px;
  padding: 10px;
}
.enemySide {
  height: 600px;
  width: 500px;
  align-items: flex-end;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 80px;
  background-color: rgba(95, 95, 95, 0.382);
  border-radius: 20px;
  border: 1px solid rgba(68, 0, 0, 0.292);
}
.battleArea {
  width: 1200px;
  height: 600px;
  border-radius: 20px;
  margin: auto;
  display: flex;
  justify-content: center;
}
.battlefieldOverlay {
  width: 1200px;
  height: 750px;
  background-image: url("../assets/images/dungeons/lavaLand.jpg");
  background-color:black;
  box-shadow: 0px -3px 15px 4px rgba(255, 195, 195, 0.5);
  border-radius: 20px;
  margin: auto;
  margin-top: 50px;
}
</style>
