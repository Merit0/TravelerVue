export interface IDoorKey {
    keyId: string;
    keyName: string;
    description?: string;
    imagePath: string;
    isConsumable: boolean;
}

export class DoorKeyModel implements IDoorKey {
    private readonly _keyId: string;
    private _keyName: string;
    private _description?: string;
    private _imagePath: string;
    private _isConsumable: boolean;

    constructor({
                    keyId,
                    keyName,
                    description,
                    imageFileName = "default-key.png",
                    isConsumable = false,
                }: {
        keyId: string;
        keyName: string;
        description?: string;
        imageFileName?: string;
        isConsumable?: boolean;
    }) {
        this._keyId = keyId;
        this._keyName = keyName;
        this._description = description;
        this._imagePath = `/images/keys/${imageFileName}`;
        this._isConsumable = isConsumable;
    }

    get keyId(): string {
        return this._keyId;
    }

    get keyName(): string {
        return this._keyName;
    }

    set keyName(value: string) {
        this._keyName = value;
    }

    get description(): string | undefined {
        return this._description;
    }

    set description(value: string | undefined) {
        this._description = value;
    }

    get imagePath(): string {
        return this._imagePath;
    }

    set imagePath(fileName: string) {
        this._imagePath = `/images/keys/${fileName}`;
    }

    get isConsumable(): boolean {
        return this._isConsumable;
    }

    set isConsumable(value: boolean) {
        this._isConsumable = value;
    }

    toJSON() {
        return {
            keyId: this._keyId,
            keyName: this._keyName,
            description: this._description,
            imagePath: this._imagePath,
            isConsumable: this._isConsumable,
        };
    }

    static fromJSON(json: any): DoorKeyModel {
        return new DoorKeyModel({
            keyId: json.keyId,
            keyName: json.keyName,
            description: json.description,
            imageFileName: json.imagePath?.split("/").pop() || "default-key.png",
            isConsumable: json.isConsumable,
        });
    }
}
