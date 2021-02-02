export class ResponseObj{
    status:number;
    message:String ;
    constructor(status:number,message:String){
        this.status=status;
        this.message=message;
    }
}