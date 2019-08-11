var express = require("express");
var cities = require("../modules/cities");
var router = express.Router();

router.get("/", (req, res) => {
    cities.retriveAll((err, cities) => {
        if (err)
            return res.json(err);

        return res.json(cities);
    });
});

router.post("/", (req, res) => {
    var city = req.body.city;

    cities.insert(city, (err, result) => {
        if (err)
            return res.json(err);
        return res.json(result);
    });
});

module.exports = router;