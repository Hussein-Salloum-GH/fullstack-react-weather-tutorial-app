var express = require("express");
var weather = require("../modules/weather");
var router = express.Router();

router.get("/:city", (req, res) => {
    var city = req.params.city;
    //console.log("City you are asked? ", city);

    weather.retriveByCity(city, (err, weather) => {
        if (err)
            return res.json(err);
        return res.json(weather)
    });
});

module.exports = router;