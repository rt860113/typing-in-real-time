
/**
 * Module dependencies.
 */

var express = require('express.io');
var path = require('path');
var app = express().http().io();

// all environments
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.session({secret:"Mylover"}));
app.use(express.static(path.join(__dirname, 'public')));
var route=require("./routes/index")(app);

// development only
//Dynamic Contents
array_users=[];
app.io.route("got_a_new_user",function(req){
		console.log("New user:  "+req.data.name);
		array_users.push({name:req.data.name,ID:array_users.length,sessionID:req.sessionID});
		req.io.broadcast("New_user_coming_in",{name:req.data.name,id:array_users.length-1});
		req.io.emit("redirect");
});
app.io.route("i_input_something",function(req){
	req.io.broadcast("someone_input_something",{id:req.data.id,input_info:req.data.input_me});
});
app.io.route("disconnect",function(req){
	console.log("Disconnected");
	for (var i = 0; i < array_users.length; i++) {
		if (array_users[i].sessionID==req.sessionID) 
		{
			array_users[i]=array_users[array_users.length-1];
			array_users[i].ID=i;
			app.io.broadcast("deleteUser",{id:i});
			app.io.broadcast("updateID",{oldid:array_users[array_users.length-1].ID,newid:i});
			array_users.pop();
		};
	};
	// console.log(array_users);
});

app.listen(8000);