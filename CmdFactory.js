/// <reference path="Canvas.ts" />
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var CmdFactory = /** @class */ (function () {
    function CmdFactory() {
    }
    return CmdFactory;
}());
var UnixFactory = /** @class */ (function (_super) {
    __extends(UnixFactory, _super);
    function UnixFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UnixFactory.prototype.runCmd = function (cmdStr) {
        var rStr;
        switch (cmdStr) {
            case "mkdir":
                rStr = "Make a directory";
                break;
        }
        return rStr;
    };
    return UnixFactory;
}(CmdFactory));
var AllOS = /** @class */ (function () {
    function AllOS(canvasID, userFilePath) {
        this._userFilePath = userFilePath;
        this._canvas = new Canvas(canvasID);
        this._ctx = this._canvas.getCtx();
        this._ctx.font = "14px Arial";
        this._currentLine = 1;
        this._gap = 20;
        this._cursorPosX = 0;
        this.typeToScreen = this.typeToScreen.bind(this);
        this._bgColor = "#000000";
        this._fontColor = "#33cc33";
    }
    AllOS.prototype.typeAllToScreen = function (ostr) {
        this._ctx.fillStyle = this._bgColor;
        this._ctx.fillRect(0, 0, this._canvas._canvasWidth, this._canvas._canvasHeight);
        this._ctx.fillStyle = this._fontColor;
        this._ctx.fillText(ostr, 0, this._currentLine * this._gap);
        this._currentLine++;
    };
    ;
    AllOS.prototype.typeToScreen = function (pos, ostr, k, currentLine) {
        if (k <= ostr.length) {
            console.log(ostr);
            this._ctx.fillStyle = this._bgColor;
            this._ctx.fillRect(0, 0, this._canvas._canvasWidth, this._canvas._canvasHeight);
            this._ctx.fillStyle = this._fontColor;
            this._ctx.fillText(ostr.slice(0, k), pos, currentLine * this._gap);
            k = k + 1;
            setTimeout(this.typeToScreen.bind(null, pos, ostr, k, currentLine), 100);
        }
    };
    return AllOS;
}());
var UnixOS = /** @class */ (function (_super) {
    __extends(UnixOS, _super);
    function UnixOS(canvasID, userFilePath) {
        return _super.call(this, canvasID, userFilePath) || this;
    }
    UnixOS.prototype.setup = function () {
        //show Description
        this._ctx.fillStyle = this._bgColor;
        this._ctx.fillRect(0, 0, this._canvas._canvasWidth, this._canvas._canvasHeight);
        for (var k = 0; k < this.getLoginDescription().length; k++) {
            this.typeAllToScreen(this.getLoginDescription()[k]);
        }
        this._ctx.fillText("Login : ", 0, this._currentLine * this._gap);
        setTimeout(this.typeToScreen.bind(null, 45, "keepervong", 1, this._currentLine), 2000);
        this._currentLine++;
        this._ctx.fillText("Password : ", 0, this._currentLine * this._gap);
        setTimeout(this.typeToScreen.bind(null, 75, "*****", 1, this._currentLine), 4000);
        //this._ctx.fillText("login : ", this._currentLine * this._gap
    };
    UnixOS.prototype.getLoginDescription = function () {
        var k = [];
        k = ["Welcome to Unix OS..... Date : 19/3/2019", "Enter to your account following . . ."]; //,"Please enter you account....."];
        return k;
    };
    UnixOS.prototype.scanLogin = function () {
        return true;
    };
    UnixOS.prototype.welcomeMessage = function () {
        throw new Error("Method not implemented.");
    };
    return UnixOS;
}(AllOS));
