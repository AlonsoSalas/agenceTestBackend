'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*Loading envioroment vars from .env file,  this file is not available in the repository,
so if you need to test this ApiGateway in localhost you must create your own*/

_dotenv2.default.config();

var CorssConfig = function CorssConfig(req, res, next) {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    // res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range, Origin');

    if (req.method === 'OPTIONS') return res.sendStatus(200);

    return next();
};

exports.default = {
    CorssConfig: CorssConfig
};