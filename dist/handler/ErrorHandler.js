'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var ErrorHandler = function ErrorHandler(err, res, req, next) {

    switch (err.name) {

        case 'CustomError':
            res.status(err.statusCode);
            delete err.statusCode;
            delete err.name;
            res.json(err);
            break;

        case 'ROUTE_NOT_FOUND':
            res.status(503);
            // console.log(req);
            var error = {
                resource: req.originalUrl,
                message: 'The resource that you try to access is not available for now'
            };
            res.json(error);
            break;

        default:
            next(err);

    }
};

exports.default = ErrorHandler;