export class MapModel {
    private mapName = "Deafult Name";
    private tilesNumber = 52;
    private id: number;

    constructor() {
        this.id = 1;
    }

    public name(name: string): MapModel {
        this.mapName = name;
        return this;
    }

    public tiles(amount: number): MapModel {
        this.tilesNumber = amount;
        return this;
    }

    public getTiles(): number {
        return this.tilesNumber;
    }

    public build(): MapModel {
        return new MapModel()
            .name(this.mapName)
            .tiles(this.tilesNumber)
    }
}

export default MapModel;