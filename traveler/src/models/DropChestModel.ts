import { IDrop } from '../abstraction/IDrop';
export class DropChestModel implements IDrop {
    name: string;
    getName: string;
    getDiscription?: () => string;

}