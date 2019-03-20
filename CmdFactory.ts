/// <reference path="Canvas.ts" />
/// <reference path="Vertex.ts" />
/// <reference path="jquery.ts" />
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
   abstract welcomeMessage() : void;
   abstract setup() : void;
   public typeAllToScreen(pos:Vertex,ostr:string) : void{
     this._ctx.fillStyle = this._bgColor;
     this._ctx.fillRect(0,0,pos.posX,pos.posY);
     this._ctx.fillStyle = this._fontColor;
     this._ctx.fillText(ostr,pos.posX,pos.posY);
     this._currentLine++;
   };
   public typeToScreen(pos:Vertex,ostr:string,k:number,currentLine:number,prefixStr:string = ""): void {
     if ( k == 1 && prefixStr != "")
     {
       this._ctx.fillStyle = this._fontColor;
       this._ctx.fillText(prefixStr,0,pos.posY);
     }
     if ( k <= ostr.length )
     {
       if ( k == -1 )
       {
         /*
         setTimeout((function(k){
           this._ctx.fillStyle = this._bgColor;
           this._ctx.fillRect(pos.posX,pos.posY,pos.posY+300,11);
           this._ctx.fillStyle = this._fontColor;
           this._ctx.fillText(ostr.slice(0,k),pos.posX,pos.posY);
         }).bind(this,k),10);
         k = k +1;
         */
       }
       else
       {
         console.log(ostr);
         this._ctx.fillStyle = this._bgColor;
         this._ctx.fillRect(pos.posX,pos.posY,pos.posY+300,11);
         this._ctx.fillStyle = this._fontColor;
         this._ctx.fillText(ostr.slice(0,k),pos.posX,pos.posY);
         k = k +1;
       }
       setTimeout(this.typeToScreen.bind(null,pos,ostr,k,currentLine),100);
     }
   }
   public type(val:string,pos:Vertex) : void{
     //this._ctx.fillStyle = this._bgColor;
     //this._ctx.fillRect(pos.posX,pos.posY,pos.posY+300,11);
     this._ctx.fillStyle = this._fontColor;
     this._ctx.fillText(val,pos.posX,pos.posY);
   }
 }

class UnixOS extends AllOS{
  setup(): void {
        //show Description
        this._ctx.fillStyle = this._bgColor;
        this._ctx.fillRect(0,0,this._canvas._canvasWidth,this._canvas._canvasHeight);

        for ( let k = 0; k < this.getLoginDescription().length ;k++)
        {
          this.typeAllToScreen(new Vertex(0,this._currentLine * this._gap),this.getLoginDescription()[k]);
        }
      //  animation, 沒有互動
      //  this._ctx.fillText(">Login : ",0,this._currentLine*this._gap);
      //  setTimeout(this.typeToScreen.bind(null,new Vertex(55,this._currentLine * this._gap),"keepervong",1,this._currentLine,">Login : "),2000);
      //  this._currentLine++;
      //  this._ctx.fillText(">Password : ",0,this._currentLine*this._gap);
      //  setTimeout(this.typeToScreen.bind(null,new Vertex(85,this._currentLine * this._gap),"*****",1,this._currentLine,">Password : "),4000);
      //  this._currentLine++;
      //  setTimeout(this.welcomeMessage.bind(this),5000);

      //  this._ctx.fillText("login : ", this._currentLine * this._gap
  }
  getLoginDescription(): string[] {
      let k : Array<string> = [];
      k = ["Welcome to Unix OS..... Date : 19/3/2019","Enter to your account following . . ."];//,"Please enter you account....."];
      return k;
  }
  scanLogin(): boolean {
      return true;
  }
  welcomeMessage() :void{
      this.typeAllToScreen(new Vertex(0,this._currentLine*this._gap),">Welcome back..Keeper~");
  }
  constructor(canvasID:string,userFilePath:string)
  {
    super(canvasID,userFilePath);
  }
  public inputlogin(){
    this._ctx.fillText(">Login : ",0,this._currentLine*this._gap);
  }
  public inputpassword(){
      this._ctx.fillText(">Password : ",0,this._currentLine*this._gap);
  }
}
