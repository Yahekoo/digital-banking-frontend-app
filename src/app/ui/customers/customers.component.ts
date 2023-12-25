import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../../services/customers.service';
import { Customer } from '../../model/customer.model';
import { Observable, catchError, map } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


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
              private fb : FormBuilder,
              private router : Router ) {}

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

    handleDelete(c:Customer){
      let confirmation = confirm("You are about to delete the customer "+c.name+", Are you super?");
      if(!confirmation) return;
      this.customerService.deleteCustomer(c.id).subscribe({
        next : (resp) => {
          this.customers = this.customers.pipe(map( data => {
            data.slice(data.indexOf(c),1);
            return data;
          }))
        },
        error : (err) => console.log(err.message)
      });
    }

    handleCustomerAccounts(c:Customer){
      this.router.navigateByUrl("/customer-accounts/"+c.id,{state:c});
    }


  }


