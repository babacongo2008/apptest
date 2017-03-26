var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var bookingSchema = new Schema({
	customer_id: { type: String, required: true },
  admin_id: { type: String, required: true },
  driver_id: { type: String, required: true },
  pickup_time: { type: String, required: true },
  pickup_location: { type: String, required: true },
  destination: { type: String, required: true }
});

var Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;