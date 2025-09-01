<template>
  <div class="inventorySlotContainer">
    <div
        class="bagItemImg"
        :style="getItemStyle(lootItem)"
        @click="animateEquip(lootItem)"
        :ref="'item-' + lootItem.id"
    ></div>
    <div class="inventoryFrameImage"></div>
  </div>
</template>

<script lang="ts">
import { ItemType } from '@/enums/ItemType';
import { LootItemModel } from '@/models/LootItemModel';
import { useBagStore } from '@/stores/BagStore';
import { useHeroStore } from '@/stores/HeroStore';
import { PropType } from 'vue';

export default {
  name: "BagItemTile",
  props: {
    lootItem: {
      type: Object as PropType<LootItemModel>,
      required: true
    }
  },
  data() {
    const bagStore = useBagStore();
    const heroStore = useHeroStore();
    return { bagStore, hero: heroStore.hero };
  },
  methods: {
    getItemStyle(lootItem: LootItemModel) {
      return {
        backgroundImage: `url(${lootItem.imgPath})`,
      }
    },
    async animateEquip(item: LootItemModel) {
        const itemEl = this.$refs['item-' + item.id] as HTMLElement;
        const heroImageEl = document.querySelector('.hero-image') as HTMLElement;
        const itemRect = itemEl.getBoundingClientRect();
        const heroRect = heroImageEl.getBoundingClientRect();

        const clone = itemEl.cloneNode(true) as HTMLElement;
        document.body.appendChild(clone);

        Object.assign(clone.style, {
          position: 'fixed',
          top: itemRect.top + 'px',
          left: itemRect.left + 'px',
          width: itemRect.width + 'px',
          height: itemRect.height + 'px',
          transition: 'all 0.3s ease-in-out',
          zIndex: '1000',
          pointerEvents: 'none'
        });

        requestAnimationFrame(() => {
          Object.assign(clone.style, {
            top: heroRect.top + heroRect.height / 2 - itemRect.height / 2 + 'px',
            left: heroRect.left + heroRect.width / 2 - itemRect.width / 2 + 'px',
            transform: 'scale(1.2)',
            opacity: '0.7'
          });

          setTimeout(() => {
            if (item.itemType === ItemType.HEAL) {
              clone.style.transition = 'opacity 0.2s ease-in';
              clone.style.opacity = '0';
              setTimeout(() => {
                document.body.removeChild(clone);
                this.useItem(item); // зілля просто застосовується
              }, 200);
            } else {
              const slotKey = ItemType[item.itemType].toLowerCase();
              const slotEl = document.querySelector(`.equipment-slot[data-slot="${slotKey}"]`) as HTMLElement;

              if (!slotEl) {
                document.body.removeChild(clone);
                this.useItem(item);
                return;
              }

              const slotRect = slotEl.getBoundingClientRect();

              clone.style.transition = 'all 0.4s ease-in-out';
              Object.assign(clone.style, {
                top: slotRect.top + 'px',
                left: slotRect.left + 'px',
                width: slotRect.width + 'px',
                height: slotRect.height + 'px',
                opacity: '0.4',
                transform: 'scale(1.0)',
              });

              setTimeout(() => {
                document.body.removeChild(clone);
                this.useItem(item);
              }, 400);
            }
          }, 300);
        });
    },
    useItem(item: LootItemModel) {
      const bag = this.bagStore;
      const hero = this.hero;

      const equip = (slotKey: keyof typeof hero.equipment, statKey: keyof typeof hero) => {
        if (hero.equipment[slotKey]) {
          bag.removeItem(item);
          hero[statKey] -= hero.equipment[slotKey]!.value;
          bag.putIn(hero.equipment[slotKey]!);
        } else {
          bag.removeItem(item);
        }
        hero.equipment[slotKey] = item;
        hero[statKey] += item.value;
      };

      switch (item.itemType) {
        case ItemType.WEAPON:
          equip('weapon', 'attack');
          break;
        case ItemType.ARMOR:
          equip('armor', 'maxHealth');
          break;
        case ItemType.HELM:
          equip('helm', 'maxHealth');
          break;
        case ItemType.SHIELD:
          equip('shield', 'maxHealth');
          break;
        case ItemType.BOOTS:
          equip('boots', 'maxHealth');
          break;
        case ItemType.PANTS:
          equip('pants', 'maxHealth');
          break;
        case ItemType.BELT:
          equip('belt', 'maxHealth');
          break;
        case ItemType.HEAL:
          hero.currentHealth = Math.min(hero.currentHealth + item.value, hero.maxHealth);
          bag.removeItem(item);
          break;
      }
    }
  }
}
</script>

<style>
.bagItemImg {
  position: relative;
  width: 80%;
  height: 80%;
  border-radius: 10%;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  z-index: 1;
}

.bagItemImg:active {
  transform: scale(0.95);
  filter: brightness(1.2);
}

.bagItemImg:hover {
  box-shadow: 0 0 10px rgba(255, 204, 69, 0.6);
  transform: scale(1.05);
  cursor: pointer;
}
</style>