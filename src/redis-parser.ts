export class ReddisParser{
  private command:string;
  private arguments:string;
  constructor(data:string){
    this.command=data.split(' ')[0];
    this.arguments=data.split(' ')
      .filter((word) => word !== this.command)
      .join(' ');
  }

  getCommand():string{
    return this.command;
  }

  getArgs():string{
    return this.arguments;
  }
}
