import { DiceModel, DiceFace } from './DiceModel';

export class DicesHolderModel {
    dices: DiceModel[] = [];

    constructor(count= 3) {
        this.dices = Array.from({ length: count }, () => new DiceModel());
    }

    async rollAll(): Promise<DiceFace[]> {
        const rolls = this.dices.map(dice => dice.roll());
        return Promise.all(rolls);
    }

    areAllRolling(): boolean {
        return this.dices.some(d => d.isRolling);
    }

    static fromSaved(data: any): DicesHolderModel {
        const holder = new DicesHolderModel(0);
        holder.dices = data.dices.map((d: any) => {
            const dice = new DiceModel(d.faces || ['sword', 'shield', 'energy']);
            dice.face = d.face || 'sword';
            dice.isRolling = false;
            return dice;
        });
        return holder;
    }
}