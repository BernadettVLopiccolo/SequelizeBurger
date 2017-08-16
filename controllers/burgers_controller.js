var express = require("express");
var models = require("../models");
var router = express.Router();
var burger = require("../models/burger");
var methodOverride = require("method-override");

var sequelizeConnection = models.sequelize;

// get route -> index
router.get("/", function(req, res) {
  res.redirect("/burgers");
});

router.get("/burgers", function(req, res) {
  // express callback response by calling burger.selectAllBurger
  models.burger.findAll({}).then(function(data) {
    // Wrapping the array of returned burgers in a object so it can be referenced inside our handlebars
    var hbsObject = { burgers: data };
    res.render("index", hbsObject);
  });
});

// post route -> back to index
router.post("/burgers/create", function(req, res) {
  // takes the request object using it as input for buger.addBurger
  models.burger.create({burger_name: req.body.burger_name}, {devoured: req.body.devoured}).then(function(result) {
    // wrapper for orm.js that using MySQL insert callback will return a log to console,
    // render back to index with handle
    console.log(result);
    res.redirect("/");
  });
});

// put route -> back to index
router.put("/burgers/update/:id", function(req, res) {
  console.log("yolo");
  models.burger.update({devoured: true}, {
    // fields: ["devoured"],
    where: { id: req.params.id }
  }).then(function(data) {
    // wrapper for orm.js that using MySQL update callback will return a log to console,
    // render back to index with handle
    console.log("result", data);
    res.redirect("/");
  });
});

module.exports = router;
