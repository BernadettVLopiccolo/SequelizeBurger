'use strict';

var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var Sequelize = require("sequelize");
var models = require("./models");
var db = require("./models");

var app = express();
// Serve static content for the app from the "public" directory in the application directory.
// app.use(express.static(__dirname, "public"));
app.use(express.static(process.cwd() + "/public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));
// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

var routes = require("./controllers/burgers_controller");

app.use("/", routes);
// app.use("/update", routes);
// app.use("/create", routes);

// listen on port 3000
var PORT = process.env.PORT || 3000;
db.sequelize.sync().then(function() {
	app.listen(PORT, function() {
		console.log("App listening on PORT: " + PORT);
	});
});
