"use strict";
exports.__esModule = true;
exports.createUser = exports.getUser = exports.getAllUsers = void 0;
var getAllUsers = function (req, res) {
    res.send('get All Users');
};
exports.getAllUsers = getAllUsers;
var getUser = function (req, res) {
    res.json({ id: req.params.id });
};
exports.getUser = getUser;
var createUser = function (req, res) {
    res.json(req.body);
};
exports.createUser = createUser;
