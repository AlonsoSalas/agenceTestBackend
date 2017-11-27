'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _db = require('../config/db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Bill = _db2.default.sequelize.define('cao_fatura', {
  co_fatura: { type: _sequelize2.default.INTEGER, primaryKey: true },
  co_os: _sequelize2.default.INTEGER,
  valor: _sequelize2.default.FLOAT,
  data_emissao: _sequelize2.default.DATE,
  total_imp_inc: _sequelize2.default.FLOAT,
  comissao_cn: _sequelize2.default.FLOAT
}, {
  timestamps: false,
  underscored: true,
  freezeTableName: true
});

// Bill.belongsTo(ServiceOrder, {foreignKey: 'co_os'});

exports.default = Bill;