'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ErrorHandler = require('../handler/ErrorHandler');

var _ErrorHandler2 = _interopRequireDefault(_ErrorHandler);

var _Consultants = require('../models/Consultants');

var _Consultants2 = _interopRequireDefault(_Consultants);

var _ServiceOrders = require('../models/ServiceOrders');

var _ServiceOrders2 = _interopRequireDefault(_ServiceOrders);

var _Bills = require('../models/Bills');

var _Bills2 = _interopRequireDefault(_Bills);

var _Salaries = require('../models/Salaries');

var _Salaries2 = _interopRequireDefault(_Salaries);

var _db = require('../config/db');

var _db2 = _interopRequireDefault(_db);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

require('babel/polyfill');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ConsultantsController = function () {
    function ConsultantsController() {
        _classCallCheck(this, ConsultantsController);
    }

    _createClass(ConsultantsController, [{
        key: 'getConsultants',
        value: function getConsultants(req, res, next) {

            _db2.default.sequelize.query("SELECT cao_usuario.co_usuario, cao_usuario.no_usuario  FROM permissao_sistema INNER JOIN cao_usuario ON permissao_sistema.co_usuario=cao_usuario.co_usuario WHERE permissao_sistema.co_sistema = 1 AND permissao_sistema.in_ativo = 'S' AND (permissao_sistema.co_tipo_usuario = 0 OR permissao_sistema.co_tipo_usuario = 1 OR permissao_sistema.co_tipo_usuario = 2)").spread(function (results, metadata) {
                res.status(200).json(results);
            });
        }
    }, {
        key: 'getConsultantReport',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
                var fromDate, toDate, users, result, reportData;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (!(req.query.fromDate || req.query.toDate || req.query.users)) {
                                    _context.next = 12;
                                    break;
                                }

                                fromDate = (0, _moment2.default)(req.query.from, 'DD-MM-YYYY');
                                toDate = (0, _moment2.default)(req.query.to, 'DD-MM-YYYY');
                                users = typeof req.query.users === 'string' ? [req.query.users] : req.query.users;
                                _context.next = 6;
                                return _Consultants2.default.findAll({ where: {
                                        co_usuario: {
                                            $or: users
                                        }
                                    }, include: [{
                                        model: _Salaries2.default
                                    }, {
                                        model: _ServiceOrders2.default,
                                        include: [{
                                            model: _Bills2.default,
                                            where: {
                                                data_emissao: { $gte: fromDate.format('YYYY-MM-DD'), $lte: toDate.format('YYYY-MM-DD') }
                                            }
                                        }]
                                    }] });

                            case 6:
                                result = _context.sent;
                                reportData = [];


                                result.forEach(function (consultant) {

                                    var user = {
                                        name: consultant.no_usuario,
                                        id: consultant.co_usuario,
                                        salary: consultant.cao_salarios.length > 0 ? consultant.cao_salarios[0].brut_salario : 0,
                                        months: [],
                                        totalIncome: 0,
                                        totalcommission: 0
                                    };

                                    if (consultant.cao_os.length > 0) {

                                        var previusMonth = (0, _moment2.default)(consultant.cao_os[0].cao_faturas[0].data_emissao, "YYYY-MM-DD");

                                        var month = {
                                            month: previusMonth.format('MM-YYYY'),
                                            income: 0,
                                            commission: 0
                                        };

                                        var cont = 0;

                                        consultant.cao_os[0].cao_faturas.forEach(function (bill) {

                                            var billDate = (0, _moment2.default)(bill.data_emissao, "YYYY-MM-DD");

                                            if (previusMonth.isSame(billDate, 'month')) {
                                                month.income = month.income + (bill.valor - bill.valor * bill.total_imp_inc / 100);
                                                month.commission = month.commission + (bill.valor - bill.valor * bill.total_imp_inc / 100) * (bill.valor * bill.comissao_cn) / 100;

                                                if (cont === consultant.cao_os[0].cao_faturas.length - 1) {

                                                    user.months.push(month);
                                                    user.totalIncome = user.totalIncome + month.income;
                                                    user.totalcommission = user.totalcommission + month.commission;

                                                    month = {
                                                        month: billDate.format('MM-YYYY'),
                                                        income: 0,
                                                        commission: 0
                                                    };
                                                }
                                            } else {

                                                user.months.push(month);
                                                user.totalIncome = user.totalIncome + month.income;
                                                user.totalcommission = user.totalcommission + month.commission;

                                                previusMonth = billDate;

                                                //clean month obj
                                                month = {
                                                    month: billDate.format('MM-YYYY'),
                                                    income: 0,
                                                    commission: 0
                                                };

                                                month.income = month.income + (bill.valor - bill.valor * bill.total_imp_inc / 100);
                                                month.commission = month.commission + (bill.valor - bill.valor * bill.total_imp_inc / 100) * (bill.valor * bill.comissao_cn) / 100;
                                            }
                                            cont++;
                                        });
                                    }

                                    reportData.push(user);
                                });

                                res.status(200).json(reportData);

                                _context.next = 13;
                                break;

                            case 12:
                                res.status(400).json('Some fields on the request are invalid');

                            case 13:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getConsultantReport(_x, _x2, _x3) {
                return _ref.apply(this, arguments);
            }

            return getConsultantReport;
        }()
    }]);

    return ConsultantsController;
}();

var consultantsController = new ConsultantsController();

exports.default = consultantsController;