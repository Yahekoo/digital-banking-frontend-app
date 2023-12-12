import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Observable, catchError, throwError} from 'rxjs';
import { Customer } from '../model/customer.model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CustomersService {

 

  constructor(private http:HttpClient) {}

  public getCustomers():Observable<Array<Customer>> {
    return this.http.get<Array<Customer>>(environment.backend+"/customers");
  }

  public getCustomer(id : number) : Observable<any> {
    return this.http.get(environment.backend+"/customers/"+id);
  }

  public getCustomerByName(keyword : string) : Observable<Array<Customer>> {
    return this.http.get<Array<Customer>>(environment.backend+"/customers/searchCustomer?keyword="+keyword);
  }

}
