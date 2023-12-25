import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomersComponent} from './ui/customers/customers.component';
import {AccountsComponent} from './ui/accounts/accounts.component';
import { NewCustomerComponent } from './ui/new-customer/new-customer.component';
import { CostumerAccountsComponent } from './ui/costumer-accounts/costumer-accounts.component';

const routes: Routes = [
    {path:"customers", component: CustomersComponent},
    {path:"accounts", component: AccountsComponent},
    {path:"add-customer", component: NewCustomerComponent},
    {path:"customer-accounts/:id", component: CostumerAccountsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
