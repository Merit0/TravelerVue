import {DiceModel, DiceFace} from './DiceModel';

export class DicesHolderModel {
    dices: DiceModel[] = [];
    count: number;

    constructor(count = 4, enemyCount?: number) {
        this.count = count;
        const actionFaces: DiceFace[] = ['sword', 'shield', 'energy'];

        this.dices = [
            new DiceModel(actionFaces),
            new DiceModel(actionFaces),
            new DiceModel(actionFaces),
        ];

        if (enemyCount !== undefined) {
            const enemyFaces: DiceFace[] = Array.from({length: enemyCount}, (_, i) => `x${i + 1}` as DiceFace);
            this.dices.push(new DiceModel(enemyFaces));
            this.count++;
        }
    }

    async rollAll(): Promise<DiceFace[] | string[]> {
        return Promise.all(this.dices.map(d => d.roll()));
    }

    static fromSaved(data: any): DicesHolderModel {
        const count = data.count ?? data.dices?.length ?? 3;
        const holder = new DicesHolderModel(0); // починаємо з 0, потім додаємо вручну

        holder.dices = data.dices.map((d: any) => {
            const dice = new DiceModel(d.faces || ['sword', 'shield', 'energy']);
            dice.face = d.face || 'sword';
            dice.isRolling = false;
            return dice;
        });

        holder.count = count;
        return holder;
    }
}