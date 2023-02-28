import EnemyModel from './EnemyModel';
export class TileModel {

    public id: number;
    private enemies: EnemyModel[];
    private health: number;

    constructor() {
        this.id = 0;
    }

    public getId(): number {
        return this.id;
    }

    public getEnemies(): EnemyModel[] {
        return this.enemies;
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

    public addEnemies(enemies: EnemyModel[]): void {
        this.enemies = enemies;
    }
}

export default TileModel;
