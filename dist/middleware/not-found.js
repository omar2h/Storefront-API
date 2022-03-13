"use strict";
exports.__esModule = true;
var notFound = function (req, res) {
    return res.status(404).send('Route doesnt exist');
};
exports["default"] = notFound;
