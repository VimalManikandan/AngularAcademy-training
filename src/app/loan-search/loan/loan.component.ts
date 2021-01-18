import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Loan } from 'src/app/models/Loan.model';
import { LoanService } from '../loan.service';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styles: [
  ]
})
export class LoanComponent implements OnInit {

  
  modify: boolean =false;
  loanNodisable:boolean=true;
  disableInput: boolean= true;
  selectedLoan: Loan;
  
  fnMeassge:string =null;

  loanNo: string ;
  fName:string;
  lName:string;
  propertyAddress:string;
  loanAmount:number;
  loantype:string;
  lnTerm:number;
  vModify:string;

  constructor(private router: Router,
            private loanService:LoanService) { }

  ngOnInit(): void {    

    this.fnMeassge=null;

    this.vModify=localStorage.getItem('status');  
     console.log("Status="+this.vModify);
     localStorage.removeItem ('status');
     var slLoan=JSON.parse(localStorage.getItem('selectedLoan'));      
     localStorage.removeItem('selectedLoan');

    if (slLoan != null) {
      this.loanNo = slLoan.loanNo;
      this.fName = slLoan.fName;
      this.lName = slLoan.lName;
      this.propertyAddress = slLoan.propertyAddress;
      this.loanAmount = slLoan.loanamount;
      this.loantype = slLoan.loanType;
      this.lnTerm = slLoan.loanTerm;
     }
     
    if(this.vModify === 'MODIFY'){
      this.modify=true;
      this.disableInput=false;
    }
    else if(this.vModify === 'ADD'){
      this.modify=true;
      this.disableInput=false;
      this.loanNodisable=false;
    }
  }

  homeNavigate(){
    this.router.navigate(['home']);
  }

  saveOrUpdateLoan(){
      if(this.loanNo===null || this.fName===null|| this.lName===null||this.propertyAddress===null|| this.loanAmount===null ||this.loantype===null|| this.lnTerm==null){
        console.log("==>"+this.loanNo+"--"+ this.fName+"--"+ this.lName+"--"+this.propertyAddress+"--"+this.loanAmount+"--"+this.loantype+"--"+ this.lnTerm);
        this.fnMeassge='Please fill the blanks..!';
    }
    else{
        let obj=new Loan(this.loanNo, this.fName, this.lName,this.propertyAddress, this.loanAmount, this.loantype, this.lnTerm);
        this.loanService.addOrModifyLoan(obj);   
        this.fnMeassge='Datils hs been saved..!';
    }
  }

  clearFields(){
      this.fName = null;
      this.lName = null;
      this.propertyAddress = null;
      this.loanAmount = null;
      this.loantype = null;
      this.lnTerm = null;
  }

}
