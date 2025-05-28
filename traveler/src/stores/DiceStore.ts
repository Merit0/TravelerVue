import {defineStore} from 'pinia';
import {DicesHolderModel} from '@/models/DicesHolderModel';
import {DiceFace, DiceModel} from "@/models/DiceModel";
import {RollDiceTester} from "@/utils/roll-dice-tester";
import {EnemyDiceGenerator} from "@/utils/enemy-utils/enemy-dice-generator";
import EnemyModel from "@/models/EnemyModel";

export const useDiceStore = defineStore('dice', {
        state: () => ({
            holder: new DicesHolderModel(),
            enemyDiceHolders: {} as Record<number, DiceModel[]>,
            lastResult: [] as string[],
            isRolling: false,
        }),
        actions: {
            initializeEnemyDice(enemy: EnemyModel) {
                this.enemyDiceHolders[enemy.id] = EnemyDiceGenerator.generate(enemy);
            },
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
            async rollAllEnemyDices(): Promise<Record<number, string[]>> {
                const results: Record<number, string[]> = {};

                for (const [idStr, dices] of Object.entries(this.enemyDiceHolders) as [string, any[]][]) {
                    const restoredDices = dices.map((d: any) => {
                        if (typeof d.roll !== 'function') {
                            const restored = new DiceModel(d.faces, d.weights);
                            restored.face = d.face;
                            return restored;
                        }
                        return d;
                    });

                    this.enemyDiceHolders[+idStr] = restoredDices;
                    results[+idStr] = await Promise.all(restoredDices.map(d => d.roll()));
                }

                return results;
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