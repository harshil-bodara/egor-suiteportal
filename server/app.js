var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cors = require("cors");
const db = require("./configs/db");
var indexRouter = require("./routes/index");

var app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cors());

app.use("/api", indexRouter);

//  DB Connection
db.connect();

app.get('/', function (req, res, next) {
  res.send({ title: ' API' });
});

// Static file serve config
app.use(express.static(path.join(__dirname, "build")));
console.log("__dirname__dirname__dirname__dirname__dirname__dirname__dirname__dirname",__dirname)
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;