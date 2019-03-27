///<reference path="jquery.ts" />
///<reference path="CmdFactory.ts" />
var Signal = /** @class */ (function () {
    function Signal() {
        this.cmdSet = new UnixFactory();
    }
    Signal.prototype.addCLIListener = function (typeObj) {
        var name = "";
        var _this = this;
        //body不可弄2個事件..所以要偵測在div內的keypress
        $("body").keypress(function (e) {
            e.preventDefault();
            var keyCode = e.keyCode || e.which || e.charCode;
            var keyValue = String.fromCharCode(keyCode);
            if (keyCode == 13) { //enter
                typeObj.nextLine();
                _this.cmdSet.runCmd(name, typeObj);
                name = "";
            }
            else {
                name += keyValue;
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
                        var v = new Signal();
                        v.addCLIListener(typeObj);
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
