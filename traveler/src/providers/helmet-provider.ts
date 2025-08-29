import {LootItemModel} from "@/models/LootItemModel";
import {LootItemBuilder} from "@/builders/LootItemBuilder";
import {Randomizer} from "@/utils/Randomizer";
import {ItemType} from "@/enums/ItemType";
import {Rarity} from "@/enums/Rarity";

export class HelmetProvider {
    private static helmetsFolderPath = "/images/hero-equipment/helmets";

    public static getIronHat(): LootItemModel {
        return new LootItemBuilder()
            .lootItemName("Iron Hat")
            .lootValue(Randomizer.getRandomIntInRange(20, 30))
            .price(70)
            .itemType(ItemType.HELM)
            .lootRarity(Rarity.COMMON)
            .lootItemImgPath(`${this.helmetsFolderPath}/common-type/iron-hat/iron-hat.png`)
            .lootItemPoseImgPath(`${this.helmetsFolderPath}/common-type/iron-hat/iron-hat-pose.png`)
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
        return Array.of(this.getIronHat());
    }

    public static getLegendHelmetsList(): LootItemModel[] {
        return Array.of(this.getExecutorHelm());
    }
}