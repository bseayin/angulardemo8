export class Mail {
    id : number;
    mailId:number;
    sid:number;//发送人id
    fid:number;//功能点id
    uid:number;//接收者ID
    sender:string;
    functionName:string;
    functionContent:string;
    sendTime:Date;
    toUserId:number;
  }