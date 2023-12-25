import { Account } from "./account.model";

export interface CurrentAccount extends Account{
    overdraft : number;
}