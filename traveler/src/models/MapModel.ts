import TileModel from "./TileModel";
import EnemyModel from './EnemyModel';

export class MapModel {
    private mapName = "Deafult Name";
    private tilesNumber = 52;
    private id: number;
    private mapTiles: TileModel[] = new Array<TileModel>();

    constructor() {
        this.id = 1;
    }

    public name(name: string): MapModel {
        this.mapName = name;
        return this;
    }

    public numberOfTiles(amount: number): MapModel {
        this.tilesNumber = amount;
        return this;
    }

    public getTiles(): TileModel[] {
        return this.mapTiles;
    }

    public generateTiles(): MapModel {
        for (let i = 0; i < this.tilesNumber; i++) {
            this.mapTiles.push(new TileModel().setId(i));
        }
        // this.mapTiles.forEach(tile => console.log(tile)); //TODO to remove 
        return this;
    }

    public addEnemiesOnTiles(): MapModel {
        this.mapTiles.forEach(tile => {
            const randNumber: number = Math.random();
            const createdEnemies = new Array<EnemyModel>();
            if (randNumber < 0.2) {
                for (let i = 0; i < Math.floor(Math.random() * 5) + 1; i++) {
                    createdEnemies.push(new EnemyModel(tile.getId()))
                }
                tile.addEnemies(createdEnemies);
            }
        })
        // this.mapTiles.forEach(tile => console.log(tile)); //TODO to remove 
        return this;
    }

    public build(): MapModel {
        return new MapModel()
            .name(this.mapName)
            .numberOfTiles(this.tilesNumber)
            .generateTiles()
            .addEnemiesOnTiles();
    }
}

export default MapModel;