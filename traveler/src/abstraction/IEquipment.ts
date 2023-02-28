interface IEquipment extends IGameItem, IEquipmentProps {
    getRarity: Rarity;
    getStats: IEquipmentProps;
}