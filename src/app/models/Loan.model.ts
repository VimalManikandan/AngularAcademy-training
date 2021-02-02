import { User } from "./User.model";

export class Loan{
   public loanno: string;
   public fname: string;
   public lname: string;
   public paddress : string;
   public loanAmount: number;
   public loantype: string;
   public loanterm : number;
   public user: User;

   constructor (loanNo: string, fName: string,lName: string,
                propertyAddress : string,loanamount: number,
                loanType: string,loanTerm : number, user:User){
                    this.loanno=loanNo
                    this.fname=fName;
                    this.lname=lName;
                    this.paddress=propertyAddress;
                    this.loanAmount=loanamount;
                    this.loantype=loanType
                    this.loanterm=loanTerm;
                    this.user=user;
                }
}