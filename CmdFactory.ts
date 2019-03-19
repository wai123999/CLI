/// <reference path="Canvas.ts" />

abstract class CmdFactory{
   //有了這個..這個版本的cli可以用不同的cmd組合
   abstract runCmd(cmdStr : string) : string;
}

class UnixFactory extends CmdFactory{
    runCmd(cmdStr : string) : string {
        let rStr;
        switch ( cmdStr )
        {
           case  "mkdir":
                 rStr = "Make a directory";
                 break;
        }
        return rStr;
    }
}


abstract class AllOS {
   _userFilePath : string;
   _canvas : Canvas;
   _ctx : any;
   _gap : number;
   _cursorPosX : number;
   _currentLine : number;
   _bgColor : string;
   _fontColor : string;
   constructor(canvasID:string,userFilePath:string){
      this._userFilePath = userFilePath;
      this._canvas = new Canvas(canvasID);
      this._ctx = this._canvas.getCtx();
      this._ctx.font  = "14px Arial";
      this._currentLine = 1;
      this._gap = 20;
      this._cursorPosX = 0;
      this.typeToScreen = this.typeToScreen.bind(this);
      this._bgColor = "#000000";
      this._fontColor = "#33cc33";
   }
   abstract getLoginDescription() :string[];
   abstract scanLogin() : boolean ;
   abstract welcomeMessage() : string;
   abstract setup() : void;
   public typeAllToScreen(ostr:string) : void{
     this._ctx.fillStyle = this._bgColor;
     this._ctx.fillRect(0,0,this._canvas._canvasWidth,this._canvas._canvasHeight);
     this._ctx.fillStyle = this._fontColor;
     this._ctx.fillText(ostr,0,this._currentLine*this._gap);
     this._currentLine++;
   };
   public typeToScreen(pos:number,ostr:string,k:number,currentLine:number): void {
     if ( k <= ostr.length )
     {
       console.log(ostr);
       this._ctx.fillStyle = this._bgColor;
       this._ctx.fillRect(0,0,this._canvas._canvasWidth,this._canvas._canvasHeight);
       this._ctx.fillStyle = this._fontColor;
       this._ctx.fillText(ostr.slice(0,k),pos,currentLine*this._gap);
       k = k + 1;
       setTimeout(this.typeToScreen.bind(null,pos,ostr,k,currentLine),100);
     }
   }
 }

class UnixOS extends AllOS{
  setup(): void {
        //show Description
        this._ctx.fillStyle = this._bgColor;
        this._ctx.fillRect(0,0,this._canvas._canvasWidth,this._canvas._canvasHeight);
        for ( let k = 0; k < this.getLoginDescription().length ;k++)
        {
          this.typeAllToScreen(this.getLoginDescription()[k]);
        }
        this._ctx.fillText("Login : ",0,this._currentLine*this._gap);
        setTimeout(this.typeToScreen.bind(null,45,"keepervong",1,this._currentLine),2000);
        this._currentLine++;
        this._ctx.fillText("Password : ",0,this._currentLine*this._gap);
        setTimeout(this.typeToScreen.bind(null,75,"*****",1,this._currentLine),4000);

        //this._ctx.fillText("login : ", this._currentLine * this._gap

  }
  getLoginDescription(): string[] {
      let k : Array<string> = [];
      k = ["Welcome to Unix OS..... Date : 19/3/2019","Enter to your account following . . ."];//,"Please enter you account....."];
      return k;
  }
  scanLogin(): boolean {
      return true;
  }
  welcomeMessage(): string {
    throw new Error("Method not implemented.");
  }
  constructor(canvasID:string,userFilePath:string)
  {
    super(canvasID,userFilePath);
  }
}
