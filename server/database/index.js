var { Pool } = require("pg");

//connection string 4 database
const CONNECTION_STRING = process.env.DATABASE_URL ||
    "postgresql://postgres:root123@localhost:5432/hs-weather-db";
const SSL = process.env.NODE_ENV === "production";

class Database {
    constructor() {
        this._pool = new Pool({
            connectionString: CONNECTION_STRING,
            ssl: SSL
        });

        //if error then exit 
        this._pool.on("error", (err, client) => {
            console.error("Unexpected error in IDLE client PostgreSQL. ", err);
            process.exit(-1);
        });

    }

    query(query, ...args) {
        this._pool.connect((err, client, done) => {
            if (err) {
                console.log("ERRRRR: ", err);
                throw err;
            }


            const params = args.length === 2 ? args[0] : [];
            const callback = args.length === 1 ? args[0] : args[1];

            client.query(query, params, (err, res) => {
                done();

                if (err) {
                    console.log(err.stack);
                    callback({ error: "Database error." }, null);
                }

                callback({}, res.rows);
            });

        });
    }

    end() {
        this._pool.end();
    }

}

module.exports = new Database();