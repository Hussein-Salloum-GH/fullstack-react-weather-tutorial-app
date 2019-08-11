const request = require("request-promise");
require("dotenv").config();

class weather {
    static retriveByCity(city, callback) {
        request({
            url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${process.env.WEATHER_API_KEY}&units=imperial`,
            json: true
        }).then(function (res) {
            callback(res);
        }).catch(function (err) {
            console.log(err);
            callback({ error: "Could not reach openweathermap.com API" });
        })
    };
}

module.exports = weather;