// composables/useRealBattleTile.ts
import { computed } from 'vue'
import { useBattleStore } from '@/stores/battle-store'
import { useMapLocationStore } from '@/stores/map-location-store'

export function useRealBattleTile() {
    const battleStore = useBattleStore()
    const mapLocationStore = useMapLocationStore()

    const realBattleTile = computed(() => {
        if (!battleStore.battleTileId) return null
        return mapLocationStore.tiles.find(t => t.id === battleStore.battleTileId) || null
    })

    return { realBattleTile }
}