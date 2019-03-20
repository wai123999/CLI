/// <reference path="CmdFactory.ts" />

var unixOS:UnixOS = new UnixOS("myCanvas"," ");
var start_v = new Vertex(0,120);
var end_v = new Vertex(0,0);

unixOS.setup();
unixOS.inputlogin();
start_v = new Vertex(45,unixOS._currentLine* unixOS._gap);
$("body").keypress(function(e){
     e.preventDefault();
     var keyCode = e.keyCode || e.which || e.charCode;
     var keyValue = String.fromCharCode(keyCode);
     if (keyCode == 13){
       //enter
       unixOS._currentLine++;
       unixOS.inputpassword();
       start_v = new Vertex(75,unixOS._currentLine* unixOS._gap);
       //nextCommand();
      // unixCLI.typeToScreen(null,new Vertex(55,this._currentLine * this._gap),"keepervong",1,this._currentLine,">Login : ")

     }
     else{
         start_v.posX+=7;
         unixOS.type(keyValue,start_v)
     }
});

$("body").keyup(function(e){
 e.preventDefault();
 var keyCode = e.keyCode || e.which || e.charCode;
 if ( keyCode == 8 )
 {
     //backspace
 }

});
