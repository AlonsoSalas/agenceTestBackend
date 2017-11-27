'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _ConsultantsController = require('../controllers/ConsultantsController');

var _ConsultantsController2 = _interopRequireDefault(_ConsultantsController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();

/* The Base Path for this router is /consultants you can see it on index.js */

router.get('/', _ConsultantsController2.default.getConsultants).get('/report', _ConsultantsController2.default.getConsultantReport);

exports.default = router;