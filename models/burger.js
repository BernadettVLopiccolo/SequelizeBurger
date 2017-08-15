'use strict';
var Sequelize = require("sequelize");
module.exports = function(sequelize, DataTypes) {
  var burger = sequelize.define("burger", {
    burger_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 100]
      }
    },
    devoured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
  burger.sync();
  return burger;
};