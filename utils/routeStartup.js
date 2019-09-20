const express = require("express");
const routes = require("../routes/routes");

module.exports = function(app) {
  var bodyParser = require("body-parser");
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );
  app.use(express.json());
  app.use("/", routes);
};
