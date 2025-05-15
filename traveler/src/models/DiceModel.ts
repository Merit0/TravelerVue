export type DiceFace = 'sword' | 'shield' | 'energy' | `x${number}`;

export class DiceModel {
    face: DiceFace | string = 'sword';
    isRolling = false;

    constructor(public faces: DiceFace[] | string[]) {
    }

    roll(): Promise<DiceFace | string> {
        this.isRolling = true;
        return new Promise(resolve => {
            const interval = setInterval(() => {
                this.face = this.faces[Math.floor(Math.random() * this.faces.length)];
            }, 100);

            setTimeout(() => {
                clearInterval(interval);
                const result = this.faces[Math.floor(Math.random() * this.faces.length)];
                this.face = result;
                this.isRolling = false;
                resolve(result);
            }, 1000);
        });
    }
}