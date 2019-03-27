///<reference path="CmdFactory.ts" />
/*
  每個os..都有自己的typeobj..
  Type會記錄印到第幾行>..
  cursor position...
  負責打字
*/

class Type
{
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
