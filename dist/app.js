'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _db = require('./config/db');

var _db2 = _interopRequireDefault(_db);

var _config = require('./config/config');

var _config2 = _interopRequireDefault(_config);

var _routes = require('./routes/');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var port = process.env.PORT || 8000;

/*Loading envioroment vars from .env file,  this file is not available in the repository,
so if you need to test this ApiGateway in localhost you must create your own*/
_dotenv2.default.config({
    silent: true
});

//Setting up the Express App

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({
    extended: false
}));

app.use(_config2.default.CorssConfig);

app.use("/api", _routes2.default);

app.use(function (req, res, next) {

    res.status(404).send({
        message: "No HTTP resource was found that matches the request URI",
        endpoint: req.url,
        method: req.method
    });
});

app.use(function (err, req, res, next) {
    // console.error(err.stack);
    res.status(500).json(err);
});

// app.set("models", require("./app/model"));

_db2.default.sequelize.authenticate().then(function () {
    console.log('Connection has been established successfully.');

    app.listen(port);

    console.info('sever running on port ' + port);
}).catch(function (err) {
    console.error('Unable to connect to the database:', err);
});