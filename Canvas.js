var Canvas = /** @class */ (function () {
    function Canvas(canvasID) {
        this._canvasID = canvasID;
        this._canvasDOM = document.querySelector("#" + this._canvasID);
        this._canvasWidth = this._canvasDOM.width;
        this._canvasHeight = this._canvasDOM.height;
        //console.log(this._canvasWidth,this._canvasHeight);
    }
    Canvas.prototype.getCtx = function () {
        return this._canvasDOM.getContext("2d");
    };
    return Canvas;
}());
