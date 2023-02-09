export class HeroModel {

    private heroName = "";
    private heroHealth = 0;
    private heroAttack = 0;
    private heroDeffense = 0;
    private heroCoins = 0;
    private heroStats = true;
    private id: number;

    constructor() {
        this.id = 1;
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

    public deffense(deffense: number): HeroModel {
        this.heroDeffense = deffense;
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


    public build(): HeroModel {
        return new HeroModel()
            .name(this.heroName)
            .health(this.heroHealth)
            .attack(this.heroAttack)
            .deffense(this.heroDeffense)
            .coins(this.heroCoins)
            .stats(this.heroStats);
    }
}