'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mitt = require('mitt');

var _mitt2 = _interopRequireDefault(_mitt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bus = (0, _mitt2.default)();

exports.default = bus;
module.exports = exports['default'];