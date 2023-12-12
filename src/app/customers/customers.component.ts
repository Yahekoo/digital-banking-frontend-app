import { Component, OnInit } from '@angular/core';

import { HttpClient} from '@angular/common/http';
import { CustomersService } from '../services/customers.service';
import { Customer } from '../model/customer.model';
import { Observable, catchError } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers! : Observable<Array<Customer>>;
  errorMessage! : string;
  searchFormGroup : FormGroup | undefined;
  constructor(private customerService : CustomersService,
              private fb : FormBuilder ) {}

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword : this.fb.control("")
    });
    this.handleSearchCustomer();
  }


  handleSearchCustomer() {
    let keyword:string = this.searchFormGroup?.value.keyword;
    console.log(keyword);
    this.customers = this.customerService.getCustomerByName(keyword).pipe(
      catchError( err => {
        this.errorMessage = err.message
        throw new Error(err);
      })
    );
    }


  }


