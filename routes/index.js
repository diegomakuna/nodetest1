var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/helloword', function(req, res, next) {
  res.render('helloword', { title: 'helloword' });
});
router.get('/userlist', function(req,res){
	var db = req.db;
	var collection = db.get('usercollections');
	collection.find({},{},function(e,docs){
		res.render('userlist',{
			"userlist": docs
		});
	});
});
/*get New User page*/
router.get('/newuser',function(req,res){
	res.render('newuser',{title:'add New User'});
});
/*POST to add user sevice */
router.post('/adduser',function(req,res){
	// set our colletions 
	var db = req.db;
	//get our form values. These rely on the "name" attributes
	var userName = req.body.username;
	var userEmail = req.body.useremail;

	// set our colletions 
	var colletions = db.get('usercollections');

	//submit the db
	colletions.insert({
		"username": userName,
		"email": userEmail
	}, function(err , doc){
		if(err){
			//If it failed , return error
			res.send("There was a problem adding the information to the database.");
		}
		else{
			//If it workd, set the header so the address bar doesn`t still say  /adduser
			res.location('userlist');
			// and it forward to sucess page
			res.redirect("userlist");
		}

	}) 
})

module.exports = router;
