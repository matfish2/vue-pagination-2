import RenderlessPagination from './RenderlessPagination';

export default {
    components:{RenderlessPagination:RenderlessPagination},
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
                        hasEdgeNav,
                        setFirstPage,
                        setLastPage,
                        setPrevChunk,
                        setNextChunk,
                        hasChunksNav,
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
                        }, [(
                            hasEdgeNav
                        ) ?
                        _c(
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
                        ) :
                        _e(),
                        (
                            hasChunksNav
                        ) ?
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
                        ) :
                        _e(),
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
                (
                    hasChunksNav
                ) ?
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
                ) :
                _e(),
                (
                    hasEdgeNav
                ) ?
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
                ) :
                _e()
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
props:{
    for: {
        type: String,
        required: false
    },
    page:{
        type:Number,
        default:1
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
    options:{
        type: Object
    }
},
data: function() {
    return {
        aProps:{
            role:"button"
        }
    }
},
methods:{
    paginate(page) {
        this.$emit('paginate', page)
    }
}
}
