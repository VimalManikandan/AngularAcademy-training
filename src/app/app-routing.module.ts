import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 import { LoanSearchComponent } from './loan-search/loan-search.component';
 import { LoanComponent } from './loan-search/loan/loan.component';
 import {LoginComponent} from "./login/login.component"


export const appRouts: Routes = [
  {path :'', redirectTo :'/login', pathMatch: 'full'},
  {path: 'login', component : LoginComponent} ,
   {path: 'home', component : LoanSearchComponent} ,
   {path: 'loanDetails', component : LoanComponent} ,
];

@NgModule({
  imports: [RouterModule.forRoot(appRouts)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
