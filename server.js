var fs = require("fs");
var express = require('express');
var http = require('http');
var app = express();
var obj;


/*
fs.readFile("?賜??.txt",{encoding:"utf-8"},function(err,data){
	//console.log(data);
	//read utf8 something error,need cut the position 0
	//data = data.slice(1);
	obj = JSON.parse(data);
	//console.log(obj);
});
*/
app.use(express.static(__dirname+'/public'));

var httpServer = http.createServer(app);
httpServer.listen(4000,function(req,res){
		console.log('server create,listen on 4000');
});

app.set('view engine','ejs');

app.get('/',function(req,res){
	res.render('main');
});
