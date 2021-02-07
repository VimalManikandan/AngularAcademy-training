import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Loan } from '../models/Loan.model';
import { searchFilter } from '../models/searchFilter.model';
import { User } from '../models/User.model';
import { LoanService } from './loan.service';

@Component({
  selector: 'app-loan-search',
  templateUrl: './loan-search.component.html',
  styleUrls: ['./loan-search.component.css']
})
export class LoanSearchComponent implements OnInit {

  userType: boolean = false;
  matching_loans: Loan[];
  loanNo: string;
  fName: string;
  lName: string;
  sFilter: searchFilter;
  user: User;

  constructor(private router: Router,
    private loanService: LoanService) { }

  ngOnInit(): void {

    var userobj = JSON.parse(localStorage.getItem('loggedUser'));

    if (userobj != null && userobj.usertype === 'ADMIN') {
      this.userType = true;
    }
    if (userobj != null) {
      this.user = userobj;
      console.log(this.user.userid);
    }
  }

  logingOut() {

    this.loanService.logoutUser(this.user).subscribe(
      data => {
        localStorage.clear();
        console.log("-->" + data.message);
        this.router.navigate(['login']);
      },
      error => {
        console.log("Error occured");
        window.alert("Server Error..!");
      }
    );

  }

  addNewLoan() {
    localStorage.setItem('status', "ADD");
    this.router.navigate(['loanDetails']);
  }

  serchLoan() {
    this.matching_loans = [];
    console.log("Before Search :" + this.loanNo + " --" + this.fName + "--" + this.lName);
    if ((this.loanNo == undefined || this.loanNo == null) && (this.fName == undefined || this.fName == null) && (this.lName == undefined || this.lName == null)) {
      this.matching_loans = [];
    }
    else {
      this.sFilter = new searchFilter(this.loanNo, this.fName, this.lName);
      this.loanService.loanSearch(this.sFilter).subscribe(
        data => {
          this.matching_loans = data;
        },
        error => {
          console.log("Error Happened")
          window.alert("Something went wrong");
        }
      );
      this.loanNo = null;
      this.fName = null;
      this.lName = null;
    }
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
  deleteLoan(selectedLoan: Loan) {
    var userobj = JSON.parse(localStorage.getItem('loggedUser'));
    if (userobj != null) {
      this.loanService.deleteLoan(selectedLoan.loanno, userobj.userid)
        .subscribe(
          data => {
            if (data.status == 200) {
              window.alert("Selected loan has deleted");
            }
          },
          error => {
            console.log("Error Happened");
            window.alert("Something went wrong");
          }
        );
    }
    else {
      console.log("User Not Available");
    }
  }
  clearSearch() {
    this.loanNo = null;
    this.fName = null;
    this.lName = null;
  }
}
