// تضمين ملفات الربط والتحويل
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");


// قاعدة البيانات
var db = require("./database");

//متحولات البيئة 
const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 5000;

// تهيئة
const app = express();

// استخدام
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

// register API middlewares
app.use("/api/cities", require("./api/cities"));
app.use("/api/weather", require("./api/weather"));

// listen 4 clients
app.listen(PORT, () => {
    console.log(`SERVER Listinig and running on port ${PORT}...`);
});

// just test connectivity  between SERVER & PostgreSQL 
db.query("SELECT NOW()", (err, res) => {
    if (err.error)
        console.log(err.error);
    console.log(`PostgreSQL connected OK @ ${res[0].now}`);
});

module.exports = app;