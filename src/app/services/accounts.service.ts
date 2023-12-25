import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../model/account.model';
import { environment } from 'src/environments/environment';
import { AccHistory } from '../model/accHistory.model';
import { Credit, Debit, Transfert } from '../model/operations.model';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private http : HttpClient) { }


  getAccList() : Observable<Array<Account>> {
    return this.http.get<Array<Account>>(environment.backend+"/accounts");
  }

  searchAccount(id:string): Observable<Account> {
    
     return this.http.get<Account>(environment.backend+"/accounts/"+id)
  }

  getAccOperations(id:string,page:number,size:number) : Observable<AccHistory> {
    
    return this.http.get<AccHistory>(environment.backend+"/accounts/"+id+"/acc_history"+"?page="+page+"&size="+size);
  }

  debiter(op : Debit) : Observable<Debit> {
   
    return this.http.post<Debit>(environment.backend+"/accounts/debit",op);
  }

  crediter(op : Credit) : Observable<Credit> {
  
    return this.http.post<Credit>(environment.backend+"/accounts/credit",op);
  }

  transferer(op : Transfert) : Observable<Transfert> {
    
    return this.http.post<Transfert>(environment.backend+"/accounts/transfert",op);
  }

  customerAccounts(id : number) : Observable<Array<Account>> {
    
    return this.http.get<Array<Account>>(environment.backend+"/customerAccounts/"+id);
  }
 }
