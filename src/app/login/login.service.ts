import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ResponseObj } from "../models/ResponseObj.model";
import { User } from "../models/User.model";
import { UserAuth } from "../models/UserAuth.model";


@Injectable()
export class LoginService{

        userName : string ;
        userPassword: string;
        rsltUser: UserAuth;

        constructor(private http: HttpClient){ }


        private users :UserAuth[]=[
            new UserAuth ('User1','pwd123','USER'),
            new UserAuth('User2','123pwd','ADMIN')
        ];
        
        public getAllUsers(){
             return this.http.get("http://localhost:8765/login-server/userApi/get/4") ;
        }
        public LoginUser(userName:String,userPwd:String){
           let request = {
                "username" :userName,
	            "userpwd" :userPwd,
             };
             const httpOptions = {
                headers: new HttpHeaders({
                  'Content-Type':  'application/json'                
                })
              };
            return  this.http.post<User>("http://localhost:8765/login-server/loginApi/login", request,httpOptions);
        }
        
}