export class UserAuth{
    public uName: string;
    public pwd: string;
    public type: string;

    constructor(uName: string,pwd: string,type: string){
        this.uName=uName;
        this.pwd=pwd;
        this.type=type;
    }
}