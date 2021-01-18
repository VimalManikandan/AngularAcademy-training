import { Injectable } from "@angular/core";
import { Loan } from "../models/Loan.model";
import { searchFilter } from "../models/searchFilter.model";

@Injectable()
export class LoanService {

  count: number;

  loans: Loan[] = [
    new Loan("loan1001", "Sujith", "AK", "Palakkad-Kerala", 1000, "Housing", 60),
    new Loan("loan1002", "Vimal", "V", "Palakkad-Kerala", 8000, "Housing", 60),
    new Loan("loan1003", "Vivek", "V", "Palakkad-Kerala", 1000, "Housing", 60),
    new Loan("loan1004", "Libindas", "P", "Palakkad-Kerala", 1000, "Housing", 60)
  ];

  loanSearch(searchf: searchFilter) {

    var matching_loans = this.loans.filter((item) => {
      this.count = 0;
      for (var key in searchf) {
        if (searchf[key] === undefined) {
          this.count = this.count + 1;
        }
        if ((searchf[key] != undefined) && (item[key] != searchf[key])) {
          console.log(searchf[key]);
          return false;
        }
      }
      if (this.count == 3) {
        return false;
      }
      else {
        return true;
      }
    });
    return matching_loans;
  }

  addOrModifyLoan(loan: Loan) {
    let itemIndex = this.loans.findIndex(item => item.loanNo == loan.loanNo);
    if (loan == undefined) {
      return false;
    }
    if (itemIndex >= 0) {
      this.loans.splice(itemIndex, itemIndex, loan);
      return true;
    }
    else {
      this.loans.splice(this.loans.length, this.loans.length, loan);
      return true;
    }

  }

}