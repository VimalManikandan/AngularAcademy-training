import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginService } from './login/login.service';
import { LoanSearchComponent } from './loan-search/loan-search.component';
import { LoanComponent } from './loan-search/loan/loan.component';
import { LoanService } from './loan-search/loan.service';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoanSearchComponent,
    LoanComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [LoanService,LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
