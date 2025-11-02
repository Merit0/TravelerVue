<template>
  <div class="globalOverlay">
    <div class="dungeon-preview-overlay-container">
      <div class="dungeon-preview-content">
        <div class="boss-description">
          <p class="boss-name-text">Skeletor</p>
          <p class="dungeon-name-text">Fallen Bones</p>
        </div>
        <div class="loot-description">
          <p class="loot-items-title-text">Treasures:</p>
          <div class="loot-items-grid">
            <dungeon-loot-tile v-for="lootItem in dungeonLootList" :key="lootItem.id"
                               :lootItem="lootItem"></dungeon-loot-tile>
          </div>
        </div>
        <div class="dungeon-modal-buttons-container">
          <div class="door-button-container">
            <div class="key-door-button" @click="unlockDoor">
              <div class="key-door-button-image"></div>
            </div>
          </div>
          <div class="leave-dungeon-container">
            <div class="door-button-container">
              <div class="leave-dungeon-button" @click="closeDungeonPreviewOverlay()">
                <div class="leave-dungeon-button-image"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {LootItemModel} from '@/models/LootItemModel';
import {useBagStore} from '@/stores/BagStore';
import {useHeroStore} from '@/stores/HeroStore';
import {useOverlayStore} from "@/stores/overlay-store";
import {WeaponProvider} from "@/providers/WeaponProvider";
import {ShieldProvider} from "@/providers/shield-provider";
import DungeonLootTile from "@/a-game-scenes/dungeon-scene/components/dungeon-loot-tile.vue";
import {ItemType} from "@/enums/ItemType";
import {useMapLocationStore} from "@/stores/map-location-store";


export default {
  name: "dungeon-preview-overlay",
  components: {
    DungeonLootTile,
  },
  data() {
    const heroStore = useHeroStore();
    const hero = heroStore.hero;
    const bagStore = useBagStore();
    const dungeonLootList: LootItemModel[] = [WeaponProvider.getMolner(), ShieldProvider.getRoundWoodenShield()];

    return {bagStore, hero, heroStore, dungeonLootList};
  },
  methods: {
    closeDungeonPreviewOverlay() {
      const overlayStore = useOverlayStore();
      overlayStore.closeOverlay('dungeon-preview');
    },

    unlockDoor() {
      const heroBagItems: LootItemModel[] = this.bagStore.bagItems;
      const mapStore = useMapLocationStore();
      const key: LootItemModel = heroBagItems.find((bagItem: LootItemModel) => bagItem.itemType === ItemType.KEY);
      if (key) {
        this.bagStore.removeItem(key);
        this.closeDungeonPreviewOverlay();
        mapStore.resetCurrentLocation();
        this.$router.push('/location/fallen-bones');
      } else {
        console.log('No Key found')
      }
    }
  }
}
</script>

<style>
@import url('https://fonts.cdnfonts.com/css/friz-quadrata-std');
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&display=swap');

:root {
  --gold: #e2b675;
  --gold-dim: #bfa067;
  --text: #d9cfb3;
  --stone: #1b1a19;
  --stone-2: #24211f;
  --shadow: rgba(0, 0, 0, .45);
  --border: #3b322c;
  --glow: rgba(226, 182, 117, .25);
}

.dungeon-preview-overlay-container {
  position: relative;
  background-image: url("@/a-game-scenes/dungeon-scene/assets/dungeon-modal-background.png");
  background-repeat: no-repeat;
  background-size: cover;
  width: 30%;
  height: 80%;
  margin: 10vh auto auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.dungeon-preview-content {
  position: absolute;
  top: 24%;
  width: 60%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  justify-items: center;
}

.dungeon-modal-buttons-container {
  position: relative;
  width: 25rem;
  height: 8rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.door-button-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.key-door-button {
  position: absolute;
  top: -12%;
  right: -10%;
  width: 70%;
  height: 100%;
  scale: 0.6;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform .12s ease, box-shadow .12s ease, filter .12s ease;
}

.key-door-button-image {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url("@/a-game-scenes/dungeon-scene/assets/lock-hall-button-image.png");
  background-size: cover;
  background-position: center;
  filter: drop-shadow(0 0 6px rgba(255, 190, 90, .35));
}

.leave-dungeon-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.leave-dungeon-button {
  position: absolute;
  top: -12%;
  right: 40%;
  width: 70%;
  height: 100%;
  scale: 0.4;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform .12s ease, box-shadow .12s ease, filter .12s ease;
}

.leave-dungeon-button-image {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url("@/a-game-scenes/dungeon-scene/assets/quit-dungeon-button.png");
  background-size: cover;
  background-position: center;
}

.boss-description {
  position: relative;
  width: 25rem;
  height: 7rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: linear-gradient(180deg, #211e1c 0%, #1b1816 100%);
  border: 1px solid #302821;
  box-shadow: inset 0 0 18px rgba(0, 0, 0, .5);
}

.boss-name-text {
  margin: 0;
  font-family: 'Friz Quadrata Std', serif;
  font-size: clamp(42px, 2.8vw, 48px);
  letter-spacing: 4px;
  color: var(--gold);
  text-shadow: 0 3px 0 #000, 0 0 8px rgba(226, 182, 117, .25);
}

.dungeon-name-text {
  margin: 0;
  justify-self: end;
  font-family: 'Cinzel', serif;
  font-size: clamp(20px, 2vw, 20px);
  color: var(--gold-dim);
  opacity: .95;
}

.loot-description {
  position: relative;
  width: 25rem;
  height: 11rem;
  margin: 10px 0 14px;
  padding: 10px 12px;
  border-radius: 10px;
  background: linear-gradient(180deg, #211e1c 0%, #1b1816 100%);
  border: 1px solid #302821;
  box-shadow: inset 0 0 18px rgba(0, 0, 0, .5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.loot-items-title-text {
  margin: 0;
  font-family: 'Friz Quadrata Std', serif;
  color: var(--text);
  text-transform: uppercase;
  letter-spacing: .6px;
  font-size: 1.2rem;
  opacity: .9;
}

.key-door-button:hover {
  transform: translateY(-1px) scale(1.03);
  filter: saturate(1.08);
}

.key-door-button:active {
  transform: translateY(1px) scale(.98);
}

.leave-dungeon-button:hover {
  transform: translateY(-1px) scale(1.03);
}

.leave-dungeon-button:active {
  transform: translateY(1px) scale(.98);
}

.loot-items-grid {
  display: flex;
  flex-wrap: nowrap;
  gap: 3rem;
  justify-content: center;
  align-items: center;
  scale: 1.2;
}
</style>