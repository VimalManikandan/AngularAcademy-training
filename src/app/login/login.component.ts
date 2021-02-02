import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/User.model';
import {Observable} from 'rxjs';

import { UserAuth } from '../models/UserAuth.model';
import { LoginService } from './login.service';
import { ResponseObj } from '../models/ResponseObj.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  errorMessgae : string;
  userName :string;
  usrPassword: string;
  LoggedUser: UserAuth;
  respObj:ResponseObj;
  logginStatus: number;
  user:User;

  constructor(private router:Router,
              private loginsrvc: LoginService){        
  }
  ngOnInit(): void {
      this.errorMessgae=null;
  }

  loginCheck(){
      this.errorMessgae='';
      this.loginsrvc.LoginUser(this.userName,this.usrPassword)
        .subscribe(
          data => {this.user=data;
               if(this.user!=null){
             localStorage.setItem('loggedUser',JSON.stringify(this.user)); 
              this.router.navigate(['home']);
            }
            else{
              this.errorMessgae="Username or Password is incorrect..!";
            }  
        },
        error=>{
          this.errorMessgae="Username or Password is incorrect..!";
          console.log("Error Occured");
        }
        );
  }
}
