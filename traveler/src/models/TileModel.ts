export class TileModel {

    public id: number;
    private enemy = false;
    private health: number;
    private item: boolean;

    constructor() {
        this.id = 0
        this.health = 0;
        this.item = false;
        this.generateEnemy();
    }

    public getId(): number {
        return this.id;
    }

    public getEnemy(): boolean {
        return this.enemy;
    }

    public getHealth(): number {
        return this.health;
    }

    public setId(id: number): TileModel {
        this.id = id;
        return this;
    }

    public setHealth(health: number): void {
        this.health = health;
    }

    public addEnemy(): void {
        this.enemy = true;
        this.setItem();
    }

    private setItem(): void {
        if (this.enemy) {
            this.item == true;
        }
    }

    private generateEnemy() {
        const randNumber: number = Math.random();
        if (randNumber < 0.2) {
            this.addEnemy();
        }
    }
}

export default TileModel;