import {LootItemModel} from "@/models/LootItemModel";
import {LootItemBuilder} from "@/builders/LootItemBuilder";
import {Randomizer} from "@/utils/Randomizer";
import {ItemType} from "@/enums/ItemType";
import {Rarity} from "@/enums/Rarity";

export class HelmetProvider {
    private static helmetsFolderPath = "images/hero-equipment/helmets";

    public static getLeatherHelmet(): LootItemModel {
        return new LootItemBuilder()
            .lootItemName("Leather Helmet")
            .lootValue(Randomizer.getRandomIntInRange(20, 30))
            .price(20)
            .itemType(ItemType.HELM)
            .lootRarity(Rarity.COMMON)
            .lootItemImgPath(`${this.helmetsFolderPath}/common-type/pure-cap.png`)
            .build();
    }

    public static getExecutorHelm(): LootItemModel {
        return new LootItemBuilder()
            .lootItemName("Executor")
            .lootValue(50)
            .price(300)
            .itemType(ItemType.HELM)
            .lootRarity(Rarity.LEGEND)
            .lootItemImgPath(`${this.helmetsFolderPath}/legend-type/executor_helm.png`)
            .build();
    }

    public static getOblivorHelm(): LootItemModel {
        return new LootItemBuilder()
            .lootItemName("Oblivor")
            .lootValue(Randomizer.getRandomIntInRange(50, 100))
            .price(1500)
            .itemType(ItemType.HELM)
            .lootRarity(Rarity.MYTHIC)
            .lootItemImgPath(`${this.helmetsFolderPath}/mythic-type/oblivor-helm.png`)
            .build();
    }

    public static getCommonHelmetsList(): LootItemModel[] {
        return Array.of(this.getLeatherHelmet());
    }

    public static getLegendHelmetsList(): LootItemModel[] {
        return Array.of(this.getExecutorHelm());
    }
}