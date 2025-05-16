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
            async rollDices() {
                this.isRolling = true;
                this.lastResult = await this.holder.rollAll();
                await new Promise(resolve => setTimeout(resolve, 1000));

                this.isRolling = false;
            },
            setDiceCountWithEnemyCount(enemyCount: number) {
                const actionFaces: DiceFace[] = ['sword', 'shield', 'energy'];
                const enemyFaces = Array.from({length: enemyCount}, (_, i) => `x${i + 1}`);
                const swordDice = [10, 1, 1]
                this.testDice(actionFaces, swordDice)

                this.holder.dices = [
                    new DiceModel(actionFaces, swordDice),
                    new DiceModel(actionFaces, swordDice),
                    new DiceModel(actionFaces, swordDice),
                    new DiceModel(enemyFaces), // Enemy Dice
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