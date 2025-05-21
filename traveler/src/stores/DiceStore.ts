import {defineStore} from 'pinia';
import {DicesHolderModel} from '@/models/DicesHolderModel';
import {DiceFace, DiceModel} from "@/models/DiceModel";
import {RollDiceTester} from "@/utils/roll-dice-tester";

export const useDiceStore = defineStore('dice', {
        state: () => ({
            holder: new DicesHolderModel(),
            lastResult: [] as string[],
            isRolling: false,
        }),
        actions: {
            async rollDices(currentEnemies: { health: number }[]) {
                this.isRolling = true;
                const liveEnemies = currentEnemies.filter(e => e.health > 0);
                const enemyFaces = Array.from({length: liveEnemies.length}, (_, i) => `x${i + 1}`);

                const enemyDice = this.holder.dices[3];
                if (enemyDice) {
                    enemyDice.faces = enemyFaces;
                }

                this.lastResult = await this.holder.rollAll();
                await new Promise(resolve => setTimeout(resolve, 1000));

                this.isRolling = false;
            },
            setDiceCountWithEnemyCount(enemyModels: { health: number }[]) {
                const actionFaces: DiceFace[] = ['sword', 'shield', 'energy'];
                const swordDiceWeights = [10, 1, 1]; // Наприклад: sword частіше

                const liveEnemies = enemyModels.filter(e => e.health > 0);
                const liveEnemyCount = liveEnemies.length;

                const enemyFaces = Array.from({length: liveEnemyCount}, (_, i) => `x${i + 1}`);

                this.testDice(actionFaces, swordDiceWeights);

                this.holder.dices = [
                    new DiceModel(actionFaces, swordDiceWeights),
                    new DiceModel(actionFaces, swordDiceWeights),
                    new DiceModel(actionFaces, swordDiceWeights),
                    new DiceModel(enemyFaces), // Динамічний кубик кількості ворогів
                ];
            },
            restoreState(saved: any) {
                if (saved?.holder?.dices?.length > 0) {
                    this.holder = DicesHolderModel.fromSaved(saved.holder);
                } else {
                    this.holder = new DicesHolderModel();
                }

                if (Array.isArray(saved.lastResult)) {
                    this.lastResult = saved.lastResult;
                }

                this.isRolling = false;
            },
            removeDices() {
                this.holder.dices = [];
                this.lastResult = [];
                this.isRolling = false;
            },
            testDice(faces: DiceFace[], weights: number[]) {
                new RollDiceTester(faces, weights).testRolls(1000);
            },
            persist: {
                paths: ['holder.dices', 'lastResult'],
            },
        },
    })
;