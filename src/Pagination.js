let template = require('./template.js');
let bus = require('./bus');

module.exports =
{
  render:template.call(this),
  props: {
    for: {
      type: String,
      required: false
    },
    theme: {
      default:'bootstrap3'
    },
    align:{
      type: String,
      default:'center'
    },
    records: {
      type: Number,
      required: true
    },
    perPage: {
      type: Number,
      default: 25
    },
    chunk: {
      type: Number,
      default: 10
    },
    chunksNavigation:{
      type:String,
      default:'fixed',
      validator: (value) => {
        return ['scroll','fixed'].indexOf(value)>-1;
      }
    },
    countText: {
      type: String,
      default: 'Showing {from} to {to} of {count} records|{count} records|One record'
    },
    vuex: {
      type: Boolean
    },
    format:{
      type: Boolean,
      default:true
    }
  },
  created: function() {
    
    if (!this.vuex) return;
    
    if (!this.for) {
      throw new Error('vue-pagination-2: The "for" prop is required when using vuex');
    }

    let name = this.for;
    
    if (this.$store.state[name]) return;
    
    this.$store.registerModule(this.for,  {
      state: {
        page: 1
      },
      mutations: {
        [`${name}/PAGINATE`] (state, page) {
          state.page = page
        }
      }
    })
  },
  data: function() {
    return  {
      Page:1,
      firstPage:1
    }
  },
  computed: {
      Theme() {
        
        if (typeof this.theme==='object') {
          return this.theme;
        } 

        var themes = {
          bootstrap3:require('./themes/bootstrap3'),
          bootstrap4:require('./themes/bootstrap4'),
          bulma:require('./themes/bulma')    
        }
        
        if (typeof themes[this.theme]===undefined) {
          throw `vue-pagination-2: the theme ${this.theme} does not exist`;
        }

        return themes[this.theme];
      },      
    page() {
      return this.vuex?this.$store.state[this.for].page:this.Page;
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
      return Math.ceil(this.totalPages / this.chunk);
    },
    currentChunk: function() {
      return Math.ceil(this.page / this.chunk);
    },
    paginationStart: function() {

      if (this.chunksNavigation==='scroll') {
        return this.firstPage;
      }

      return ((this.currentChunk-1) * this.chunk) + 1;
    },
    pagesInCurrentChunk: function() {
      return this.paginationStart + this.chunk <= this.totalPages?
      this.chunk:
      this.totalPages - this.paginationStart + 1;
      
    },
    count: function() {

      
      if (/{page}/.test(this.countText)) {
        
        if (this.totalPages<=1) return '';

        return this.countText.replace('{page}', this.page).replace('{pages}', this.totalPages);
        
      }

      let parts = this.countText.split('|');
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
      if (this.vuex) {
        this.$store.commit(`${this.for}/PAGINATE`,  page);
      } else {
        this.Page = page;
      }
      
      this.$emit('paginate', page);

      if (this.for) {
        bus.$emit('vue-pagination::' + this.for, page);        
      }
    },
    next: function() {
      var page = this.page + 1;
      if (this.chunksNavigation==='scroll' && this.allowedPage(page) && !this.inDisplay(page)) {
        this.firstPage++; 
      }
      return this.setPage(page);
    },
    prev: function() {
      var page = this.page - 1;
      
      if (this.chunksNavigation==='scroll' && this.allowedPage(page) &&  !this.inDisplay(page)) {
        this.firstPage--; 
      }
      
      return this.setPage(page);
    },
    inDisplay(page) {
      
      var start = this.firstPage;
      var end = start + this.chunk - 1;

      return page>=start && page<=end;
    },
    nextChunk: function() {
      return this.setChunk(1);
    },
    prevChunk: function() {
      return this.setChunk(-1);
    },
    setChunk: function(direction) {
      this.setPage((((this.currentChunk -1) + direction) * this.chunk) + 1);
    },
    allowedPage: function(page) {
      return page>=1 && page<=this.totalPages;
    },
    allowedChunk: function(direction) {
      return (direction==1 && this.currentChunk<this.totalChunks)
      ||  (direction==-1 && this.currentChunk>1);
    },
    allowedPageClass: function(direction) {
      return this.allowedPage(direction)?'':'disabled';
    },
    allowedChunkClass: function(direction) {
      return this.allowedChunk(direction)?'':'disabled';
    },
    activeClass: function(page) {
      return this.page==page?this.Theme.active:'';
    },
    formatNumber: function (num) {
    
      if (!this.format) return num;
    
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  },
  beforeDestroy() {
    bus.$off();
    bus.$destroy();
  }
}

function range(start, count) {
  return Array.apply(0, Array(count))
  .map(function (element, index) {
    return index + start;
  });
}

