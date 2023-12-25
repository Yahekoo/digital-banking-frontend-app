import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from 'src/app/model/account.model';
import { Customer } from 'src/app/model/customer.model';
import { AccountsService } from 'src/app/services/accounts.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-costumer-accounts',
  templateUrl: './costumer-accounts.component.html',
  styleUrls: ['./costumer-accounts.component.css']
})
export class CostumerAccountsComponent implements OnInit {

  customerId!: number;
  customer!: Customer;
  accounts!: Observable<Array<Account>>;
  constructor(private activatedRoute:ActivatedRoute,
     private router:Router, private accountService : AccountsService) { 

    this.customer = this.router.getCurrentNavigation()?.extras.state as Customer;
  }

  ngOnInit(): void {
    this.customerId = this.activatedRoute.snapshot.params['id'];
    this.accounts = this.accountService.customerAccounts(this.customerId);
  }

  manageAccount(acc:Account) {
    this.router.navigateByUrl("/accounts",{state:acc});
  }

}
