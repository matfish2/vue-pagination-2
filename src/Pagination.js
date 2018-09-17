let template = require('./template.js');
import defaultOptions from './config';
import merge from 'merge';

module.exports = {
  render:template.call(this),
  model:{
    prop: 'page',
    event: 'paginate'
  },
  props: {
    page:{
      type: Number,
      required: true
    },
    for: {
      type: String,
      required: false
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
    return  {
      firstPage: this.page
    }
  },
  watch:{
    page(page) {
      if (this.opts.chunksNavigation==='scroll' && this.allowedPage(page) && !this.inDisplay(page)) {
        this.firstPage = page;
      }
    }
  },
  computed: {
    opts() {
      return merge(defaultOptions(), this.options);
    },
    Theme() {
      
      if (typeof this.opts.theme==='object') {
        return this.opts.theme;
      } 
      
      var themes = {
        bootstrap3:require('./themes/bootstrap3'),
        bootstrap4:require('./themes/bootstrap4'),
        bulma:require('./themes/bulma')    
      }
      
      if (typeof themes[this.opts.theme]===undefined) {
        throw `vue-pagination-2: the theme ${this.opts.theme} does not exist`;
      }
      
      return themes[this.opts.theme];
    },      
    pages: function() {
      if (!this.records)
      return [];
      
      return range(this.paginationStart, this.pagesInCurrentChunk);
    },
    totalPages: function() {
      return this.records?Math.ceil(this.records / this.perPage):1;
    },
    totalChunks: function() {
      return Math.ceil(this.totalPages / this.opts.chunk);
    },
    currentChunk: function() {
      return Math.ceil(this.page / this.opts.chunk);
    },
    paginationStart: function() {
      
      if (this.opts.chunksNavigation==='scroll') {
        return this.firstPage;
      }
      
      return ((this.currentChunk-1) * this.opts.chunk) + 1;
    },
    pagesInCurrentChunk: function() {
      return this.paginationStart + this.opts.chunk <= this.totalPages?
      this.opts.chunk:
      this.totalPages - this.paginationStart + 1;
      
    },
    count: function() {
      
      
      if (/{page}/.test(this.opts.texts.count)) {
        
        if (this.totalPages<=1) return '';
        
        return this.opts.texts.count.replace('{page}', this.page).replace('{pages}', this.totalPages);
        
      }
      
      let parts = this.opts.texts.count.split('|');
      let from = ((this.page-1) * this.perPage) + 1;
      let to = this.page==(this.totalPages)?this.records:from + this.perPage - 1;
      let i = Math.min(this.records==1?2:this.totalPages==1?1:0, parts.length-1);
      
      return parts[i].replace('{count}', this.formatNumber(this.records))
      .replace('{from}', this.formatNumber(from))
      .replace('{to}', this.formatNumber(to))
    }
  },
  methods: {
    setPage: function(page) {
      if (this.allowedPage(page)) {
        this.paginate(page);
      }
    },
    paginate(page) {
      this.$emit('paginate', page);
    },
    next: function() {
      var page = this.page + 1;
      if (this.opts.chunksNavigation==='scroll' && this.allowedPage(page) && !this.inDisplay(page)) {
        this.firstPage++; 
      }
      return this.setPage(page);
    },
    prev: function() {
      var page = this.page - 1;
      
      if (this.opts.chunksNavigation==='scroll' && this.allowedPage(page) &&  !this.inDisplay(page)) {
        this.firstPage--; 
      }
      
      return this.setPage(page);
    },
    inDisplay(page) {
      
      var start = this.firstPage;
      var end = start + this.opts.chunk - 1;
      
      return page>=start && page<=end;
    },
    nextChunk: function() {
      return this.setChunk(1);
    },
    prevChunk: function() {
      return this.setChunk(-1);
    },
    setChunk: function(direction) {
      this.setPage((((this.currentChunk -1) + direction) * this.opts.chunk) + 1);
    },
    allowedPage: function(page) {
      return page>=1 && page<=this.totalPages;
    },
    allowedChunk: function(direction) {
      return (direction==1 && this.currentChunk<this.totalChunks)
      ||  (direction==-1 && this.currentChunk>1);
    },
    allowedPageClass: function(direction) {
      return this.allowedPage(direction)?'':this.Theme.disabled;
    },
    allowedChunkClass: function(direction) {
      return this.allowedChunk(direction)?'':this.Theme.disabled;
    },
    activeClass: function(page) {
      return this.page==page?this.Theme.active:'';
    },
    formatNumber: function (num) {
      
      if (!this.opts.format) return num;
      
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
}

function range(start, count) {
  return Array.apply(0, Array(count))
  .map(function (element, index) {
    return index + start;
  });
}

