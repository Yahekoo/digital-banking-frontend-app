import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomersService } from '../../services/customers.service';
import { Customer } from '../../model/customer.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit {

  saveFormGroup!:FormGroup;
  

  constructor(private customerService : CustomersService,private fb : FormBuilder, private router : Router) {}

  ngOnInit(): void {

    this.saveFormGroup = this.fb.group({
      name: this.fb.control("",[Validators.required,Validators.minLength(3)]),
      email:this.fb.control("",[Validators.required, Validators.email])
    })

  }

  saveCustomerHandler() {
    let customer: Customer = this.saveFormGroup.value;
    console.log(customer);
    this.customerService.saveCustomer(customer).subscribe({
      next : data => {
        alert("The customer has been successfully !");
        this.saveFormGroup.reset();
        this.router.navigateByUrl("/customers");

      } ,
      error : err => console.error(err)
    });
    }

    
}
