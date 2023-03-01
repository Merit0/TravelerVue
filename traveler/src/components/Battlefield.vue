<template>
  <div class="overlay" v-if="showOverlay">
    <div class="battlefieldOverlay">
      <div class="battleArea">
        <div class="heroSide"></div>
        <div class="buttonContainer">
          <button class="escapeBattle" @click="$emit('isBattle', false)">Escape</button>
        </div>
        <div class="enemySide">
          <enemy-tile
            :enemyShown="enemyTileShown"
            :enemyAlive="enemyAlive"
            v-for="enemy in tile.getEnemies()" :key="enemy.getId()"
          ></enemy-tile>
        </div>
      </div>
      <div class="battleReporter"></div>
    </div>
  </div>
</template>

<script lang="ts">
import EnemyTile from "./EnemyTile.vue";
import { PropType } from "vue";
import TileModel from "../models/TileModel";

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
    let enemyTileShown = true;
    let enemyAlive = true;
    return { enemyTileShown, enemyAlive};
  }
};
</script>

<style>
.battleReporter {
  width: 1200px;
  height: 100px;
  margin: auto;
  display: flex;
  justify-content: center;
  background-color: rgb(183, 183, 183);
  border-radius: 20px;
}

.buttonContainer {
  width: 200px;
  height: 600px;
  display: flex;
  align-items: center;
}
.escapeBattle {
  margin: auto;
  position: relative;
  width: 100px;
  height: 100px;
  background-color: rgba(255, 196, 0, 0.185);
  outline-color: rgba(0, 0, 0, 0.295);
  outline-width: 3px;
  outline-style: solid;
  border-radius: 30%;
  background-size: 100px 100px;
}
.heroSide {
  height: 600px;
  width: 500px;
  background-image: url("@/assets/images/battlefield/HeroBody500_600.png");
  background-size: flex-direction;
  border-radius: 20px;
}
.enemySide {
  height: 600px;
  min-width: 500px;
  align-items: flex-end;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 80px;
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
  height: 700px;
  background-image: url("../assets/images/dungeons/lavaLand.jpg");
  box-shadow: 0px -3px 15px 4px rgba(255, 195, 195, 0.5);
  border-radius: 20px;
  margin: auto;
  margin-top: 50px;
}
</style>
