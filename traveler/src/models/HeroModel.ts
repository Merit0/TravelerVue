import { IHero } from "@/abstraction/IHero";

export class HeroModel implements IHero {

    name = "";
    health = 0;
    attack = 0;
    defence = 0;
    coins = 0;
    stats = true;
    kills = 0;
    id = 0;

    public setName(name: string): HeroModel {
        this.name = name;
        return this;
    }

    public setHealth(health: number): HeroModel {
        this.health = health;
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

    public getName(): string {
        return this.name;
    }

    public getHealth(): number {
        return this.health;
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
        if ((this.kills % 5 === 0)) {
            this.attack += 1;
        }
    }

    public takeDamage(damage: number): void {
        this.health -= damage;
        if (this.health < 1) {
            this.health = 0;
        }
    }

    healthIncreaser() {
        this.health += 1;
    }

    public build(): HeroModel {
        return new HeroModel()
            .setName(this.name)
            .setHealth(this.health)
            .setAttack(this.attack)
            .setDefence(this.defence)
            .setCoins(this.coins)
            .setStats(this.stats);
    }
}