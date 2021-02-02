export class User{
     userid: number;
     username: String;
     userpwd:String;
     usertype:String;
     jwtToken:String;

    constructor(userid: number,username: String, 
        userpwd:String,usertype:String,jwtToken:String)
        {
             this.userid=userid;
             this.username=username;
            this.userpwd=userpwd;
             this.usertype=usertype;
             this.jwtToken=jwtToken;
        }
}


