
export interface AccHistory {
    accountId:     string;
    balance:       number;
    currentPage:   number;
    totalPages:    number;
    pageSize:      number;
    operationsDTO: OperationsDTO[];
}

export interface OperationsDTO {
    id:            number;
    operationDate: Date;
    amount:        number;
    type:          string;
}