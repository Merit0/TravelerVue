import { EnemyType } from '@/enums/EnemyType';
import { IEnemy } from '../abstraction/IEnemy';
import { Randomizer } from '@/utils/Randomizer'
import { LootItemModel } from './LootItemModel';


export default class EnemyModel implements IEnemy {

    name: string;
    enemyType: EnemyType;
    maxHealth: number;
    minHealth: number;
    health: number;
    attack: number;
    defence: number;
    id: number;
    imgPath: string;
    enemyFrameColor: string;
    loot: LootItemModel;

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

    public getLoot(): LootItemModel {
        return this.loot;
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

    public setLoot(lootItem: LootItemModel): void {
        this.loot = lootItem;
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