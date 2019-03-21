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
        this.userFilePath = userFilePath;
        this.canvas = new Canvas(canvasID);
        this.ctx = this.canvas.getCtx();
        this.ctx.font = "14px Arial";
        this.currentLine = 1;
        this.gap = 20;
        this.charx = 0;
        this.bgColor = "#000000";
        this.fontColor = "#33cc33";
        this.typeObj = new Type(this.ctx, "", this.bgColor, this.fontColor);
    }
    return AllOS;
}());
var UnixOS = /** @class */ (function (_super) {
    __extends(UnixOS, _super);
    function UnixOS(canvasID, userFilePath) {
        return _super.call(this, canvasID, userFilePath) || this;
    }
    UnixOS.prototype.setup = function () {
        //show Description
        this.ctx.fillStyle = this.bgColor;
        this.ctx.fillRect(0, 0, this.canvas.canvasWidth, this.canvas.canvasHeight);
        for (var k = 0; k < this.getLoginDescription().length; k++) {
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
    };
    UnixOS.prototype.getLoginDescription = function () {
        var k = [];
        k = ["Welcome to Unix OS..... Date :" + new Date().toLocaleDateString(),
            "Enter to your account in the following! . . ."]; //,"Please enter you account....."];
        return k;
    };
    UnixOS.prototype.scanLogin = function () {
        return true;
    };
    UnixOS.prototype.welcomeMessage = function () {
        setTimeout(this.typeObj.typeToScreen.bind(null, "", 1), 1000);
        //this.typeAllToScreen(new Vertex(0,this.currentLine*this.gap),">Welcome back..Keeper~");
        this.currentLine++;
    };
    UnixOS.prototype.inputlogin = function () {
        var s = new Signal();
        s.addKeyPrunchListener(this.typeObj);
        //this.ctx.fillText(">Login : ",0,this.currentLine*this.gap);
    };
    return UnixOS;
}(AllOS));
var Signal = /** @class */ (function () {
    function Signal() {
    }
    Signal.prototype.addKeyPrunchListener = function (typeObj) {
        typeObj.typeToScreenNoLineBreak("username : ");
        var count = 1;
        var name = "";
        var buffer = "";
        var tempBuf = "";
        $("body").keypress(function (e) {
            e.preventDefault();
            var keyCode = e.keyCode || e.which || e.charCode;
            var keyValue = String.fromCharCode(keyCode);
            if (count == 1)
                name += keyValue;
            if (keyCode == 13) {
                if (count != 2) {
                    count++;
                    typeObj.nextLine();
                    typeObj.typeToScreenNoLineBreak("password : ");
                }
                else if (count == 2) {
                    typeObj.nextLine();
                    typeObj.typeToScreen("Welcome Back..." + name, 1);
                    //typeObj.typeAllToScreen("Welcome Back..." + name);
                    $("body").unbind("keypress");
                    $("body").unbind("keyup");
                    setTimeout(function () {
                        typeObj.showFunction();
                    }, 2000);
                }
            }
            else {
                typeObj.type(keyValue);
            }
        });
        $("body").keyup(function (e) {
            e.preventDefault();
            var keyCode = e.keyCode || e.which || e.charCode;
            if (keyCode == 8) {
                //backspace
                typeObj.deleteChar();
                name = name.slice(0, name.length - 1);
            }
        });
    };
    return Signal;
}());
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
