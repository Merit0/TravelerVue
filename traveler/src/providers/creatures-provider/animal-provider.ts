import EnemyModel from "@/models/EnemyModel";
import {EnemyBuilder} from "@/builders/EnemyBuilder";
import {EnemyType} from "@/enums/EnemyType";

export class AnimalProvider {
    private static animalImageRootFolder = '/images/creatures_500_500/';

    public static getBear(): EnemyModel {
        return new EnemyBuilder()
            .enemyName(AnimalType.BEAR)
            .enemyType(EnemyType.ANIMAL)
            .enemyImgPath(`${this.animalImageRootFolder}/forest-animals_500_500/${AnimalType.BEAR.toLowerCase()}-animal-image.png`)
            .powerModifierLvl(2)
            .build();
    }

    public static getTiger(): EnemyModel {
        return new EnemyBuilder()
            .enemyName(AnimalType.TIGER)
            .enemyType(EnemyType.ANIMAL)
            .enemyImgPath(`${this.animalImageRootFolder}/forest-animals_500_500/${AnimalType.TIGER.toLowerCase()}-animal-image.png`)
            .powerModifierLvl(3)
            .build();
    }

    public static getPig(): EnemyModel {
        return new EnemyBuilder()
            .enemyName(AnimalType.PIG)
            .enemyType(EnemyType.ANIMAL)
            .enemyImgPath(`${this.animalImageRootFolder}/forest-animals_500_500/${AnimalType.PIG.toLowerCase()}-animal-image.png`)
            .powerModifierLvl(0.5)
            .build();
    }

    public static getPuma(): EnemyModel {
        return new EnemyBuilder()
            .enemyName(AnimalType.PUMA)
            .enemyType(EnemyType.ANIMAL)
            .enemyImgPath(`${this.animalImageRootFolder}/forest-animals_500_500/${AnimalType.PUMA.toLowerCase()}-animal-image.png`)
            .powerModifierLvl(2)
            .build();
    }

    public static getDear(): EnemyModel {
        return new EnemyBuilder()
            .enemyName(AnimalType.DEAR)
            .enemyType(EnemyType.ANIMAL)
            .enemyImgPath(`${this.animalImageRootFolder}/forest-animals_500_500/${AnimalType.DEAR.toLowerCase()}-animal-image.png`)
            .powerModifierLvl(0.5)
            .build();
    }

    public static getSnake(): EnemyModel {
        return new EnemyBuilder()
            .enemyName(AnimalType.SNAKE)
            .enemyType(EnemyType.ANIMAL)
            .enemyImgPath(`${this.animalImageRootFolder}/forest-animals_500_500/${AnimalType.SNAKE.toLowerCase()}-animal-image.png`)
            .build();
    }

    public static getWolf(): EnemyModel {
        return new EnemyBuilder()
            .enemyName(AnimalType.WOLF)
            .enemyType(EnemyType.ANIMAL)
            .enemyImgPath(`${this.animalImageRootFolder}/forest-animals_500_500/${AnimalType.WOLF.toLowerCase()}-animal-image.png`)
            .build();
    }

    public static getForestAnimals(): EnemyModel[] {
        return Array.of(
            this.getPig(),
            this.getSnake(),
            this.getPuma(),
            this.getBear(),
            this.getTiger(),
            this.getDear(),
            this.getWolf(),
        );
    }
}

export enum AnimalType {
    BEAR = 'Bear',
    DEAR = 'Dear',
    PIG = 'Pig',
    PUMA = 'Puma',
    SNAKE = 'Snake',
    TIGER = 'Tiger',
    WOLF = 'Wolf',
}
