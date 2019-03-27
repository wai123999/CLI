///<reference path="CmdFactory.ts" />
/*
  每個os..都有自己的typeobj..
  Type會記錄印到第幾行>..
  cursor position...
  負責打字
*/
var Type = /** @class */ (function () {
    function Type(ctx, cmdStr, bgColor, fontColor) {
        this.cmdStr = "";
        this.currentLine = 1;
        this.heightOfLine = 14;
        this.charWidth = 6;
        this.cursorWidth = 1;
        this.cursorHeight = this.heightOfLine;
        this.ctx = ctx;
        this.cmdStrFramePos = new Vertex(0, this.heightOfLine); //文字的框框position
        this.charInFramePos = new Vertex(0, 0); //每個文字的position...type()會用到
        this.cursorInFramePos = new Vertex(0, 0);
        this.bgColor = bgColor;
        this.fontColor = fontColor;
        this.typeToScreen = this.typeToScreen.bind(this);
    }
    Type.prototype.type = function (val) {
        this.cmdStr += val;
        this.ctx.fillStyle = this.bgColor;
        this.ctx.fillRect(this.cmdStrFramePos.x, this.cmdStrFramePos.y - 10, 1000, this.heightOfLine);
        this.ctx.fillStyle = this.fontColor;
        this.ctx.fillText(this.cmdStr, this.cmdStrFramePos.x, this.cmdStrFramePos.y);
    };
    Type.prototype.deleteChar = function () {
        this.ctx.fillStyle = this.bgColor;
        this.cmdStr = this.cmdStr.substr(0, this.cmdStr.length - 1);
        this.ctx.fillStyle = this.bgColor;
        this.ctx.fillRect(this.cmdStrFramePos.x, this.cmdStrFramePos.y - 10, 1000, this.heightOfLine);
        this.ctx.fillStyle = this.fontColor;
        this.ctx.fillText(this.cmdStr, this.cmdStrFramePos.x, this.cmdStrFramePos.y);
    };
    Type.prototype.typeToScreen = function (ostr, k) {
        //animation
        if (k <= ostr.length) {
            this.ctx.fillStyle = this.bgColor;
            this.ctx.fillRect(this.cmdStrFramePos.x, this.cmdStrFramePos.y - 10, this.cmdStrFramePos.x + 300, 11);
            this.ctx.fillStyle = this.fontColor;
            this.ctx.fillText(ostr.slice(0, k), this.cmdStrFramePos.x, this.cmdStrFramePos.y);
            k = k + 1;
            setTimeout(this.typeToScreen.bind(null, ostr, k), 50);
        }
        else {
            this.nextLine();
        }
    };
    Type.prototype.typeAllToScreen = function (ostr) {
        this.ctx.fillStyle = this.fontColor;
        this.ctx.fillText(ostr, this.cmdStrFramePos.x, this.cmdStrFramePos.y);
        this.nextLine();
    };
    ;
    Type.prototype.showCursor = function () {
        this.ctx.fillStyle = this.fontColor;
        this.ctx.fillRect(this.cursorInFramePos.x, this.cursorInFramePos.y, this.cursorWidth, this.cursorHeight);
    };
    Type.prototype.clearCursor = function () {
        this.ctx.fillStyle = this.bgColor;
        this.ctx.fillRect(this.cursorInFramePos.x, this.cursorInFramePos.y, this.cursorWidth, this.cursorHeight);
    };
    Type.prototype.typeToScreenNoLineBreak = function (str) {
        this.cmdStr = "";
        this.ctx.fillStyle = this.fontColor;
        this.ctx.fillText(str, this.cmdStrFramePos.x, this.cmdStrFramePos.y);
        this.cmdStrFramePos.x = this.cmdStrFramePos.x + str.length * 7;
        ;
    };
    Type.prototype.nextLine = function () {
        this.cmdStr = "";
        this.currentLine++;
        this.cmdStrFramePos.x = 0;
        this.cmdStrFramePos.y += this.heightOfLine;
    };
    Type.prototype.showFunction = function () {
        var k = ["Command:", "(1)help", "(2)kill -l sig.no", "(3)gcc yourcode.c -o yourcode.out"];
        for (var j = 0; j < k.length; j++) {
            this.typeAllToScreen(k[j]);
        }
    };
    return Type;
}());
