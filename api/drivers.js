//Import the mongoose module
var mongoose = require('mongoose');
var Driver = require('../models/driver');
var config = require('../config');

//Get the default connection
mongoose.connect(config.mongodbUri);
var mongoDb = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
mongoDb.on('error', console.error.bind(console, 'MongoDB connection error:'));


// Get list of driver
exports.list = function(req, res) {
  
  if (mongoDb){
		Driver.find({}, function(err, drivers) {
		if (err) throw err;

		// object of all the drivers
		console.log(drivers);
		res.send(drivers);
		});
    }
    else
    {
        config.logStars('No database object!');
        res.status(404).send({});
    }
} ;
	// Creates a new driver in datastore.
	exports.create = function(req, res) {
	var driver = new Driver(req.body);
    
	console.log(mongoose.connection.readyState);
    if (mongoDb){
	 console.log('Adding driver: ' + JSON.stringify(driver));
      driver.save(function(err) {
		if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(driver));
                res.send(driver);
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
    // get a driver with ID
	Driver.findById(id, function(err, driver) {
	  if (err) throw err;
	  console.log('Driver Found - ' + JSON.stringify(driver));
	  driver.first_name = req.body.first_name;
	  driver.last_name = req.body.last_name;
	  driver.license_plate = req.body.license_plate;
	  driver.car_make = req.body.car_make;
	   driver.car_model = req.body.car_model;
	    driver.car_type = req.body.car_type;
		 driver.phone_number = req.body.phone_number;

	  // save the driver
	  driver.save(function(err) {
		if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(driver));
                res.send(driver);
            }
	  });

	});
	
};
// delete an existing driver in datastore.
exports.delete = function(req, res) {

	var id = req.params.id;
	  console.log('Deleting driver: ' + id);
	  Driver.findByIdAndRemove(id, function(err) {
	  if (err) throw err;

	  console.log('Driver deleted!');
	  //Send remaining customers list.
	  Driver.find({}, function(err, drivers) {
		if (err) throw err;

		// object of all the drivers
		console.log(drivers);
		res.send(drivers);
		});
	  
	});
	
};