var express = require('express');
const path = require("path");
const app = express()
let port = 7195
var indexRouter = require('./routes/index');
const bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname,"public")))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(bodyParser.json({
    limit: '100mb'
}));

//set template engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use('/', indexRouter);
app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;
