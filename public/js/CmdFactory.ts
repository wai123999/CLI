/// <reference path="Canvas.ts" />
/// <reference path="Vertex.ts" />
/// <reference path="jquery.ts" />
abstract class CmdFactory{
   //有了這個..這個版本的cli可以用不同的cmd組合
   abstract runCmd(cmdStr : string,typeObj : Type) : string;
}

class UnixFactory extends CmdFactory{
    runCmd(cmdStr : string,typeObj : Type) : string {
        let rStr;
        switch ( cmdStr )
        {
           case  "mkdir":
                 rStr = "Make a directory";
                 typeObj.type(rStr);
                 typeObj.nextLine();
                 break;
           case  "chat":
                  console.log("casecase");
                  rStr = "Chat connect . . ";
                  $("#chatCanvas").addClass("chatCanvasAnim");
                    typeObj.type(rStr);
                   typeObj.nextLine();
                  break;
           default:
                  rStr = "command fail!";
                  typeObj.type(rStr);
                   typeObj.nextLine();
                  break;
        }

        return rStr;
    }
}



abstract class AllOS {
    userFilePath : string;
    canvas : Canvas;
    ctx : any;
    gap : number;
    charx : number;
    currentLine : number;
    bgColor : string;
    fontColor : string;
    typeObj : Type;
   constructor(canvasID:string,userFilePath:string){
      this.userFilePath = userFilePath;
      this.canvas = new Canvas(canvasID);
      this.ctx = this.canvas.getCtx();
      this.ctx.font  = "14px Arial";
      this.currentLine = 1;
      this.gap = 20;
      this.charx = 0;
      this.bgColor = "#000000";
      this.fontColor = "#33cc33";
      this.typeObj = new Type(this.ctx,"",this.bgColor,this.fontColor);
   }
   abstract getLoginDescription() :string[];
   abstract scanLogin() : boolean ;
   abstract welcomeMessage() : void;
   abstract setup() : void;


 }

