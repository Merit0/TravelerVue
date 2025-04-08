type PositionValue = `${number}px` | `${number}%`;

export interface IPosition {
    readonly top?: PositionValue;
    readonly left?: PositionValue;
    readonly right?: PositionValue;
    readonly bottom?: PositionValue;
}

