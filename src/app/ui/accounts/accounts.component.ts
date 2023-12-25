import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../../services/accounts.service';
import { Observable, catchError, throwError } from 'rxjs';
import { Account } from '../../model/account.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AccHistory } from 'src/app/model/accHistory.model';
import { Debit } from 'src/app/model/operations.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  accountHistory!: Observable<AccHistory>;
  currentPage: number = 0;
  pageSize: number = 5;
  totalPages!: number;
  accounts!: Observable<Array<Account>> ;
  account!: Account | undefined;
  accountErrorMessage: string ="";
  accountsErrorMessage!: string;
  operationsErrorMessage!: string;
  searchFormGrp!:FormGroup;
  operationsFormGroup!:FormGroup;

  constructor(private accountService : AccountsService
    ,private fb : FormBuilder,private router: Router) {
      if(this.router.getCurrentNavigation()?.extras.state) {
        this.account = this.router.getCurrentNavigation()?.extras.state as Account;
      };
     }

  ngOnInit(): void {
      this.searchFormGrp = this.fb.group({
        accountId :  this.fb.control(undefined) 
      });

      this.operationsFormGroup = this.fb.group({
        operationType : this.fb.control(null),
        amount : this.fb.control(null),
        destination : this.fb.control(null)
      })
      this.accounts = this.getAccountsList();
  }

  getAccountsList() {
    return this.accountService.getAccList().pipe(catchError(err => {
      this.accountsErrorMessage = err.message;
      throw(err);
    }));
  }
  getAccountOperations(id:string) {
    this.accountHistory =  this.accountService.getAccOperations(id,this.currentPage,this.pageSize);
    this.accountHistory.subscribe({
      next : data => this.totalPages = data.totalPages
    })
  }

  handleSearchAccount() {
    let accId : string = this.searchFormGrp.value.accountId;
    if(accId == undefined) {
      accId = this.account!.id;
    }
    if(accId == "") {
      this.accountErrorMessage = "";
      return;
    }
     this.accountService.searchAccount(accId).subscribe({
      next : data => {
        this.account = data
        this.accountErrorMessage = "";
      },
      error : err => {
        this.accountErrorMessage = err.message;
        this.account = undefined;
      }
     })

}

  refreshOperations(next : number){
    if(!this.accountHistory) {
      this.getAccountOperations(this.account!.id);
    }
    this.currentPage = next;
    this.getAccountOperations(this.account!.id);
  }

  handleOperation() {

    let accId = this.account!.id ;
    let operationType = this.operationsFormGroup.value.operationType;
    let amount = this.operationsFormGroup.value.amount;
    if(operationType == "DEBIT") {
      let op = {
        accountId : accId,
        amount : amount
      }
       this.accountService.debiter(op).subscribe({
        next : () => {this.refreshOperations(0);this.handleSearchAccount()},
        error : err => console.log(err)
      });
    } else if(operationType == "CREDIT") {
      let op = {
        accountId : accId,
        amount : amount
      }
      this.accountService.crediter(op).subscribe({
        next : () => {this.refreshOperations(0);this.handleSearchAccount()},
        error : err => console.log(err)
      });

    } else if(operationType == "TRANSFERT") {
      let destination = this.operationsFormGroup.value.destination;
      let op = {
        accountSourceId : accId,
        accountTargetId : destination,
        amount : amount,
      }
      this.accountService.transferer(op).subscribe({
        next : () => {this.refreshOperations(0);this.handleSearchAccount()},
        error : err => console.log(err)
      });
    }

    

  }
}