const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Home Page for Weather Application");
});
let address = "";
router.post("/", (req, res) => {
  address = req.body.address;
  res.send(address);
});

router.get("/address", (req, res) => {
  const addressKey = encodeURIComponent(address);
  const geocodeUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=AaRK24xJjIIuEXHr2QcGKn9FGNZynzIN&location=${addressKey}`;
  res.redirect(geocodeUrl);
  //   console.log(res.result);
  //   res.send(address);
});

module.exports = router;
