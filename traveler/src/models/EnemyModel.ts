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
    imgPath: string;
    enemyFrameColor: string;

    constructor() {
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

    setEnemyType(enemyType: EnemyType): void {
        this.type = enemyType;
    }

    setEnemyFrameColor(frameColor: string): void {
        this.enemyFrameColor = frameColor;
    }

    public takeDamage(damage: number): void {
        this.health -= damage;
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

}