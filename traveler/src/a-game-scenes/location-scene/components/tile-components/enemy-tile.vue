<template>
  <div
      class="initialTileView mapTile"
      v-if="!tile.isInitial && hasAliveEnemies"
      :style="tileBackground"
  >
    <button
        class="enemy-button tileButton"
        @click="startBattle"
        :disabled="!tile.isReachable"
        :class="{
        unreachable: !tile.isReachable,
        'reachable-tile': tile.isReachable && !tile.isHeroHere,
      }"
    >
      <div class="enemy-body-tile-image">
        <div class="podium-hero-image enemy-stand-base-top-view" />
        <div
            class="podium-hero-image"
            :style="enemyStyle"
        />
      </div>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import TileModel from "@/a-game-scenes/silesia-world-scene/models/tile-model";
import EnemyModel from "@/models/EnemyModel";
import { useBattleStore } from "@/stores/battle-store";
import { useOverlayStore } from "@/stores/overlay-store";
import { useDiceStore } from "@/stores/DiceStore";
import { useHeroStore } from "@/stores/HeroStore";

export default defineComponent({
  name: "enemy-tile",
  props: {
    tile: {
      type: Object as PropType<TileModel>,
      required: true,
    },
  },
  setup(props) {
    const battleStore = useBattleStore();
    const overlayStore = useOverlayStore();
    const diceStore = useDiceStore();
    const heroStore = useHeroStore();

    const firstAliveEnemy = computed<EnemyModel | null>(() =>
        props.tile.enemies.find((e) => e.health > 0) || null
    );

    const hasAliveEnemies = computed(
        () => !!firstAliveEnemy.value && props.tile.enemies.length > 0
    );

    const tileBackground = computed(() => ({
      backgroundImage: `url(${props.tile.backgroundSrc})`,
    }));

    const enemyStyle = computed(() => {
      if (!firstAliveEnemy.value) return {};

      if (!props.tile.isReachable) {
        return {
          backgroundImage: `url(${firstAliveEnemy.value.imgPath})`,
          transformOrigin: "center center",
        };
      }

      const heroLocation = heroStore.hero.heroLocation;
      if (!heroLocation) return {};

      const dx = heroLocation.x - props.tile.coordinates.x;
      const dy = heroLocation.y - props.tile.coordinates.y;
      const rotation = (Math.atan2(dy, dx) * 180) / Math.PI + 270;

      return {
        backgroundImage: `url(${firstAliveEnemy.value.imgPath})`,
        transform: `rotate(${rotation}deg)`,
        transformOrigin: "center center",
        transition: "transform 1s ease",
      };
    });

    function startBattle() {
      battleStore.startBattleOnTile(props.tile);
      const aliveEnemies = props.tile.enemies.filter((e) => e.health > 0);
      diceStore.setupDiceHeroActions();
      diceStore.setupEnemyCounterDice(aliveEnemies);

      overlayStore.openOverlay("battle");
    }

    return {
      firstAliveEnemy,
      hasAliveEnemies,
      tileBackground,
      enemyStyle,
      startBattle,
    };
  },
});
</script>

<style>
@import "@/a-game-scenes/location-scene/styles/animated-tile.css";

.enemy-hero-image {
  position: relative;
  width: 500px;
  height: 500px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  pointer-events: none;
}


.enemy-body-tile-image {
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

.enemy-button {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.enemy-stand-base-top-view {
  background-image: url("/images/podiums/brown-stand-base-top-view.png");
}
</style>