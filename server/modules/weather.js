const request = require("request-promise");

const API_KEY = 'c85ccb926e5de07201ab9c892f079e7b';

class weather {
    static retriveByCity(city, callback) {
        request({
            url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}&units=imperial`,
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