//var myCanvas = $("#myCanvas");
//var ctx = c.getContext("2d");
var GL;
var timer = 0;

var canvas = document.getElementById("myCanvas");

var ctx = canvas.getContext("2d");
var w = canvas.width;
var h = canvas.height;
// font-family: arial, "lucida console", sans-serif
var msg = "Hello World";
var bgColor = "#FFFFFF";
ctx.font = "18px arial";

ctx.fillStyle = bgColor;
ctx.fillRect(0, 0, w, h);


ctx.fillStyle = "#00e600";

//Detect keyboard prunch

function initCommandLine(){
   aCommond = ">";
}
initCommandLine();
ctx.fillText(aCommond,10,50);
$("body").keypress(function(e){
      e.preventDefault();
      var keyCode = e.keyCode || e.which || e.charCode;
      var keyValue = String.fromCharCode(keyCode);
      if (keyCode == 13){
        //enter
         if ( aCommond == "cd")
         {
           aCommond = "This is cd Command";
         }
         else{initCommandLine();}
         ctx.fillStyle = bgColor;
         ctx.fillRect(0, 0, w, h);
         ctx.fillStyle = "#00e600";
         ctx.fillText(aCommond.slice(0,aCommond.length),10,50);
        //run the command
      }
      else{
        aCommond += keyValue;
        setTimeout(function(){
        //  ctx.clearRect(0,0,w+1,h+1);
          ctx.fillText(aCommond.slice(0,aCommond.length),10,50);
        },10);
      }
});

$("body").keyup(function(e){
  e.preventDefault();
  var keyCode = e.keyCode || e.which || e.charCode;
  if ( keyCode == 8 )
  {

    aCommond = aCommond.slice(0,aCommond.length - 1);

    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#00e600";
    ctx.fillText(aCommond.slice(0,aCommond.length),10,50);
    //如果先行上面..就不同步?不會..因為backspace keypress detect不到
     //aCommond = aCommond.slice(0,k-1);
     //ctx.clearRect(0,0,w,h);
  //   ctx.fillText(aCommond,10,50);
  }

});
