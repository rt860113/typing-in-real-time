
/*
 * GET home page.
 */

module.exports=function(app)
{
	app.get("/",function(req,res)
	{
		res.render("index",{title:"Welcome"});
	});
	app.get("/chatPanel",function(req,res)
	{
		res.render("chatPanel",{idme:array_users.length-1,nameUrself:array_users[array_users.length-1]});
	});

}