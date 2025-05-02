import {LootItemModel} from "@/models/LootItemModel";
import {EquipmentGroupProvider} from "@/providers/equipment-group-provider";
import {ElixirsProvider} from "@/providers/elixir-provider";
import {CoinsProvider} from "@/providers/coins-provider";
import {Randomizer} from "@/utils/Randomizer";

export interface ILootChanceConfig {
    common: number,
    rare: number,
    epic: number,
    legend: number,
}

export class EnemyLootProvider {
    static getLoot(dropChanceConfig: ILootChanceConfig): LootItemModel[] {
        const loot: LootItemModel[] = [];

        if (Randomizer.getChance(30)) {
            loot.push(ElixirsProvider.getCommonElixir());
        } else {
            const coinsNumber = Randomizer.getRandomIntInRange(1, 3);
            loot.push(CoinsProvider.getCoins(coinsNumber));
        }

        if (Randomizer.getChance(30)) {
            const roll = Math.random() * 100;
            let item: LootItemModel | null;

            if (roll < dropChanceConfig.common) {
                item = Randomizer.getRandomEquipment(EquipmentGroupProvider.getCommonEquipment());
            } else if (roll < dropChanceConfig.rare) {
                item = Randomizer.getRandomEquipment(EquipmentGroupProvider.getRareEquipment());
            } else if (roll < dropChanceConfig.epic) {
                item = Randomizer.getRandomEquipment(EquipmentGroupProvider.getEpicEquipment());
            } else if (roll < dropChanceConfig.legend) {
                item = Randomizer.getRandomEquipment(EquipmentGroupProvider.getLegendEquipment());
            } else {
                item = Randomizer.getRandomEquipment(EquipmentGroupProvider.getMythicEquipment());
            }

            if (item) loot.push(item);
        }

        return loot;
    }
}
