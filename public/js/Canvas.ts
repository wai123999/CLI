class Canvas
{
  public _canvasID : string;
  public _canvasDOM : any;
  public _canvasWidth : number;
  public _canvasHeight : number;
  constructor(canvasID : string)
  {
    this._canvasID = canvasID;
    this._canvasDOM = document.querySelector("#" + this._canvasID);
    this._canvasWidth =  this._canvasDOM.width;
    this._canvasHeight = this._canvasDOM.height;
    //console.log(this._canvasWidth,this._canvasHeight);
  }
  public getCtx() : any{
     return this._canvasDOM.getContext("2d");
  }
}
