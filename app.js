
var basicAuth = require('basic-auth');

var auth = function (req, res, next) {
  function unauthorized(res) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.send(401);
  };

  var user = basicAuth(req);

  if (!user || !user.name || !user.pass) {
    return unauthorized(res);
  };

  if (user.name === 'admin' && user.pass === '123') {
    return next();
  } else {
    return unauthorized(res);
  };
};


var bodyParser = require('body-parser');

var express = require('express');
//create an express app
var app = express();

//configure the express app to parse JSON-formatted body
app.use(bodyParser.json());

//add route for the root
app.get('/',function (request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end("We're up and running!!!");
});
// Listen on port 8000, IP defaults to 127.0.0.1
app.listen(process.env.PORT || 5000)
//create routing objects
//customers.
var customer = require('./api/customers');
app.get('/api/customers',auth,customer.list);
app.post('/api/customers',auth,customer.create);
app.put('/api/customers/:id',auth,customer.update);
app.delete('/api/customers/:id',auth,customer.delete);

//admins.
var admin = require('./api/admins');
app.get('/api/admins',auth,admin.list);
app.post('/api/admins',auth,admin.create);
app.put('/api/admins/:id',auth,admin.update);
app.delete('/api/admins/:id',auth,admin.delete);

//drivers.
var driver = require('./api/drivers');
app.get('/api/drivers',driver.list);
app.post('/api/drivers',driver.create);
app.put('/api/drivers/:id',driver.update);
app.delete('/api/drivers/:id',driver.delete);

//bookings.
var booking = require('./api/bookings');
app.get('/api/bookings',auth,booking.list);
app.post('/api/bookings',auth,booking.create);
app.put('/api/bookings/:id',auth,booking.update);
app.delete('/api/bookings/:id',auth,booking.delete);

// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:5000/");