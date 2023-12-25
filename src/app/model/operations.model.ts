export interface Debit{
    accountId : string,
    amount : number
}

export interface Credit{
    accountId : string,
    amount : number
}

export interface Transfert{
    accountSourceId : string,
    accountTargetId : string,
    amount : number
}