var Canvas = /** @class */ (function () {
    function Canvas(canvasID) {
        this.canvasID = canvasID;
        this.canvasDOM = document.querySelector("#" + this.canvasID);
        this.canvasWidth = this.canvasDOM.width;
        this.canvasHeight = this.canvasDOM.height;
        //console.log(this._canvasWidth,this._canvasHeight);
    }
    Canvas.prototype.getCtx = function () {
        return this.canvasDOM.getContext("2d");
    };
    return Canvas;
}());
