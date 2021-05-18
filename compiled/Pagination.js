"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _template = require("./template");

var _template2 = _interopRequireDefault(_template);

var _RenderlessPagination = require("./RenderlessPagination");

var _RenderlessPagination2 = _interopRequireDefault(_RenderlessPagination);

var _vue = require("vue");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'Pagination',
  emits: ['update:modelValue', 'paginate'],
  components: {
    RenderlessPagination: _RenderlessPagination2.default
  },
  provide: function provide() {
    var _this = this;

    return {
      Page: function Page() {
        return _this.modelValue;
      },
      perPage: function perPage() {
        return _this.perPage;
      },
      records: function records() {
        return _this.records;
      }
    };
  },
  render: function render() {
    return (0, _vue.h)(_RenderlessPagination2.default, {
      ref: 'pg'
    }, {
      default: function _default(props) {
        return props.override ? (0, _vue.h)(props.override, {
          props: props
        }) : (0, _template2.default)(props)(_vue.h);
      }
    });
  },
  methods: {
    setPage: function setPage(page) {
      this.$refs.pg.setPage(page);
    }
  },
  props: {
    modelValue: {
      type: Number,
      required: true,
      validator: function validator(val) {
        return val > 0;
      }
    },
    records: {
      type: Number,
      required: true
    },
    perPage: {
      type: Number,
      required: true
    },
    options: {
      type: Object
    }
  }
};
module.exports = exports["default"];