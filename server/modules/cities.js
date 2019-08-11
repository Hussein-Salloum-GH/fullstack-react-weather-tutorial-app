var db = require("../database");

class cities {
    static retriveAll(callback) {
        db.query("SELECT city_name FROM cities", (err, res) => {
            if (err.error) {
                return callback(err);
            }
            callback(res);
        });
    };

    static insert(city, callback) {
        db.query(`INSERT INTO cities(city_name) values ($1)`, [city], function (err, res) {
            if (err.error) {
                return callback(err);
            }
            callback(res);
        });
    };
}

module.exports = cities;