class UnixOS extends AllOS{
  setup(): void {
        //show Description
        this.ctx.fillStyle = this.bgColor;
        this.ctx.fillRect(0,0,this.canvas. canvasWidth,this.canvas. canvasHeight);

        for ( let k = 0; k < this.getLoginDescription().length ;k++)
        {
          this.typeObj.typeAllToScreen(this.getLoginDescription()[k]);
        }

      //  animation, 沒有互動
      //  this.ctx.fillText(">Login : ",0,this.currentLine*this.gap);
      //  setTimeout(this.typeToScreen.bind(null,new Vertex(55,this.currentLine * this.gap),"keepervong",1,this.currentLine,">Login : "),2000);
      //  this.currentLine++;
      //  this.ctx.fillText(">Password : ",0,this.currentLine*this.gap);
      //  setTimeout(this.typeToScreen.bind(null,new Vertex(85,this.currentLine * this.gap),"*****",1,this.currentLine,">Password : "),4000);
      //  this.currentLine++;
      //  setTimeout(this.welcomeMessage.bind(this),5000);

      //  this.ctx.fillText("login : ", this.currentLine * this.gap
  }
  getLoginDescription(): string[] {
      let k : Array<string> = [];
      k = ["Welcome to Unix OS..... Date :" + new Date().toLocaleDateString(),
      "Enter to your account in the following! . . ."];//,"Please enter you account....."];
      return k;
  }
  scanLogin(): boolean {
      return true;
  }
  welcomeMessage() :void{
    setTimeout(this.typeObj.typeToScreen.bind(null,"",1),1000);
      //this.typeAllToScreen(new Vertex(0,this.currentLine*this.gap),">Welcome back..Keeper~");
    this.currentLine++;
  }
  constructor(canvasID:string,userFilePath:string)
  {
    super(canvasID,userFilePath);
  }
  public inputlogin(){
    let s = new Signal();
    s.addKeyPrunchListener(this.typeObj);
    //this.ctx.fillText(">Login : ",0,this.currentLine*this.gap);
  }

}
class Signal{
   constructor(){}
   public addCLIListener(typeObj : Type)
   {
     var a = new UnixFactory();
     var cmdStr = "";
     $("body").keypress(function(e)
     {
          e.preventDefault();
          var keyCode = e.keyCode || e.which || e.charCode;
          var keyValue = String.fromCharCode(keyCode);
          if (keyCode == 13)
          {
             console.log("open" , cmdStr);
              typeObj.nextLine();
              a.runCmd(cmdStr,typeObj);
              cmdStr = "";
          }
          else{
               typeObj.type(keyValue);
               cmdStr += keyValue;
          }
     });
   }
   public addKeyPrunchListener(typeObj:Type){
     typeObj.typeToScreenNoLineBreak("username : ");
     var count = 1
     var name = "";
     var buffer = "";
     var tempBuf = "";
    var _this = this;
     $("body").keypress(function(e)
     {
          e.preventDefault();
          var keyCode = e.keyCode || e.which || e.charCode;
          var keyValue = String.fromCharCode(keyCode);
          if ( count == 1) name+=keyValue;
          if (keyCode == 13)
          {
            if ( count != 2 )
            {
              count++;
              typeObj.nextLine();
              typeObj.typeToScreenNoLineBreak("password : ");
            }
            else if ( count == 2)
            {
                typeObj.nextLine();
                typeObj.typeToScreen("Welcome Back..." + name,1);
                //typeObj.typeAllToScreen("Welcome Back..." + name);
                $("body").unbind("keypress");$("body").unbind("keyup");
                setTimeout(function(){
                    typeObj.showFunction();
                    _this.addCLIListener(typeObj);
                },2000);
            }
          }
          else{
               typeObj.type(keyValue);
          }
     });
     $("body").keyup(function(e){
      e.preventDefault();
      var keyCode = e.keyCode || e.which || e.charCode;
      if ( keyCode == 8 )
      {
          //backspace
         typeObj.deleteChar();
         name = name.slice(0,name.length-1);
     }
   });
 }
}
class Type{
   cmdStr : string;
   cmdStrFramePos : Vertex;
   charInFramePos : Vertex;
   cursorInFramePos : Vertex;
   bgColor : string;
   fontColor : string;
   ctx : any;
   currentLine : number;
   heightOfLine : number;
   charWidth : number;
   cursorWidth : number;
   cursorHeight : number;
   constructor(ctx:any,cmdStr:string,bgColor:string,fontColor:string)
   {
     this.cmdStr = "";
     this.currentLine = 1;
     this.heightOfLine = 14;
     this.charWidth = 6;
     this.cursorWidth = 1;
     this.cursorHeight = this.heightOfLine;
     this.ctx = ctx;
     this.cmdStrFramePos = new Vertex(0,this.heightOfLine);  //文字的框框position
     this.charInFramePos = new Vertex(0,0);  //每個文字的position...type()會用到
     this.cursorInFramePos = new Vertex(0,0);
     this.bgColor = bgColor;
     this.fontColor = fontColor;
     this.typeToScreen = this.typeToScreen.bind(this);
   }
   public type(val:string) : void{
      this.cmdStr += val;
      this.ctx.fillStyle = this.bgColor;
      this.ctx.fillRect(this.cmdStrFramePos.x,this.cmdStrFramePos.y-10,1000,this.heightOfLine);
      this.ctx.fillStyle = this.fontColor;
      this.ctx.fillText(this.cmdStr,this.cmdStrFramePos.x,this.cmdStrFramePos.y);
   }
   public deleteChar()
   {
        this.ctx.fillStyle = this.bgColor;
        this.cmdStr = this.cmdStr.substr(0,this.cmdStr.length - 1);
        this.ctx.fillStyle = this.bgColor;
        this.ctx.fillRect(this.cmdStrFramePos.x,this.cmdStrFramePos.y-10,1000,this.heightOfLine);
        this.ctx.fillStyle = this.fontColor;
        this.ctx.fillText(this.cmdStr,this.cmdStrFramePos.x,this.cmdStrFramePos.y);
   }
   public typeToScreen(ostr,k:number): void {
     //animation
     if ( k <= ostr.length )
     {
         this.ctx.fillStyle = this.bgColor;
         this.ctx.fillRect(this.cmdStrFramePos.x,this.cmdStrFramePos.y-10,this.cmdStrFramePos.x+300,11);
         this.ctx.fillStyle = this.fontColor;
         this.ctx.fillText(ostr.slice(0,k),this.cmdStrFramePos.x,this.cmdStrFramePos.y);
         k = k +1;
        setTimeout(this.typeToScreen.bind(null,ostr,k),50);
    }
    else{
       this.nextLine();
    }
   }
   public typeAllToScreen(ostr:string) : void{
     this.ctx.fillStyle = this.fontColor;
     this.ctx.fillText(ostr,this.cmdStrFramePos.x,this.cmdStrFramePos.y);
     this.nextLine();
   };
   public showCursor(){
      this.ctx.fillStyle = this.fontColor;
      this.ctx.fillRect(this.cursorInFramePos.x,this.cursorInFramePos.y,this.cursorWidth,this.cursorHeight);
   }
   public clearCursor(){
     this.ctx.fillStyle = this.bgColor;
     this.ctx.fillRect(this.cursorInFramePos.x,this.cursorInFramePos.y,this.cursorWidth,this.cursorHeight);
   }
   public typeToScreenNoLineBreak(str:string) : void
   {
     this.cmdStr = "";
     this.ctx.fillStyle = this.fontColor;
     this.ctx.fillText(str,this.cmdStrFramePos.x,this.cmdStrFramePos.y);
     this.cmdStrFramePos.x = this.cmdStrFramePos.x + str.length*7;;
   }
   public nextLine() : void{
      this.cmdStr = "";
      this.currentLine++;
      this.cmdStrFramePos.x = 0;
      this.cmdStrFramePos.y += this.heightOfLine;
   }
   public showFunction():void
   {
       let k : Array<string> = ["Command:","(1)help","(2)kill -l sig.no","(3)gcc yourcode.c -o yourcode.out"];
        for ( let j = 0; j < k.length ; j++)
        {
          this.typeAllToScreen(k[j]);
        }
   }



}
