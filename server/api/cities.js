var express = require("express");
var cities = require("../modules/cities");
var router = express.Router();

router.get("/", function (req, res) {
    cities.retriveAll(function (err, cities) {
        if (err)
            res.json(err);
        res.json(cities);
    });
});

router.post("/", function (req, res) {
    var city = req.body.city;

    cities.insert(city, function (err, result) {
        if (err)
            res.json(err);
        res.json(result);
    });
});

module.exports = router;