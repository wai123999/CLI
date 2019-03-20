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
/// <reference path="Canvas.ts" />
/// <reference path="Vertex.ts" />
/// <reference path="jquery.ts" />
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
    AllOS.prototype.typeAllToScreen = function (pos, ostr) {
        this._ctx.fillStyle = this._bgColor;
        this._ctx.fillRect(0, 0, pos.posX, pos.posY);
        this._ctx.fillStyle = this._fontColor;
        this._ctx.fillText(ostr, pos.posX, pos.posY);
        this._currentLine++;
    };
    ;
    AllOS.prototype.typeToScreen = function (pos, ostr, k, currentLine, prefixStr) {
        if (prefixStr === void 0) { prefixStr = ""; }
        if (k == 1 && prefixStr != "") {
            this._ctx.fillStyle = this._fontColor;
            this._ctx.fillText(prefixStr, 0, pos.posY);
        }
        if (k <= ostr.length) {
            if (k == -1) {
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
            else {
                console.log(ostr);
                this._ctx.fillStyle = this._bgColor;
                this._ctx.fillRect(pos.posX, pos.posY, pos.posY + 300, 11);
                this._ctx.fillStyle = this._fontColor;
                this._ctx.fillText(ostr.slice(0, k), pos.posX, pos.posY);
                k = k + 1;
            }
            setTimeout(this.typeToScreen.bind(null, pos, ostr, k, currentLine), 100);
        }
    };
    AllOS.prototype.type = function (val, pos) {
        //this._ctx.fillStyle = this._bgColor;
        //this._ctx.fillRect(pos.posX,pos.posY,pos.posY+300,11);
        this._ctx.fillStyle = this._fontColor;
        this._ctx.fillText(val, pos.posX, pos.posY);
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
            this.typeAllToScreen(new Vertex(0, this._currentLine * this._gap), this.getLoginDescription()[k]);
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
        this.typeAllToScreen(new Vertex(0, this._currentLine * this._gap), ">Welcome back..Keeper~");
    };
    UnixOS.prototype.inputlogin = function () {
        this._ctx.fillText(">Login : ", 0, this._currentLine * this._gap);
    };
    UnixOS.prototype.inputpassword = function () {
        this._ctx.fillText(">Password : ", 0, this._currentLine * this._gap);
    };
    return UnixOS;
}(AllOS));
