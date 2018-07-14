'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PaginationEvent = exports.Pagination = undefined;

var _Pagination = require('./Pagination');

var _Pagination2 = _interopRequireDefault(_Pagination);

var _bus = require('.//bus');

var _bus2 = _interopRequireDefault(_bus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Pagination = _Pagination2.default;
exports.PaginationEvent = _bus2.default;