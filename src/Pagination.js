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
      type: Number,
      required: true
    },
    perPage: {
      type: Number,
      required: false,
      default: 25
    },
    chunk: {
      type: Number,
      required: false,
      default: 10
    },
    countText: {
      type: String,
      required: false,
      default: 'Showing {from} to {to} of {count} records|{count} records|One record'
    }
  },
  computed: {
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
     return ((this.currentChunk-1) * this.chunk) + 1;
   },
   pagesInCurrentChunk: function() {

    return this.paginationStart + this.chunk <= this.totalPages?
    this.chunk:
    this.totalPages - this.paginationStart + 1;

  },
  count: function() {

    let from = ((this.page-1) * this.perPage) + 1;
    let to = this.page==(this.totalPages)?this.records:from + this.perPage - 1;
    let parts = this.countText.split('|');
    let i = Math.min(this.records==1?2:this.totalPages==1?1:0, parts.length-1);

    return parts[i].replace('{count}', this.records)
                   .replace('{from}', from)
                   .replace('{to}', to)
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
activeClass: function(page) {
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
