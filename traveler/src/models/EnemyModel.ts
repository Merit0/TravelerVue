import { EnemyType } from '@/enums/EnemyType';
import { IEnemy } from '../abstraction/IEnemy';
import { DropChestModel } from './DropChestModel';
import { Randomizer } from '@/utils/Randomizer'


export default class EnemyModel implements IEnemy {

    name: string;
    enemyType: EnemyType;
    maxHealth: number;
    minHealth: number;
    health: number;
    attack: number;
    defence: number;
    id: number;
    chest: DropChestModel;
    imgPath: string;
    enemyFrameColor: string;

    constructor() {
        this.id = 1;
        this.defence = 0;
        this.attack = Randomizer.getRandomInt(this.attack) + 1;
    }

    public getName(): string {
        return this.name;
    }
    public getType(): EnemyType {
        return this.enemyType;
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

    public getImgPath(): string {
        return this.imgPath;
    }

    public setId(id: number): EnemyModel {
        this.id = id;
        this.name += " " + this.id;
        return this;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public setImage(imagePath: string): void {
        this.imgPath = imagePath;
    }

    public setEnemyType(enemyType: EnemyType): void {
        this.enemyType = enemyType;
    }

    public setEnemyFrameColor(frameColor: string): void {
        this.enemyFrameColor = frameColor;
    }

    public takeDamage(damage: number): void {
        this.health -= damage;
    }

    public generateHealth() {
        if (this.enemyType === EnemyType.BOSS) {
            this.maxHealth = 300;
        } else {
            this.maxHealth = 50;
        }
        this.minHealth = Math.floor(this.maxHealth / 3);
        const randomAttack = Randomizer.getRandomIntInRange(this.minHealth, this.maxHealth);
        this.health = randomAttack < this.maxHealth ? randomAttack : this.maxHealth;
    }

    public generateAttack() {
        if (this.enemyType === EnemyType.BOSS) {
            this.attack = 50;
        } else {
            this.attack = 5;
        }
    }
}