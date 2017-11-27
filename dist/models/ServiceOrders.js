'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _db = require('../config/db');

var _db2 = _interopRequireDefault(_db);

var _Bills = require('./Bills');

var _Bills2 = _interopRequireDefault(_Bills);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ServiceOrder = _db2.default.sequelize.define('cao_os', {
  co_os: { type: _sequelize2.default.INTEGER, primaryKey: true },
  co_usuario: _sequelize2.default.STRING
}, {
  timestamps: false,
  underscored: true,
  freezeTableName: true
});

// ServiceOrder.belongsTo(Consultant, {foreignKey: 'co_usuario'});
ServiceOrder.hasMany(_Bills2.default, { foreignKey: 'co_os' });

exports.default = ServiceOrder;