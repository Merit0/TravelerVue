import { defineStore } from 'pinia';

export type OverlayType =
    | 'battle'
    | 'chest-inventory'
    | 'shop'
    | 'mapInfo'
    | 'dialogue'
    | 'hero-inventory'
    | 'grave-inventory'
    | 'confirm-escape-battle';

export const useOverlayStore = defineStore('overlay-store', {
    state: () => ({
        activeOverlays: [] as OverlayType[], // 🔄 замість одного
        overlayData: {} as Record<OverlayType, any>, // типізована мапа
    }),

    actions: {
        openOverlay(name: OverlayType, data: Record<string, any> = {}) {
            if (!this.activeOverlays.includes(name)) {
                this.activeOverlays.push(name);
            }
            this.overlayData[name] = data;
        },

        closeOverlay(name?: OverlayType) {
            if (name) {
                this.activeOverlays = this.activeOverlays.filter(o => o !== name);
                delete this.overlayData[name];
            } else {
                this.activeOverlays = [];
                this.overlayData = {};
            }
        },

        isOverlay(name: OverlayType): boolean {
            return this.activeOverlays.includes(name);
        },
    },
});