'use strict';

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var _process$env = process.env,
    DB_HOST = _process$env.DB_HOST,
    DB_DATABASE = _process$env.DB_DATABASE,
    DB_USERNAME = _process$env.DB_USERNAME,
    DB_PASSWORD = _process$env.DB_PASSWORD;


var sequelize = new _sequelize2.default(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
	host: DB_HOST,
	// dialect: DB_CONNECTION,
	dialect: 'mysql',

	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	}
});

var db = {
	sequelize: sequelize,
	Sequelize: _sequelize2.default
};

module.exports = db;