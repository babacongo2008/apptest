//Import the mongoose module
var mongoose = require('mongoose');
var Admin = require('../models/admin');
var config = require('../config');



//Get the default connection
mongoose.connect(config.mongodbUri);
var mongoDb = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
mongoDb.on('error', console.error.bind(console, 'MongoDB connection error:'));


// Get list of Admins
exports.list = function(req, res) {
  
  if (mongoDb){
		Admin.find({}, function(err, admins) {
		if (err) throw err;

		// object of all the admins
		console.log(admins);
		res.send(admins);
		});
    }
    else
    {
        config.logStars('No database object!');
        res.status(404).send({});
    }
} ;
	// Creates a new admin in datastore.
	exports.create = function(req, res) {
	console.log(req.body.first_name);
	var admin = new Admin(req.body);
    
	console.log(mongoose.connection.readyState);
    if (mongoDb){
	 console.log('Adding admin: ' + JSON.stringify(admin));
      admin.save(function(err) {
		if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(admin));
                res.send(admin);
            }
		});
    }
  else
	{
		console.log('No database object!');
	}
  
};

exports.update = function(req, res) {
    
	var id = req.params.id;
    // get a admin with ID
	Admin.findById(id, function(err, admin) {
	  if (err) throw err;
	  console.log('Admin Found - ' + JSON.stringify(admin));
	  admin.first_name = req.body.first_name;
	  admin.last_name = req.body.last_name;
	  admin.phone_number = req.body.phone_number;

	  // save the admin
	  admin.save(function(err) {
		if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(admin));
                res.send(admin);
            }
	  });

	});
	
};
// delete an existing admin in datastore.
exports.delete = function(req, res) {

	var id = req.params.id;
	  console.log('Deleting admin: ' + id);
	  Admin.findByIdAndRemove(id, function(err) {
	  if (err) throw err;

	  console.log('admin deleted!');
	  //Send remaining customers list.
	  Admin.find({}, function(err, admins) {
		if (err) throw err;

		// object of all the customers
		console.log(admins);
		res.send(admins);
		});
	  
	});
	
};