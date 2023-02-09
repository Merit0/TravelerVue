export class HeroModel {

    private heroName = "";
    private heroHealth = 0;
    private heroAttack = 0;
    private heroDefense = 0;
    private heroCoins = 0;
    private heroStats = true;
    private id: number;

    constructor() {
        this.id = 0;
    }

    public name(name: string): HeroModel {
        this.heroName = name;
        return this;
    }

    public health(health: number): HeroModel {
        this.heroHealth = health;
        return this;
    }

    public attack(attack: number): HeroModel {
        this.heroAttack = attack;
        return this;
    }

    public defense(defense: number): HeroModel {
        this.heroDefense = defense;
        return this;
    }

    public coins(coins: number): HeroModel {
        this.heroCoins = coins;
        return this;
    }

    public stats(stats: boolean): HeroModel {
        this.heroStats = stats;
        return this;
    }

    public getName(): string {
        return this.heroName;
    }

    public getHealth(): number {
        return this.heroHealth;
    }

    public getAttack(): number {
        return this.heroAttack;
    }

    public getDefense(): number {
        return this.heroDefense;
    }

    public getCoins(): number {
        return this.heroCoins;
    }

    public getId(): number {
        return this.id;
    }

    public build(): HeroModel {
        return new HeroModel()
            .name(this.heroName)
            .health(this.heroHealth)
            .attack(this.heroAttack)
            .defense(this.heroDefense)
            .coins(this.heroCoins)
            .stats(this.heroStats);
    }
}