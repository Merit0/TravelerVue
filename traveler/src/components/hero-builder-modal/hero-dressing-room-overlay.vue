<template>
  <div class="globalOverlay">
    <div class="dressing-room-content">
      <close-hero-inventory-modal-button @heroDressingRoom="closeDressingRoomOverlay()"/>
      <div class="hero-content">
        <div class="hero-podium-board">
          <div class="view-switcher" @click="toggleView">
            <p class="switcher-label">
              {{ showGrid ? 'Hero' : 'On Map'}}
            </p>
            <div class="viewSwitcher-toggle" :class="{ active: showGrid }"></div>
          </div>
          <div v-if="!showGrid" class="hero-podium-tiles-grid">
            <podium-tile
                v-for="mapTile in validMapTiles"
                :key="mapTile.id"
                :tile="mapTile"
            />
          </div>
          <div v-else class="hero-body-view">
            <hero-podium :equipment="hero.equipment" :hero-image-path="hero.imgPath"/>
          </div>
        </div>
        <div class="hero-inventory-slots">
          <bag-inventory-slots-grid></bag-inventory-slots-grid>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useOverlayStore} from "@/stores/overlay-store";
import {useBattleStore} from "@/stores/battle-store";
import CloseHeroInventoryModalButton from "@/components/gui/buttons/close-hero-inventory-modal-button.vue";
import BagInventorySlotsGrid from "@/components/hero-equipment-modal/bag-inventory/bag-inventory-slots-grid.vue";
import {useMapLocationStore} from "@/stores/map-location-store";
import PodiumTile from "@/components/hero-builder-modal/podium-tile.vue";
import {ref} from 'vue';
import {useHeroStore} from "@/stores/HeroStore";
import HeroPodium from "@/components/hero-equipment-modal/hero-equipment-holder/hero-podium.vue";


export default defineComponent({
  name: 'hero-dressing-room-overlay',
  components: {HeroPodium, PodiumTile, BagInventorySlotsGrid, CloseHeroInventoryModalButton},
  setup() {
    const heroStore = useHeroStore();
    const hero = heroStore.hero;
    const showGrid = ref(true);
    const overlayStore = useOverlayStore();
    const mapStore = useMapLocationStore();
    mapStore.initMapsList();
    const validMapTiles = mapStore.generatePodiumTiles();

    const closeDressingRoomOverlay = () => {
      overlayStore.closeOverlay('hero-dressing-room');
    };

    const escapeBattle = () => {
      const battleStore = useBattleStore();
      battleStore.finishBattle();
      overlayStore.closeOverlay();
    };

    const toggleView = () => {
      showGrid.value = !showGrid.value;
    }

    return {
      showGrid,
      toggleView,
      validMapTiles,
      closeDressingRoomOverlay,
      escapeBattle,
      hero
    };
  }
});
</script>

<style>
.dressing-room-content {
  position: relative;
  width: 66vw;
  height: 70vh;
  margin: 12vh auto auto;
}

.hero-content {
  background: #392e26;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 85vh;
  border-radius: 5vh;
}

.hero-podium-board {
  width: 35vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.hero-body-view {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 80%;
}

.hero-inventory-slots {
  position: relative;
  width: 30vw;
  height: 100%;
}

.hero-podium-tiles-grid {
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 10vh);
  grid-template-rows: repeat(3, 10vh);
  gap: 2vw;
}

.view-switcher {
  position: absolute;
  top: 5%;
  width: 100px;
  height: 35px;
  background: radial-gradient(circle at 30% 30%, #d3d3d3 0%, #a6a6a6 60%, #6e6e6e 100%);
  border-radius: 10px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.4),
  0 2px 6px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
}

.switcher-label {
  font-size: 0.8rem;
  color: #454040;
  font-weight: 600;
  user-select: none;
}

.viewSwitcher-toggle {
  width: 23px;
  height: 23px;
  background: radial-gradient(circle, #50af01 20%, #c4c4c4 70%, #8a8a8a 100%);
  border-radius: 50%;
  transition: 0.3s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
}

.viewSwitcher-toggle.active {
  background: radial-gradient(circle, #ffd400 20%, #b5b5b5 70%, #7c7c7c 100%);
  transform: translateX(-8px); /* трохи зміщуємо вліво, якщо треба */
}

</style>