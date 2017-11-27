'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _db = require('../config/db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Salary = _db2.default.sequelize.define('cao_salario', {
  co_usuario: { type: _sequelize2.default.STRING, primaryKey: true },
  brut_salario: _sequelize2.default.FLOAT,
  liq_salario: _sequelize2.default.FLOAT
}, {
  timestamps: false,
  underscored: true,
  freezeTableName: true
});

// Salary.belongsTo(ServiceOrder, {foreignKey: 'co_os'});

exports.default = Salary;