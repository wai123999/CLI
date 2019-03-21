/// <reference path="CmdFactory.ts" />

var unixOS:UnixOS = new UnixOS("myCanvas"," ");
var start_v = new Vertex(0,120);
var end_v = new Vertex(0,0);
var c  : number = 0;
var process = [];

unixOS.setup();
unixOS.inputlogin();
