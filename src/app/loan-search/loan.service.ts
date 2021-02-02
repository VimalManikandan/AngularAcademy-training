import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Loan } from "../models/Loan.model";
import { ResponseObj } from "../models/ResponseObj.model";
import { searchFilter } from "../models/searchFilter.model";
import { User } from "../models/User.model";

@Injectable()
export class LoanService {
 

  count: number;

  constructor(private http:HttpClient){}

  loanSearch(searchf: searchFilter) {

    let header= new HttpHeaders();
    header.append('Content-Type', 'application/json');
    let params = new HttpParams()
    

    searchf.loanNo=(searchf.loanNo==undefined)?null:searchf.loanNo;
    searchf.fName=(searchf.fName==undefined)?null:searchf.fName;
    searchf.lName=(searchf.lName==undefined)?null:searchf.lName;

    params=params.set("loanNo",searchf.loanNo);
    params=params.set("fName",searchf.fName);
    params=params.set("lName",searchf.lName);

    console.log(""+searchf.loanNo+"-"+searchf.fName+"-"+searchf.lName);
    return this.http.get<Loan[]>('http://localhost:8765/loan-server/loanApi/searchLoan', {headers:header,params:params}); 
  }

  deleteLoan(loanno: string, userid: any) {
    let header= new HttpHeaders();
    header.append('Content-Type', 'application/json');
    let params = new HttpParams();
    params=params.set("userId",userid);
    return this.http.delete<ResponseObj>('http://localhost:8765/loan-server/loanApi/deleteLoan/'+loanno,{headers:header,params:params});
  }

  addLoan(loan:Loan):Observable<any>{
    console.log("Inside addLoan=>",loan);
    const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'                
    })
  };
  return this.http.post<Observable<Loan>>('http://localhost:8765/loan-server/loanApi/create',loan,httpOptions);
  }

  logoutUser(user:User) :Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'                
      })
    };
    return this.http.post<Observable<ResponseObj>>('http://localhost:8765/login-server/loginApi/logout',user,httpOptions);
  }
    // const httpOptions = {
    //   // headers: new HttpHeaders({
    //   //   'Content-Type':  'application/json'                
    //   // })
    // };
    //,user,httpOptions
  // return this.http.get<ResponseObj>('http://localhost:8765/login-server/loginApi/login') ;

 // }

  // addOrModifyLoan(loan: Loan) {
  //   //let itemIndex = this.loans.findIndex(item => item.loanNo == loan.loanNo);
  //    if (loan == undefined) {
  //      return false;
  //    }
  
  //   // if (itemIndex >= 0) {
  //   //   this.loans.splice(itemIndex, itemIndex, loan);
  //   //   return true;
  //   // }
  //   // else {
  //   //   this.loans.splice(this.loans.length, this.loans.length, loan);
  //   //   return true;
  //   // }

   

}