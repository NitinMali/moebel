/**
 * Created by Nitin on 04-11-2015.
 */
// set up ========================
var application_root = __dirname;
var morgan = require('morgan');             // log requests to the console (express4)
var path = require("path");
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var jsonfile = require('jsonfile');

// configuration =================

var express  = require('express');
var app = express();                  // create our app w/ express

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(methodOverride());
app.use(express.static(application_root));


app.get('/getusers', function (req, res) {
    jsonfile.readFile('users.json', function(err, obj) {
        res.send(obj);
    });
});

app.post('/saveuser', function(req, res){
    var obj = req.body;
    jsonfile.writeFile('users.json', obj, function (err) {
        console.error(err)
    });
    res.send('Saved');
});

// application -------------------------------------------------------------
app.get('*', function(req, res) {
    res.sendfile('index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

// Launch server
app.listen(2000);