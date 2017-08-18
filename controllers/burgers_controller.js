var express = require("express");
var db = require("../models");
var router = express.Router();
var methodOverride = require("method-override");
var app = express();

// var sequelizeConnection = models.sequelize;

// get route -> index
router.get("/", function(req, res) {
  res.redirect("/burgers");
});

router.get("/burgers", function(req, res) {
  // express callback response by calling burger.selectAllBurger
  db.burger.findAll({}).then(function(data) {
    // Wrapping the array of returned burgers in a object so it can be referenced inside our handlebars
    var hbsObject = { burgers: data };
    res.render("index", hbsObject);
  });
});

router.post("/burgers/create", function(req, res) {
  db.burger.create({
    burger_name: req.body.burger_name
  }, {
    devoured: req.body.devoured
  }).then(function(result) {
    console.log(result);
    res.redirect("/");
  });
});

// put route -> back to index
router.put("/burgers/update/:id", function(req, res) {
  db.burger.update({devoured: true}, {
    where: { id: req.params.id }
  }).then(function(data) {
    console.log("result", data);
    res.redirect("/");
  });
});


module.exports = router;