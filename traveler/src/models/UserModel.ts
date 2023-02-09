export class UserModel {

    private name = "";
    private username = "";
    private password = "";
    private id: number;

    constructor() {
        this.id = 0;
    }

    public addName(name: string): UserModel {
        this.name = name;
        return this;
    }

    public addUsername(username: string): UserModel {
        this.username = username;
        return this;
    }


    public addPassword(password: string): UserModel {
        this.password = password;
        return this;
    }

    public getId(): number {
        return this.id;
    }

    public getUsername(): string {
        return this.username;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): UserModel {
        this.name = name;
        return this;
    }

    public setUsername(username: string): UserModel {
        this.username = username;
        return this;
    }

    public setId(id: number): UserModel {
        this.id = id;
        return this;
    }

    public toString(): void {
        console.log(
            "Username: " + this.username,
            "User id: " + this.id,
            "Password: " + this.password
        );
    }

    public build(): UserModel {
        return new UserModel()
            .addName(this.name)
            .addUsername(this.username)
            .addPassword(this.password);
    }
}