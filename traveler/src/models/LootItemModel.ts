import { IHeroItem } from '@/abstraction/IHeroItem'
import { ItemType } from '@/enums/ItemType';
import { Rarity } from '@/enums/Rarity';

export class LootItemModel implements IHeroItem {

    name: string;
    value: number;
    imgPath: string;
    borderFrame: string;
    itemType: ItemType;
    rarity: Rarity;

}