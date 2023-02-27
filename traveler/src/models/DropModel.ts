import { IDrop } from "@/abstraction/IDrop";

export class DropModel implements IDrop {
    name: string;
    getAmount: () => number;
    getName: string;
    getDiscription?: () => string;

}