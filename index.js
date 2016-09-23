var Pagination = require('./src/Pagination.js');
var merge = require('merge');
var busState = require('./src/state/bus');
var vuexState = require('./src/state/vuex');

exports.install = function(Vue, useVuex) {

 var state = useVuex?
             vuexState():
             busState();

 Vue.component('pagination', merge.recursive(Pagination, state));

}




