let template = require('./template.jsx');

module.exports =
{
  render:template(),
  props: {
    for: {
      type: String,
      required: true
    },
    records: {
      required: true
    },
    perPage: {
      required: false,
      default: 25
    },
    chunk: {
      required: false,
      default: 10
    },
    countText: {
      type: String,
      required: false,
      default: '{count} records'
    }
  },
  computed: {
    pages: function() {
      return range(1,parseInt(this.chunk));
    },
    totalPages: function() {
      var total = Math.ceil(this.records / this.perPage);

      return total?total:1;
    },
    totalChunks: function() {
      return Math.ceil(this.totalPages / this.chunk);
    },
    currentChunk: function() {
      return Math.ceil(this.page / this.chunk);
    },
    paginationStart: function() {
     return ((this.currentChunk-1) * this.chunk) + 1;
   },
   count: function() {
    return this.countText.replace('{count}', this.records);
  }
},
methods: {
  setPage: function(page) {
    if (this.allowedPage(page)) {
     this.paginate(page);
    }
  },
  next: function() {
    return this.setPage(this.page + 1);
  },
  prev: function() {
    return this.setPage(this.page -1);
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
  activeClass: function(index) {
    var page = this.paginationStart + index;
    return this.page==page?'active':'';
  }
}
}

function range(start, count) {
  return Array.apply(0, Array(count))
  .map(function (element, index) {
   return index + start;
 });
}