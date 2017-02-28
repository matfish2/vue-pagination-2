'use strict';

var Pagination = require('../compiled/Pagination');
var merge = require('merge');
var busState = require('../compiled/state/bus');
var vuexState = require('../compiled/state/vuex');

exports.install = function (Vue, useVuex) {

  var state = useVuex ? vuexState() : busState();

  Vue.component('pagination', merge.recursive(Pagination, state));
};