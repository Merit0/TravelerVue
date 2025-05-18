import { defineStore } from 'pinia'

export type OverlayType = 'battle' | 'chest-inventory' | 'shop' | 'mapInfo' | 'dialogue' | 'hero-inventory';

export const useOverlayStore = defineStore('overlay-store', {
    state: () => ({
        activeOverlay: null as OverlayType | null,
        overlayData: {} as Record<string, any>
    }),

    actions: {
        openOverlay(name: OverlayType, data: Record<string, any> = {}) {
            this.activeOverlay = name
            this.overlayData = data
        },

        closeOverlay() {
            this.activeOverlay = null
            this.overlayData = {}
        },

        isOverlay(name: OverlayType) {
            return this.activeOverlay === name
        }
    }
})