var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var adminSchema = new Schema({
	first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  phone_number: { type: String, required: true }
});

// the schema is useless so far
// we need to create a model using it
var Admin = mongoose.model('Admin', adminSchema);

// make this available to our users in our Node applications
module.exports = Admin;