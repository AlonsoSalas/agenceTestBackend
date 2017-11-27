'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _ConsultantsRoutes = require('./ConsultantsRoutes');

var _ConsultantsRoutes2 = _interopRequireDefault(_ConsultantsRoutes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();

router.use('/consultants', _ConsultantsRoutes2.default);

exports.default = router;