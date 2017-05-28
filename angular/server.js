//require express dependancy for node work
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));
app.use(express.static('node_modules'));

//importent!
app.all('*', function(req, res) {
  res.sendFile(__dirname + "/public/index.html")
});

//404 error
app.use(function(req, res, next){
  var err = new Error('Not found');
  err.status = 404;
  next(err);
});

// main error handler -  warning - not for use in production code!
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: err
  });
});

//start listening
app.listen(process.env.PORT || '8000', function() {
	console.log("messenger App rocknroll 8000");
});
