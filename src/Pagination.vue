<template>
  <div class="VuePagination">
  <ul v-show="totalPages>1"
  class="pagination VuePagination__pagination">

  <li class="VuePagination__pagination-item VuePagination__pagination-item-prev-chunk"
  v-bind:class="allowedChunkClass(-1)">
  <a href="javascript:void(0);"
  @click="setChunk(-1)">&lt;&lt;</a>
</li>


<li class="VuePagination__pagination-item VuePagination__pagination-item-prev-page"
v-bind:class="allowedPageClass(page-1)">
<a href="javascript:void(0);"
@click="setPage(page-1)">&lt;</a>
</li>

<li class="VuePagination__pagination-item"
v-for="(page, index) in pages"
v-if="paginationStart + (page-1) <= totalPages"
v-bind:class="activeClass(index)">
<a href="javascript:void(0);"
@click="setPage(paginationStart + index)">{{paginationStart + index}}</a>
</li>

<li class="VuePagination__pagination-item VuePagination__pagination-item-next-page"
v-bind:class="allowedPageClass(page+1)">
<a href="javascript:void(0);"
@click="setPage(page+1)">&gt;</a>
</li>

<li class="VuePagination__pagination-item VuePagination__pagination-item-next-chunk"
v-bind:class="allowedChunkClass(1)">
<a href="javascript:void(0);"
@click="setChunk(1)">&gt;&gt;</a>
</li>
</ul>

<p v-if="records"
class="VuePagination__count">{{count}}</p>
</div>
</template>

<script>
import bus from './bus'

export default
{
  data: function() {
    return {
      page: 1    }
  },
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
      return range(1,this.chunk);
    },
    totalPages: function() {
      return Math.ceil(this.records / this.perPage);
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
        this.page = page;
        bus.$emit('vue-pagination::' + this.for, page);
        }
    },
    setChunk: function(direction) {
      if (this.allowedChunk(direction))
        this.setPage((((this.currentChunk -1) + direction) * this.chunk) + 1);
    },
    allowedPage: function(page) {
      return (page>=1) && (page<=this.totalPages);
    },
    allowedPageClass: function(direction) {
      return this.allowedPage(direction)?'':'disabled';
    },
    allowedChunk: function(direction) {
      return (direction==1 && this.currentChunk<this.totalChunks)
      ||  (direction==-1 && this.currentChunk>1);
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

</script>


