// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/basic_mongoose');

var QuotingSchema = new mongoose.Schema({
 author: String,
 quote: String,
}, {timestamps: true });
mongoose.model('QuotingDojo', QuotingSchema); // We are setting this Schema in our Models as 'User'
var QuotingDojo = mongoose.model('QuotingDojo') // We are retrieving this Schema from our Models, named 'User'

// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
// Integrate body-parser with our App
app.use(bodyParser.urlencoded({ extended: true }));
// Require path
var path = require('path');
// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, './static')));
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');
// Routes
// Root Request
app.get('/', function(req, res) {
  res.render('index');
})

app.get('/quotes', function(req, res) {
  QuotingDojo.find({}, function(err, quotes) {
    console.log(quotes)
    res.render('quotes', {quotes: quotes});
  })
})
// Add User Request
app.post('/quotes', function(req, res) {
    console.log("POST DATA", req.body);
    // create a new User with the name and age corresponding to those from req.body
    var dojo = new QuotingDojo({author: req.body.author, quote: req.body.quote});
    // Try to save that new user to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
    dojo.save(function(err) {
      // if there is an error console.log that something went wrong!
      if(err) {
        console.log('something went wrong');
      } else { // else console.log that we did well and then redirect to the root route
        console.log('successfully added a user!');
    res.redirect('/quotes');
  }
})
})
// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})
