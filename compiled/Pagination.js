'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _template = require('./template');

var _template2 = _interopRequireDefault(_template);

var _RenderlessPagination = require('./RenderlessPagination');

var _RenderlessPagination2 = _interopRequireDefault(_RenderlessPagination);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    name: 'Pagination',
    components: { RenderlessPagination: _RenderlessPagination2.default },
    provide: function provide() {
        var _this = this;

        return {
            Page: function Page() {
                return _this.value;
            },
            perPage: function perPage() {
                return _this.perPage;
            },
            records: function records() {
                return _this.records;
            }
        };
    },
    render: function render(h) {
        return h('renderless-pagination', { scopedSlots: {
                default: function _default(props) {
                    return props.override ? h(props.override, {
                        attrs: { props: props }
                    }) : (0, _template2.default)(props)(h);
                }
            }
        });
    },

    props: {
        value: {
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
            default: 25
        },
        options: {
            type: Object
        }
    },
    data: function data() {
        return {
            aProps: {
                role: "button"
            }
        };
    }
};
module.exports = exports['default'];