import { EnemyType } from '@/enums/EnemyType';
import { IEnemy } from '../abstraction/IEnemy';
import { DropChestModel } from './DropChestModel';
import { Randomizer } from '@/utils/Randomizer'


export default class EnemyModel implements IEnemy {

    name: string;
    type: EnemyType;
    maxHealth: number;
    minHealth: number;
    health: number;
    attack: number;
    defence: number;
    id: number;
    chest: DropChestModel;

    constructor(id: number) {
        this.id = id;
        this.type = EnemyType.WARRIOR;
        this.name = this.type + " Orc" + this.id;
        this.defence = 0;
        this.generateHealth();
        this.generateAttack();
        this.setHealth(Randomizer.getRandomInt(this.maxHealth));
        this.attack = Randomizer.getRandomInt(this.attack) + 1;
    }

    public getName(): string {
        return this.name;
    }
    public getType(): EnemyType {
        return this.type;
    }
    public getHealth(): number {
        return this.health;
    }
    public getAttack(): number {
        return this.attack;
    }
    public getDefence(): number {
        return this.defence;
    }
    public getId(): number {
        return this.id;
    }
    public getChest(): DropChestModel {
        return this.chest;
    }

    public setId(id: number) {
        this.id = id;
    }

    public takeDamage(damage: number): void {
        this.health -= damage;
    }

    private setMinHealth() {
        this.minHealth = Math.floor(this.maxHealth / 3);
    }

    private setHealth(randomHealth: number) {
        if (randomHealth >= this.maxHealth) {
            this.health = this.maxHealth;
        } else {
            this.health = randomHealth + this.minHealth;
        }
    }

    private generateHealth() {
        if (this.type === EnemyType.BOSS) {
            this.maxHealth = 300;
            this.setMinHealth();
        } else {
            this.maxHealth = 50;
            this.setMinHealth();
        }
    }

    private generateAttack() {
        if (this.type === EnemyType.BOSS) {
            this.attack = 50;
        } else {
            this.attack = 5;
        }
    }

}