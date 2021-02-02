import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Loan } from 'src/app/models/Loan.model';
import { User } from 'src/app/models/User.model';
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
  loanNoshow :boolean=true;
  fnMeassge:string =null;

  loanNo: string ;
  fName:string;
  lName:string;
  propertyAddress:string;
  loanAmount:number;
  loantype:string;
  lnTerm:number;
  vModify:string;
  user:User;

  constructor(private router: Router,
            private loanService:LoanService) { }

  ngOnInit(): void {    

    this.fnMeassge=null;

    var userobj = JSON.parse(localStorage.getItem('loggedUser'));
    if(userobj!=null){
        this.user=new User(userobj.userid,userobj.username,
          userobj.userpwd,userobj.usertype,userobj.jwtToken);
    }
  
     this.vModify=localStorage.getItem('status');  
     console.log("Status="+this.vModify);
     localStorage.removeItem ('status');
     var slLoan=JSON.parse(localStorage.getItem('selectedLoan'));      
     localStorage.removeItem('selectedLoan');

    if (slLoan != null) {
      this.loanNo = slLoan.loanno;
      this.fName = slLoan.fname;
      this.lName = slLoan.lname;
      this.propertyAddress = slLoan.paddress;
      this.loanAmount = slLoan.loanAmount;
      this.loantype = slLoan.loantype;
      this.lnTerm = slLoan.loanterm;
     }
     
    if(this.vModify === 'MODIFY'){
      this.modify=true;
      this.disableInput=false;
      this.loanNoshow=true;
      this.loanNodisable=true;
    }
    else if(this.vModify === 'ADD'){
      this.modify=true;
      this.disableInput=false;
      this.loanNoshow=false;
    }
  }

  homeNavigate(){
    this.router.navigate(['home']);
  }
  addNewLoan(){
    if( this.fName===null|| this.lName===null||this.propertyAddress===null|| this.loanAmount===null ||this.loantype===null|| this.lnTerm==null){
      console.log("addLoan==>"+this.loanNo+"--"+ this.fName+"--"+ this.lName+"--"+this.propertyAddress+"--"+this.loanAmount+"--"+this.loantype+"--"+ this.lnTerm+"--"+this.user.userid);
      this.fnMeassge='Please fill the blanks..!';
  }
  else{
    let obj=new Loan(this.loanNo, this.fName, this.lName, this.propertyAddress, this.loanAmount, this.loantype, this.lnTerm, this.user);
    console.log("addLoan==>"+this.loanNo+"--"+ this.fName+"--"+ this.lName+"--"+this.propertyAddress+"--"+this.loanAmount+"--"+this.loantype+"--"+ this.lnTerm+"--"+this.user.username+this.user.usertype);
    this.loanService.addLoan(obj)

  }
  }

  saveOrUpdateLoan(){
      if( this.fName===null||this.fName===undefined||
         this.lName===null||this.lName===undefined ||
         this.propertyAddress===null||this.propertyAddress===undefined||
         this.loanAmount===null ||this.loanAmount===undefined ||
         this.loantype===null||this.loantype===undefined || this.lnTerm==null ||this.lnTerm==undefined){
        console.log("==>"+this.loanNo+"--"+ this.fName+"--"+ this.lName+"--"+this.propertyAddress+"--"+this.loanAmount+"--"+this.loantype+"--"+ this.lnTerm+"--"+this.user.userid);
        this.fnMeassge='Please fill the blanks..!';
    }
    else{       
        let obj=new Loan(this.loanNo, this.fName, this.lName, this.propertyAddress, this.loanAmount, this.loantype, this.lnTerm, this.user);
        console.log("==>"+this.loanNo+"--"+ this.fName+"--"+ this.lName+"--"+this.propertyAddress+"--"+this.loanAmount+"--"+this.loantype+"--"+ this.lnTerm+"--"+this.user.username+this.user.usertype);
        let result=this.loanService.addLoan(obj) 
        .subscribe(
          data=>{
            console.log(JSON.stringify(data));
            this.fnMeassge="Details has been saved..!";
          },
          error=>{
            this.fnMeassge="Something went Wrong..!";
            console.log("Error Happened")      
          }
        );                
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
