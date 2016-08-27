import Vue from 'vue';

var Pagination = require('./src/Pagination.vue');

exports.install = function(Vue) {

 Vue.component('pagination', Pagination);

}




