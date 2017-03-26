var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var driverSchema = new Schema({
	first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  license_plate: { type: String, required: true },
  car_make: { type: String, required: true },
  car_model: { type: String, required: true },
  car_type: { type: String, required: true },
  phone_number: { type: String, required: true }
});

var Driver = mongoose.model('Driver', driverSchema);

module.exports = Driver;