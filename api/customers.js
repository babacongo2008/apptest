//Import the mongoose module
var mongoose = require('mongoose');
var Customer = require('../models/customer');
var config = require('../config');

//Get the default connection
mongoose.connect(config.mongodbUri);
var mongoDb = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
mongoDb.on('error', console.error.bind(console, 'MongoDB connection error:'));


// Get list of customers
exports.list = function(req, res) {
console.log("listing customers...");  
  if (mongoDb){
  	console.log("sending mongo request...");
		Customer.find({}, function(err, customers) {
		console.log("received mongo response...");
		if (err) throw err;

		// object of all the customers
		console.log(customers);
		res.send(customers);
		});
    }
    else
    {
        config.logStars('No database object!');
        res.status(404).send({});
    }
} ;
	// Creates a new customer in datastore.
	exports.create = function(req, res) {
	console.log(req.body.first_name);
	var customer = new Customer(req.body);
    
	console.log(mongoose.connection.readyState);
    if (mongoDb){
	 console.log('Adding contact: ' + JSON.stringify(customer));
      customer.save(function(err) {
		if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(customer));
                res.send(customer);
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
    // get a customer with ID
	Customer.findById(id, function(err, customer) {
	  if (err) throw err;
	  console.log('Customer Found - ' + JSON.stringify(customer));
	  customer.first_name = req.body.first_name;
	  customer.last_name = req.body.last_name;
	  customer.address = req.body.address;
	  customer.phone_number = req.body.phone_number;

	  // save the customer
	  customer.save(function(err) {
		if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(customer));
                res.send(customer);
            }
	  });

	});
	
};
// delete an existing customer in datastore.
exports.delete = function(req, res) {

	var id = req.params.id;
	  console.log('Deleting customer: ' + id);
	  Customer.findByIdAndRemove(id, function(err) {
	  if (err) throw err;

	  console.log('Customer deleted!');
	  //Send remaining customers list.
	  Customer.find({}, function(err, customers) {
		if (err) throw err;

		// object of all the customers
		console.log(customers);
		res.send(customers);
		});
	  
	});
	
};