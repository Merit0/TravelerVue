export type DiceFace = 'sword' | 'shield' | 'energy';

export class DiceModel {
    face: DiceFace = 'sword';
    isRolling = false;

    constructor(public faces: DiceFace[] = ['sword', 'shield', 'energy']) {}

    roll(): Promise<DiceFace> {
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
            }, 1500);
        });
    }
}