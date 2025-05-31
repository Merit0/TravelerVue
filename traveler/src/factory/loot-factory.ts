import {EnemyType} from "@/enums/EnemyType";
import {LootItemModel} from "@/models/LootItemModel";
import {WeaponProvider} from "@/providers/WeaponProvider";
import {CoinsProvider} from "@/providers/coins-provider";
import {Randomizer} from "@/utils/Randomizer";
import {Rarity} from "@/enums/Rarity";
import {EquipmentGroupProvider} from "@/providers/equipment-group-provider";
import {DropChanceGenerator, IDropChance, RarityChanceMap} from "@/utils/drop-chance-generator";
import {ElixirsProvider} from "@/providers/elixir-provider";
import {AnimalLootGenerator} from "@/utils/enemy-utils/animal-loot-generator";
import EnemyModel from "@/models/EnemyModel";

export class LootFactory {
    static getLootFromEnemy(enemyModel: EnemyModel): LootItemModel[] {
        const loot: LootItemModel[] = [];
        const dropChances: IDropChance = new DropChanceGenerator(enemyModel.enemyType).generate();

        const coinChance = dropChances.coinChance;
        if (Randomizer.roll(coinChance)) {
            loot.push(CoinsProvider.getCoinsByEnemyType(enemyModel.enemyType));
        }

        const potionChance = dropChances.potionChance;
        if (Randomizer.roll(potionChance)) {
            loot.push(ElixirsProvider.getEnemyElixir(enemyModel.enemyType));
        }

        const equipmentChance = dropChances.itemDropChance;
        if (Randomizer.roll(equipmentChance)) {
            if (enemyModel.enemyType === EnemyType.ANIMAL) {
                const item: LootItemModel = AnimalLootGenerator.generateSkinLoot(enemyModel.name)
                if (item) loot.push(item);
                return loot;
            }
            const rarityMap: RarityChanceMap = new DropChanceGenerator(enemyModel.enemyType).generateRarityMap();
            const rarity = Randomizer.weightedRollFromMap(rarityMap);
            const item = LootFactory.getRandomItemByRarity(rarity);
            if (item) loot.push(item);
        }

        return loot;
    }

    private static getRandomItemByRarity(rarity: Rarity): LootItemModel | null {
        const pool: LootItemModel[] = {
            [Rarity.MYTHIC]: EquipmentGroupProvider.getMythicEquipment?.() ?? [],
            [Rarity.LEGEND]: WeaponProvider.getLegends?.() ?? [],
            [Rarity.EPIC]: EquipmentGroupProvider.getCommonEquipment?.() ?? [],
            [Rarity.RARE]: EquipmentGroupProvider.getCommonEquipment?.() ?? [],
            [Rarity.COMMON]: EquipmentGroupProvider.getCommonEquipment?.() ?? [],
        }[rarity];

        return Randomizer.pickOne(pool);
    }
}