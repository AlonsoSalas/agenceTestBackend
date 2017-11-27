'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _db = require('../config/db');

var _db2 = _interopRequireDefault(_db);

var _ServiceOrders = require('./ServiceOrders');

var _ServiceOrders2 = _interopRequireDefault(_ServiceOrders);

var _Salaries = require('./Salaries');

var _Salaries2 = _interopRequireDefault(_Salaries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Consultant = _db2.default.sequelize.define('cao_usuario', {
  co_usuario: { type: _sequelize2.default.STRING, primaryKey: true },
  no_usuario: _sequelize2.default.STRING
}, {
  timestamps: false,
  underscored: true,
  freezeTableName: true
});

Consultant.hasMany(_ServiceOrders2.default, { foreignKey: 'co_usuario' });
Consultant.hasMany(_Salaries2.default, { foreignKey: 'co_usuario' });

exports.default = Consultant;