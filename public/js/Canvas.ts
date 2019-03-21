class Canvas
{
  public canvasID : string;
  public canvasDOM : any;
  public canvasWidth : number;
  public canvasHeight : number;
  constructor(canvasID : string)
  {
    this.canvasID = canvasID;
    this.canvasDOM = document.querySelector("#" + this.canvasID);
    this.canvasWidth =  this.canvasDOM.width;
    this.canvasHeight = this.canvasDOM.height;
    //console.log(this._canvasWidth,this._canvasHeight);
  }
  public getCtx() : any{
     return this.canvasDOM.getContext("2d");
  }
}
