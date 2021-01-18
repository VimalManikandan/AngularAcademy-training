import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Loan } from '../models/Loan.model';
import { searchFilter } from '../models/searchFilter.model';
import { LoanService } from './loan.service';

@Component({
  selector: 'app-loan-search',
  templateUrl: './loan-search.component.html',
  styles: [
  ]
})
export class LoanSearchComponent implements OnInit {

  userType: boolean = false;

  matching_loans: Loan[];

  loanNo: string;
  fName: string;
  lName: string;
  sFilter: searchFilter;

  constructor(private router: Router,
    private loanService: LoanService) { }

  ngOnInit(): void {

    var userobj = JSON.parse(localStorage.getItem('loggedUser'));
    if (userobj != null && userobj.type === 'ADMIN') {
      this.userType = true;
    }
  }

  logingOut() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  addNewLoan() {
    localStorage.setItem('status', "ADD");
    this.router.navigate(['loanDetails']);
  }

  serchLoan() {
    this.sFilter = new searchFilter(this.loanNo, this.fName, this.lName);
    this.matching_loans = this.loanService.loanSearch(this.sFilter);
    this.loanNo = null;
    this.fName = null;
    this.lName = null;
  }

  viewLoanDetails(selectedLoan: Loan) {
    localStorage.setItem('selectedLoan', JSON.stringify(selectedLoan));
    localStorage.setItem('status', "VIEW");
    this.router.navigate(['loanDetails']);
  }

  modifyLoanDetails(selectedLoan: Loan) {
    localStorage.setItem('selectedLoan', JSON.stringify(selectedLoan));
    localStorage.setItem('status', "MODIFY");
    this.router.navigate(['loanDetails']);
  }

  clearSearch() {
    this.loanNo = null;
    this.fName = null ;
    this.lName = null;
  }


}
