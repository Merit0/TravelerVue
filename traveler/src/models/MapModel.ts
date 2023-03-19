import { MapComplexity } from "@/enums/MapComplexity";
import { IHero } from "../abstraction/IHero";

export class MapModel {
  private mapName: string;
  private tilesNumber: number;
  private id: number;
  private complexity: MapComplexity;
  private hero: IHero;

  constructor() {
    this.id = 1;
  }

  public setMapName(name: string): MapModel {
    this.mapName = name;
    return this;
  }

  public setNumberOfTiles(numberOfTiles: number): MapModel {
    this.tilesNumber = numberOfTiles;
    return this;
  }

  public setComplexity(complexity: MapComplexity): MapModel {
    this.complexity = complexity;
    return this;
  }

  public setHero(hero: IHero): void {
    this.hero = hero;
  }

  public getName(): string {
    return this.mapName;
  }

  public getHero(): IHero {
    return this.hero;
  }

  public getTilesNumber(): number {
    return this.tilesNumber;
  }
}

export default MapModel;
