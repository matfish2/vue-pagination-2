'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _merge = require('merge');

var _merge2 = _interopRequireDefault(_merge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var bus = require('./bus').default;
exports.default = {
  props: {
    itemClass: {
      required: false,
      default: 'VuePagination__pagination-item'
    }
  },
  render: function render() {
    var _this = this;

    return this.$scopedSlots.default({
      showPagination: this.totalPages > 1,
      pages: this.pages,
      pageEvents: function pageEvents(page) {
        return {
          click: function click() {
            return _this.setPage(page);
          },
          keydown: function keydown(e) {
            if (e.key === 'ArrowRight') {
              _this.next();
            }

            if (e.key === 'ArrowLeft') {
              _this.prev();
            }
          }
        };
      },
      hasEdgeNav: this.opts.edgeNavigation && this.totalChunks > 1,
      setFirstPage: this.setPage.bind(this, 1),
      setLastPage: this.setPage.bind(this, this.totalPages),
      hasChunksNav: this.opts.chunksNavigation === 'fixed',
      setPrevChunk: this.prevChunk,
      setNextChunk: this.nextChunk,
      setPrevPage: this.prev,
      firstPageProps: {
        class: this.Theme.link,
        disabled: this.page === 1
      },
      lastPageProps: {
        class: this.Theme.link,
        disabled: this.page === this.totalPages
      },
      prevProps: {
        class: this.Theme.link,
        disabled: !!this.allowedPageClass(this.page - 1)
      },
      nextProps: {
        class: this.Theme.link,
        disabled: !!this.allowedPageClass(this.page + 1)
      },
      pageClasses: function pageClasses(page) {
        return _this.itemClass + ' ' + _this.Theme.item + ' ' + _this.activeClass(page);
      },
      prevChunkProps: {
        class: this.Theme.link,
        disabled: !this.allowedChunk(-1)
      },
      nextChunkProps: {
        class: this.Theme.link,
        disabled: !this.allowedChunk(1)
      },
      setNextPage: this.next,
      theme: {
        nav: this.Theme.nav,
        list: 'VuePagination__pagination ' + this.Theme.list,
        prev: this.itemClass + ' ' + this.itemClass + '-prev-page ' + this.Theme.item + ' ' + this.Theme.prev + ' ' + this.allowedPageClass(this.page - 1),
        next: this.itemClass + '  ' + this.itemClass + '-next-page ' + this.Theme.item + ' ' + this.Theme.next + ' ' + this.allowedPageClass(this.page + 1),
        prevChunk: this.itemClass + ' ' + this.Theme.item + ' ' + this.Theme.prev + ' ' + this.itemClass + '-prev-chunk ' + this.allowedChunkClass(-1),
        nextChunk: this.itemClass + ' ' + this.Theme.item + ' ' + this.Theme.prev + ' ' + this.itemClass + '-prev-chunk ' + this.allowedChunkClass(1),
        firstPage: this.itemClass + ' ' + this.Theme.item + ' ' + (this.page === 1 ? this.Theme.disabled : '') + ' ' + this.itemClass + '-prev-chunk',
        lastPage: this.itemClass + ' ' + this.Theme.item + ' ' + (this.page === this.totalPages ? this.Theme.disabled : '') + ' ' + this.itemClass + '-prev-chunk',
        link: this.Theme.link,
        page: this.itemClass + ' ' + this.Theme.item,
        wrapper: this.Theme.wrapper,
        count: 'VuePagination__count ' + this.Theme.count
      },
      hasRecords: this.hasRecords,
      count: this.count,
      texts: this.opts.texts
    });
  },

  created: function created() {

    if (!this.Vuex) return;

    if (!this.For) {
      throw new Error('vue-pagination-2: The "for" prop is required when using vuex');
    }

    var name = this.For;

    if (this.$store.state[name]) return;

    this.$store.registerModule(this.For, {
      state: {
        page: this.Page
      },
      mutations: _defineProperty({}, name + '/PAGINATE', function undefined(state, page) {
        state.page = page;
      })
    });
  },
  data: function data() {
    return {
      Page: this.$parent.page,
      firstPage: this.$parent.page,
      For: this.$parent.for,
      Records: this.$parent.records,
      PerPage: this.$parent.perPage,
      Vuex: this.$parent.vuex,
      Options: this.$parent.options
    };
  },
  computed: {
    opts: function opts() {
      return _merge2.default.recursive((0, _config2.default)(), this.Options);
    },
    Theme: function Theme() {

      if (_typeof(this.opts.theme) === 'object') {
        return this.opts.theme;
      }

      var themes = {
        bootstrap3: require('./themes/bootstrap3'),
        bootstrap4: require('./themes/bootstrap4'),
        bulma: require('./themes/bulma')
      };

      if (_typeof(themes[this.opts.theme]) === undefined) {
        throw 'vue-pagination-2: the theme ' + this.opts.theme + ' does not exist';
      }

      return themes[this.opts.theme];
    },
    page: function page() {
      return this.Vuex ? this.$store.state[this.For].page : this.Page;
    },

    pages: function pages() {

      if (!this.Records) return [];

      return range(this.paginationStart, this.pagesInCurrentChunk);
    },
    totalPages: function totalPages() {
      return this.Records ? Math.ceil(this.Records / this.PerPage) : 1;
    },
    totalChunks: function totalChunks() {
      return Math.ceil(this.totalPages / this.opts.chunk);
    },
    currentChunk: function currentChunk() {
      return Math.ceil(this.page / this.opts.chunk);
    },
    paginationStart: function paginationStart() {

      if (this.opts.chunksNavigation === 'scroll') {
        return this.firstPage;
      }

      return (this.currentChunk - 1) * this.opts.chunk + 1;
    },
    pagesInCurrentChunk: function pagesInCurrentChunk() {
      return this.paginationStart + this.opts.chunk <= this.totalPages ? this.opts.chunk : this.totalPages - this.paginationStart + 1;
    },
    hasRecords: function hasRecords() {
      return parseInt(this.Records) > 0;
    },

    count: function count() {

      if (/{page}/.test(this.opts.texts.count)) {

        if (this.totalPages <= 1) return '';

        return this.opts.texts.count.replace('{page}', this.page).replace('{pages}', this.totalPages);
      }

      var parts = this.opts.texts.count.split('|');
      var from = (this.page - 1) * this.PerPage + 1;
      var to = this.page == this.totalPages ? this.Records : from + this.PerPage - 1;
      var i = Math.min(this.Records == 1 ? 2 : this.totalPages == 1 ? 1 : 0, parts.length - 1);

      return parts[i].replace('{count}', this.formatNumber(this.Records)).replace('{from}', this.formatNumber(from)).replace('{to}', this.formatNumber(to));
    }
  },
  methods: {
    setPage: function setPage(page) {
      if (this.allowedPage(page)) {
        this.paginate(page);
      }
    },
    paginate: function paginate(page) {
      var _this2 = this;

      if (this.Vuex) {
        this.$store.commit(this.For + '/PAGINATE', page);
      } else {
        this.Page = page;
      }

      this.$emit('paginate', page);

      if (this.For && bus) {
        bus.$emit('vue-pagination::' + this.For, page);
      }

      this.$nextTick(function () {
        _this2.$el.querySelector('li.active a').focus();
      });
    },

    next: function next() {
      var page = this.page + 1;
      if (this.opts.chunksNavigation === 'scroll' && this.allowedPage(page) && !this.inDisplay(page)) {
        this.firstPage++;
      }
      return this.setPage(page);
    },
    prev: function prev() {
      var page = this.page - 1;

      if (this.opts.chunksNavigation === 'scroll' && this.allowedPage(page) && !this.inDisplay(page)) {
        this.firstPage--;
      }

      return this.setPage(page);
    },
    inDisplay: function inDisplay(page) {

      var start = this.firstPage;
      var end = start + this.opts.chunk - 1;

      return page >= start && page <= end;
    },

    nextChunk: function nextChunk() {
      return this.setChunk(1);
    },
    prevChunk: function prevChunk() {
      return this.setChunk(-1);
    },
    setChunk: function setChunk(direction) {
      this.setPage((this.currentChunk - 1 + direction) * this.opts.chunk + 1);
    },
    allowedPage: function allowedPage(page) {
      return page >= 1 && page <= this.totalPages;
    },
    allowedChunk: function allowedChunk(direction) {
      return direction == 1 && this.currentChunk < this.totalChunks || direction == -1 && this.currentChunk > 1;
    },
    allowedPageClass: function allowedPageClass(direction) {
      return this.allowedPage(direction) ? '' : this.Theme.disabled;
    },
    allowedChunkClass: function allowedChunkClass(direction) {
      return this.allowedChunk(direction) ? '' : this.Theme.disabled;
    },
    activeClass: function activeClass(page) {
      return this.page == page ? this.Theme.active : '';
    },
    formatNumber: function formatNumber(num) {

      if (!this.opts.format) return num;

      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  },
  beforeDestroy: function beforeDestroy() {
    if (bus) {
      bus.$off();
      bus.$destroy();
    }
  }
};


function range(start, count) {
  return Array.apply(0, Array(count)).map(function (element, index) {
    return index + start;
  });
}
module.exports = exports['default'];