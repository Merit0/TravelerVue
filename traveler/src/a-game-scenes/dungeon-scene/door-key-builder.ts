import { DoorKeyModel } from "./door-key-model";

export class DoorKeyBuilder {
    private _keyId: string;
    private _keyName: string;
    private _description?: string;
    private _imageFileName = "default-key.png";
    private _isConsumable = false;

    id(id: string): this {
        this._keyId = id;
        return this;
    }

    name(name: string): this {
        this._keyName = name;
        return this;
    }

    description(desc: string): this {
        this._description = desc;
        return this;
    }

    image(fileName: string): this {
        this._imageFileName = fileName;
        return this;
    }

    consumable(isConsumable: boolean): this {
        this._isConsumable = isConsumable;
        return this;
    }

    build(): DoorKeyModel {
        if (!this._keyId || !this._keyName) {
            throw new Error("ID and name are required to build a door key!");
        }

        return new DoorKeyModel({
            keyId: this._keyId,
            keyName: this._keyName,
            description: this._description,
            imageFileName: this._imageFileName,
            isConsumable: this._isConsumable,
        });
    }
}
