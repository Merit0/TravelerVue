import EnemyModel from "../models/EnemyModel";
import { EnemyBuilder } from "../builders/EnemyBuilder";
import { EnemyType } from "@/enums/EnemyType";
export class EnemyProvider {
  public static getOrcMale(): EnemyModel {
    return new EnemyBuilder()
      .enemyName("Orc Warrior")
      .enemyType(EnemyType.WARRIOR)
      .enemyImgPath("enemies_150_150/orc_male.png")
      .enemyBorderFrame("rgb(55, 115, 0)")
      .build();
  }

  public static getOrcMage(): EnemyModel {
    return new EnemyBuilder()
      .enemyName("Orc Mage")
      .enemyType(EnemyType.WARRIOR)
      .enemyImgPath("enemies_150_150/orc_mage.png")
      .enemyBorderFrame("rgb(155, 115, 0)")
      .build();
  }

  public static getOrcBowMale(): EnemyModel {
    return new EnemyBuilder()
      .enemyName("Orc Bow")
      .enemyType(EnemyType.WARRIOR)
      .enemyImgPath("enemies_150_150/orc_male_bow.png")
      .enemyBorderFrame("rgb(255, 115, 0)")
      .build();
  }

  public static getDemon(): EnemyModel {
    return new EnemyBuilder()
      .enemyName("Poisoner")
      .enemyType(EnemyType.WARRIOR)
      .enemyImgPath("enemies_150_150/greenDemon1.png")
      .enemyBorderFrame("rgb(15, 115, 0)")
      .build();
  }

  public static getZombies(): EnemyModel {
    return new EnemyBuilder()
      .enemyName("Zombies")
      .enemyType(EnemyType.WARRIOR)
      .enemyImgPath("enemies_150_150/twoEnemies.png")
      .enemyBorderFrame("rgb(255, 15, 0)")
      .build();
  }

  public static getBullTank(): EnemyModel {
    return new EnemyBuilder()
      .enemyName("Bull Tank")
      .enemyType(EnemyType.WARRIOR)
      .enemyImgPath("enemies_150_150/bull_tank.png")
      .enemyBorderFrame("rgb(255, 215, 0)")
      .build();
  }

  public static getSkeletonTank(): EnemyModel {
    return new EnemyBuilder()
      .enemyName("Steal Bones")
      .enemyType(EnemyType.WARRIOR)
      .enemyImgPath("enemies_150_150/skeleton_warior.png")
      .enemyBorderFrame("rgb(0,255,127)")
      .build();
  }

  public static getSkeletonMage(): EnemyModel {
    return new EnemyBuilder()
      .enemyName("Magic Bones")
      .enemyType(EnemyType.WARRIOR)
      .enemyImgPath("enemies_150_150/skeleton_mage.png")
      .enemyBorderFrame("rgb(0,255,127)")
      .build();
  }

  public static getSkeletonBerserk(): EnemyModel {
    return new EnemyBuilder()
      .enemyName("Mad Bones")
      .enemyType(EnemyType.WARRIOR)
      .enemyImgPath("enemies_150_150/skeleton_berserk.png")
      .enemyBorderFrame("rgb(0,255,127)")
      .build();
  }

  public static getFireDragon(): EnemyModel {
    return new EnemyBuilder()
      .enemyName("Fire Dragon")
      .enemyType(EnemyType.WARRIOR)
      .enemyImgPath("enemies_150_150/fire_dragon.png")
      .enemyBorderFrame("rgb(255, 115, 100)")
      .build();
  }

  public static getBosses(): EnemyModel[] {
    return Array.of(
      this.getOrcMale(),
      this.getDemon(),
      this.getOrcMage(),
      this.getOrcBowMale(),
      this.getZombies(),
      this.getBullTank(),
      this.getFireDragon()
    );
  }

  public static getEvilLandsEnemies(): EnemyModel[] {
    return Array.of(
      this.getSkeletonBerserk(),
      this.getSkeletonMage(),
      this.getSkeletonTank()
    );
  }
}
