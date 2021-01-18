import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuth } from '../models/UserAuth.model';
import { LoginService } from './login.service';

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

  constructor(private router:Router,
              private loginsrvc: LoginService){        
  }
  ngOnInit(): void {
      this.errorMessgae=null;
  }

  loginCheck(){
      this.errorMessgae='';
      this.LoggedUser= this.loginsrvc.checkLogin(this.userName,this.usrPassword);

      
      if(this.LoggedUser=== undefined){
          this.errorMessgae="Username or Password is incorrect..!";
      }
      else{
          localStorage.setItem('loggedUser',JSON.stringify(this.LoggedUser)); 
          this.router.navigate(['home']);   
      }  
  }
}
