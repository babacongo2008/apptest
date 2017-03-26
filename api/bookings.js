//Import the mongoose module
var mongoose = require('mongoose');
var Customer = require('../models/booking');
var config = require('../config');

//Get the default connection
mongoose.connect(config.mongodbUri);
var mongoDb = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
mongoDb.on('error', console.error.bind(console, 'MongoDB connection error:'));


// Get list of bookings
exports.list = function(req, res) {
  
  if (mongoDb){
		Booking.find({}, function(err, bookings) {
		if (err) throw err;

		// object of all the bookings
		console.log(bookings);
		res.send(bookings);
		});
    }
    else
    {
        config.logStars('No database object!');
        res.status(404).send({});
    }
} ;
	// Creates a new booking in datastore.
	exports.create = function(req, res) {
	var booking = new Booking(req.body);
    
	console.log(mongoose.connection.readyState);
    if (mongoDb){
	 console.log('Adding booking: ' + JSON.stringify(booking));
      booking.save(function(err) {
		if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(booking));
                res.send(booking);
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
    // get a booking with ID
	Booking.findById(id, function(err, booking) {
	  if (err) throw err;
	  console.log('booking Found - ' + JSON.stringify(booking));
	  booking.customer_id = req.body.customer_id;
	  booking.admin_id = req.body.admin_id;
	  booking.driver_id = req.body.driver_id;
	  booking.pickup_time = req.body.pickup_time;
	  booking.pickup_location = req.body.pickup_location;
	  booking.destination = req.body.destination;

	  // save the booking
	  booking.save(function(err) {
		if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(booking));
                res.send(booking);
            }
	  });

	});
	
};
// delete an existing booking in datastore.
exports.delete = function(req, res) {

	var id = req.params.id;
	  console.log('Deleting booking: ' + id);
	  Booking.findByIdAndRemove(id, function(err) {
	  if (err) throw err;

	  console.log('booking deleted!');
	  //Send remaining bookings list.
	  Booking.find({}, function(err, bookings) {
		if (err) throw err;

		// object of all the bookings
		console.log(bookings);
		res.send(bookings);
		});
	  
	});
	
};