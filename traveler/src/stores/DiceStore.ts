import {defineStore} from 'pinia';
import {DicesHolderModel} from '@/models/DicesHolderModel';

export const useDiceStore = defineStore('dice', {
        state: () => ({
            holder: new DicesHolderModel(3),
            lastResult: [] as string[],
            isRolling: false,
        }),
        actions: {
            async rollDices() {
                this.isRolling = true;
                this.lastResult = await this.holder.rollAll();
                this.isRolling = false;
            },
            restoreState(saved: any) {
                if (saved?.holder?.dices) {
                    this.holder = DicesHolderModel.fromSaved(saved.holder);
                }
                if (Array.isArray(saved.lastResult)) {
                    this.lastResult = saved.lastResult;
                }
                this.isRolling = false; // ❗ обовʼязково
            },
            persist: {
                paths: ['holder.dices', 'lastResult'], // ❗ без isRolling
            },
        },
    })
;