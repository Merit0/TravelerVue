import {IHero} from "@/abstraction/IHero";
import {Equipment} from "./Equipment";
import TileModel, {ICoordinates} from "./TileModel";

export class HeroModel implements IHero {
    name: string;
    currentHealth: number;
    maxHealth: number;
    attack: number;
    defense: number;
    coins: number;
    stats: boolean;
    kills: number;
    currentEnergy: number;
    maxEnergy: number;
    available: boolean;
    id: number;
    imgPath = "/images/heroes_150_150/hero-tile-image.png";
    equipment: Equipment;
    currentTile: TileModel;
    heroLocation: ICoordinates;
    flippedImage = false;

    constructor() {
        this.maxHealth = 100;
        this.maxEnergy = 100;
    }

    setFlipped(state: boolean) {
        this.flippedImage = state;
        return this;
    }

    getFlipped(): boolean {
        return this.flippedImage;
    }

    public setName(name: string): HeroModel {
        this.name = name;
        return this;
    }

    setLocation(tile: TileModel) {
        this.currentTile = tile;
        this.heroLocation = {...tile.coordinates};
    }

    public setMaxHealth(amount: number): HeroModel {
        this.maxHealth = amount;
        return this;
    }

    public setHealth(health: number): HeroModel {
        this.currentHealth = health;
        return this;
    }

    public setAttack(attack: number): HeroModel {
        this.attack = attack;
        return this;
    }

    public setDefense(defense: number): HeroModel {
        this.defense = defense;
        return this;
    }

    public setKills(kills: number): HeroModel {
        this.kills = kills;
        return this;
    }

    public setMaxEnergy(maxEnergyValue: number): HeroModel {
        this.maxEnergy = maxEnergyValue;
        return this;
    }

    public setCurrentEnergy(currentEnergyValue: number): HeroModel {
        this.currentEnergy = currentEnergyValue;
        return this;
    }

    public setCoins(coins: number): HeroModel {
        this.coins = coins;
        return this;
    }

    public setStats(stats: boolean): HeroModel {
        this.stats = stats;
        return this;
    }

    public setEquipment(equipment: Equipment): HeroModel {
        this.equipment = equipment;
        return this;
    }

    public getName(): string {
        return this.name;
    }

    public getHealth(): number {
        return this.currentHealth;
    }

    public getCurrentEnergy(): number {
        return this.currentEnergy;
    }

    public getMaxEnergy(): number {
        return this.maxEnergy;
    }

    public getAttack(): number {
        return this.attack;
    }

    public getDefense(): number {
        return this.defense;
    }

    public getCoins(): number {
        return this.coins;
    }

    public getId(): number {
        return this.id;
    }

    public getEnemiesKilled(): number {
        return this.kills;
    }

    public addKilled(): void {
        this.kills += 1;
        this.experienceCollector();
    }

    public collectEnergy(energyValue = 1): void {
        this.currentEnergy = Math.min(this.currentEnergy + energyValue, this.maxEnergy);
    }

    public useEnergy(energyValue = 1): void {
        this.currentEnergy -= energyValue;
    }

    public experienceCollector(): void {
        if (this.kills % 5 === 0) {
            this.attack += 1;
        }
    }

    public takeDamage(damage: number): void {
        this.currentHealth -= damage;
        if (this.currentHealth < 1) {
            this.currentHealth = 0;
        }
    }

    public healthIncreaser(): void {
        this.currentHealth += 1;
    }

    public adjustHealthOnStatChange(): void {
        if (this.currentHealth > this.maxHealth) {
            this.currentHealth = this.maxHealth;
        }
    }
}
