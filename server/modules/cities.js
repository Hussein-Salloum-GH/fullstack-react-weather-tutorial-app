var db = require("../database");

class cities {
    static retriveAll(callback) {
        db.query("SELECT city_name FROM cities", function (err, res) {
            if (err) {
                return callback(err);
            }
            callback(res);
        });
    };

    static insert(city, callback) {
        db.query(`INSERT INTO cities(city_name) values (${city}) `, function (err, res) {
            if (err) {
                return callback(err);
            }
            callback(res);
        });
    };
}

module.exports = cities;