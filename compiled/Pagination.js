Object.defineProperty(exports, "__esModule", {
    value: true
});

var _RenderlessPagination = require("./RenderlessPagination");

var _RenderlessPagination2 = _interopRequireDefault(_RenderlessPagination);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    components: { RenderlessPagination: _RenderlessPagination2.default },
    render: function render() {
        with(this) {
            return _c('RenderlessPagination', {
                on: {
                    "paginate": paginate
                },
                scopedSlots: _u([{
                    key: "default",
                    fn: function({
                        pages,
                        pageEvents,
                        setFirstPage,
                        setLastPage,
                        setPrevChunk,
                        setNextChunk,
                        prevChunkProps,
                        nextChunkProps,
                        firstPageProps,
                        lastPageProps,
                        pageClasses,
                        showPagination,
                        setPrevPage,
                        setNextPage,
                        prevProps,
                        nextProps,
                        hasRecords,
                        theme,
                        texts,
                        count
                    }) {
                        return _c('div', {
                            staticClass: "VuePagination",
                            class: theme.wrapper
                        }, [_c('nav', {
                            class: theme
                                .nav
                        }, [_c('ul', {
                            directives: [{
                                name: "show",
                                rawName: "v-show",
                                value:
                                    (
                                        showPagination
                                    ),
                                expression: "showPagination"
                            }],
                            class: theme
                                .list
                        }, [_c(
                                'li', {
                                    class: theme
                                        .firstPage,
                                    on: {
                                        "click": setFirstPage
                                    }
                                }, [
                                    _c(
                                        'a',
                                        _b({},
                                            'a', {
                                                ...
                                                aProps,
                                                ...
                                                firstPageProps
                                            },
                                            false
                                        ), [
                                            _v(
                                                _s(
                                                    texts
                                                    .first
                                                )
                                            )
                                        ]
                                    )
                                ]
                            ),
                            _c(
                                'li', {
                                    class: theme
                                        .prevChunk,
                                    on: {
                                        "click": setPrevChunk
                                    }
                                }, [
                                    _c(
                                        'a',
                                        _b({},
                                            'a', {
                                                ...
                                                aProps,
                                                ...
                                                prevChunkProps
                                            },
                                            false
                                        ), [
                                            _v(
                                                _s(
                                                    texts
                                                    .prevChunk
                                                )
                                            )
                                        ]
                                    )
                                ]
                            ),
                            _c(
                                'li', {
                                    class: theme
                                        .prev,
                                    on: {
                                        "click": setPrevPage
                                    }
                                }, [
                                    _c(
                                        'a',
                                        _b({},
                                            'a', {
                                                ...
                                                aProps,
                                                ...
                                                prevProps
                                            },
                                            false
                                        ), [
                                            _v(
                                                _s(
                                                    texts
                                                    .prevPage
                                                )
                                            )
                                        ]
                                    )
                                ]
                            ),
                            _l(
                                (
                                    pages
                                ),
                                function(
                                    page
                                ) {
                                    return _c(
                                        'li',
                                        _g({
                                                key: page,
                                                class: pageClasses(
                                                    page
                                                )
                                            },
                                            pageEvents(
                                                page
                                            )
                                        ), [
                                            _c(
                                                'a',
                                                _b({
                                                        class: theme
                                                            .link
                                                    },
                                                    'a',
                                                    aProps,
                                                    false
                                                ), [
                                                    _v(
                                                        _s(
                                                            page
                                                        )
                                                    )
                                                ]
                                            )
                                        ]
                                    )
                                }
                            ),
                            _c(
                                'li', {
                                    class: theme
                                        .next,
                                    on: {
                                        "click": setNextPage
                                    }
                                }, [
                                    _c(
                                        'a',
                                        _b({},
                                            'a', {
                                                ...
                                                aProps,
                                                ...
                                                nextProps
                                            },
                                            false
                                        ), [
                                            _v(
                                                _s(
                                                    texts
                                                    .nextPage
                                                )
                                            )
                                        ]
                                    )
                                ]
                            ),
                            _c(
                                'li', {
                                    class: theme
                                        .nextChunk,
                                    on: {
                                        "click": setNextChunk
                                    }
                                }, [
                                    _c(
                                        'a',
                                        _b({},
                                            'a', {
                                                ...
                                                aProps,
                                                ...
                                                nextChunkProps
                                            },
                                            false
                                        ), [
                                            _v(
                                                _s(
                                                    texts
                                                    .nextChunk
                                                )
                                            )
                                        ]
                                    )
                                ]
                            ),
                            _c(
                                'li', {
                                    class: theme
                                        .lastPage,
                                    on: {
                                        "click": setLastPage
                                    }
                                }, [
                                    _c(
                                        'a',
                                        _b({},
                                            'a', {
                                                ...
                                                aProps,
                                                ...
                                                lastPageProps
                                            },
                                            false
                                        ), [
                                            _v(
                                                _s(
                                                    texts
                                                    .last
                                                )
                                            )
                                        ]
                                    )
                                ]
                            )
                        ], 2), _c(
                            'p', {
                                directives: [{
                                    name: "show",
                                    rawName: "v-show",
                                    value:
                                        (
                                            hasRecords
                                        ),
                                    expression: "hasRecords"
                                }],
                                class: theme
                                    .count
                            }, [_v(
                                _s(
                                    count
                                )
                            )])])])
                    }
                }])
            })
        }
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
                href: "javascript:void(0);",
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