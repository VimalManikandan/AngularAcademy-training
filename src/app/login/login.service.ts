import { Injectable } from "@angular/core";
import { UserAuth } from "../models/UserAuth.model";

@Injectable()
export class LoginService{

        userName : string ;
        userPassword: string;
        rsltUser: UserAuth;

        private users :UserAuth[]=[
            new UserAuth ('User1','pwd123','USER'),
            new UserAuth('User2','123pwd','ADMIN')
        ];
        
        checkLogin(userName: string, userPwd: string){
        let rsltUser=  this.users.filter((user)=>{
               if(user.uName=== userName && user.pwd===userPwd){
                   return true;
               }
           })
        return rsltUser[0];
        }

}