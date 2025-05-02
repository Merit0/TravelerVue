import {ILootChanceConfig} from "@/providers/loot-provider";

export class DropLootChanceConfigProvider {
    static getCommonDropChanceConfig(): ILootChanceConfig {
        return {
            common: 95,
            rare: 3,
            epic: 2,
            legend: 1
        };

    }
}