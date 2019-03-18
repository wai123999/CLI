//var myCanvas = $("#myCanvas");
//var ctx = c.getContext("2d");
var GL;
var timer = 0;

function initWebGL(){
   // Get Canvas Element
   var canvas = document.getElementById("myCanvas");
   // Get A WebGL Context
   GL = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
   // Test for Success
   if (!GL) {
      alert("Unable to initialize WebGL. Your browser may not support it.");
   }
   // Set clear color to red, fully opaque
   GL.clearColor(1.0, 1.0, 1.0, 1.0);
   // Clear Screen
   GL.clear(GL.COLOR_BUFFER_BIT| GL.DEPTH_BUFFER_BIT);
}

//ANIMATION FUNCTION (to be passed a callback)  see also http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
window.requestAnimFrame = ( function() {

    return  window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||

    // if none of the above, use non-native timeout method
    function(callback) {
      window.setTimeout(callback, 1000 / 60);
    };

  } ) ();

function animationLoop(){
  // feedback loop requests new frame
  requestAnimFrame( animationLoop );
  // render function is defined below
  render();
}

function render(){
   timer++;
   GL.clearColor( .5*(1+ Math.sin( timer/30.0 )), 0.0, .5*(1+Math.cos( timer/30.0 )), 1.0);
   GL.clear(GL.COLOR_BUFFER_BIT| GL.DEPTH_BUFFER_BIT);
}

function start(){
   initWebGL();
   animationLoop();
}
