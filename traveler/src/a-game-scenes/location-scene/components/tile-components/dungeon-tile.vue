<template>
  <div
      class="initialTileView mapTile"
      :style="tileBackground"
  >
    <button
        class="dungeon-button tileButton"
        @click="discover"
        :disabled="!tile.isReachable"
        :class="{
        unreachable: !tile.isReachable,
        'reachable-tile': tile.isReachable && !tile.isHeroHere,
        'magnifier-cursor': tile.isReachable && tile.isDungeon,
      }"
    >
      <div class="dungeon-tile-image">
        <div
            class="dungeon-image"
            :style="dungeonStyle"
        />
      </div>
    </button>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType, computed} from "vue";
import TileModel from "@/a-game-scenes/silesia-world-scene/models/tile-model";
import {DungeonModel} from "@/a-game-scenes/dungeon-scene/dungeon-model";

export default defineComponent({
  name: "enemy-tile",
  props: {
    tile: {
      type: Object as PropType<TileModel>,
      required: true,
    },
  },
  setup(props) {
    const withDungeon = computed(
        () => props.tile.isDungeon && !props.tile.isInitial && !props.tile.enemies.length
    );

    const tileBackground = computed(() => ({
      backgroundImage: `url(${props.tile.backgroundSrc})`,
    }));

    const dungeonStyle = computed(() => {
      const dungeon: DungeonModel = props.tile.dungeon;
      return {
        backgroundImage: `url(${dungeon.imagePath})`,
        transformOrigin: "center center",
        scale: "0.9"
      };
    });

    function discover() {
      console.log('Opened Dungeon page!');
    }

    return {
      withDungeon,
      tileBackground,
      dungeonStyle,
      discover,
    };
  },
});
</script>

<style>
@import "@/a-game-scenes/location-scene/styles/animated-tile.css";

.dungeon-tile-image {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: scale(0.3);
  transform-origin: center center;
  z-index: 10;
}

.dungeon-button {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.dungeon-image {
  position: absolute;
  width: 500px;
  height: 500px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  pointer-events: none;
}

.dungeon-button.magnifier-cursor {
  cursor: url('../../../battlefield-scene/battlefield/assets/magnifier-cursor-48x48.png') 50 50, auto;
}
</style>