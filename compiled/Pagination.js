'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _RenderlessPagination = require('./RenderlessPagination');

var _RenderlessPagination2 = _interopRequireDefault(_RenderlessPagination);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    components: { RenderlessPagination: _RenderlessPagination2.default },
    render: function render() {
        return _c('RenderlessPagination', {
            on: {
                "paginate": paginate
            },
            scopedSlots: _u([{
                key: "default",
                fn: function fn(_ref) {
                    var pages = _ref.pages,
                        pageEvents = _ref.pageEvents,
                        hasEdgeNav = _ref.hasEdgeNav,
                        setFirstPage = _ref.setFirstPage,
                        setLastPage = _ref.setLastPage,
                        setPrevChunk = _ref.setPrevChunk,
                        setNextChunk = _ref.setNextChunk,
                        hasChunksNav = _ref.hasChunksNav,
                        prevChunkProps = _ref.prevChunkProps,
                        nextChunkProps = _ref.nextChunkProps,
                        firstPageProps = _ref.firstPageProps,
                        lastPageProps = _ref.lastPageProps,
                        pageClasses = _ref.pageClasses,
                        showPagination = _ref.showPagination,
                        setPrevPage = _ref.setPrevPage,
                        setNextPage = _ref.setNextPage,
                        prevProps = _ref.prevProps,
                        nextProps = _ref.nextProps,
                        hasRecords = _ref.hasRecords,
                        theme = _ref.theme,
                        texts = _ref.texts,
                        count = _ref.count;

                    return _c('div', {
                        staticClass: "VuePagination",
                        class: theme.wrapper
                    }, [_c('nav', {
                        class: theme.nav
                    }, [_c('ul', {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: showPagination,
                            expression: "showPagination"
                        }],
                        class: theme.list
                    }, [hasEdgeNav ? _c('li', {
                        class: theme.firstPage,
                        on: {
                            "click": setFirstPage
                        }
                    }, [_c('a', _b({}, 'a', _extends({}, aProps, firstPageProps), false), [_v(_s(texts.first))])]) : _e(), hasChunksNav ? _c('li', {
                        class: theme.prevChunk,
                        on: {
                            "click": setPrevChunk
                        }
                    }, [_c('a', _b({}, 'a', _extends({}, aProps, prevChunkProps), false), [_v(_s(texts.prevChunk))])]) : _e(), _c('li', {
                        class: theme.prev,
                        on: {
                            "click": setPrevPage
                        }
                    }, [_c('a', _b({}, 'a', _extends({}, aProps, prevProps), false), [_v(_s(texts.prevPage))])]), _l(pages, function (page) {
                        return _c('li', _g({
                            key: page,
                            class: pageClasses(page)
                        }, pageEvents(page)), [_c('a', _b({
                            class: theme.link
                        }, 'a', aProps, false), [_v(_s(page))])]);
                    }), _c('li', {
                        class: theme.next,
                        on: {
                            "click": setNextPage
                        }
                    }, [_c('a', _b({}, 'a', _extends({}, aProps, nextProps), false), [_v(_s(texts.nextPage))])]), hasChunksNav ? _c('li', {
                        class: theme.nextChunk,
                        on: {
                            "click": setNextChunk
                        }
                    }, [_c('a', _b({}, 'a', _extends({}, aProps, nextChunkProps), false), [_v(_s(texts.nextChunk))])]) : _e(), hasEdgeNav ? _c('li', {
                        class: theme.lastPage,
                        on: {
                            "click": setLastPage
                        }
                    }, [_c('a', _b({}, 'a', _extends({}, aProps, lastPageProps), false), [_v(_s(texts.last))])]) : _e()], 2), _c('p', {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: hasRecords,
                            expression: "hasRecords"
                        }],
                        class: theme.count
                    }, [_v(_s(count))])])]);
                }
            }])
        });
    },
    props: {
        for: {
            type: String,
            required: false
        },
        page: {
            type: Number,
            default: 1
        },
        records: {
            type: Number,
            required: true
        },
        perPage: {
            type: Number,
            default: 25
        },
        vuex: {
            type: Boolean
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
    },
    methods: {
        paginate: function paginate(page) {
            this.$emit('paginate', page);
        }
    }
};
module.exports = exports['default'];