import { IHero } from "@/abstraction/IHero";
import { Equipment } from "./Equipment";

export class HeroModel implements IHero {
  name: string;
  currentHealth: number;
  maxHealth: number;
  attack: number;
  defence: number;
  coins: number;
  stats: boolean;
  kills: number;
  available: boolean;
  id: number;
  imgPath = "heroes/hero_ass1.png";
  equipment: Equipment;

  constructor() {
    this.maxHealth = 100;
  }

  public setName(name: string): HeroModel {
    this.name = name;
    return this;
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

  public setDefence(defence: number): HeroModel {
    this.defence = defence;
    return this;
  }

  public setKills(kills: number): HeroModel {
    this.kills = kills;
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

  public getAttack(): number {
    return this.attack;
  }

  public getDefense(): number {
    return this.defence;
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
    this.expirienceCollector();
  }

  private expirienceCollector(): void {
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
}
