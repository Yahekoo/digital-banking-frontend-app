import { Customer } from "./customer.model";

export interface Account {
    id:string;
    balance : number;
    customerDTO: Customer;
    createdAt: Date;
    status : string;
    type : string;
}