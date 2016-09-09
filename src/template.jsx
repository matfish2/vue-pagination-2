module.exports = function() {
  return function(h) {

  var items = [];

  this.pages.map(function(page, index) {
    if (this.paginationStart + (page-1) <= this.totalPages)
      items.push(
        <li class="VuePagination__pagination-item"
        class={this.activeClass(index)}>
        <a href="javascript:void(0);"
        on-click={this.setPage.bind(this, this.paginationStart + index)}>{this.paginationStart + index}</a>
        </li>
        )
  }.bind(this));

  return <div class="VuePagination">
  <ul v-show={this.totalPages>1}
  class="pagination VuePagination__pagination">

  <li class="VuePagination__pagination-item VuePagination__pagination-item-prev-chunk"
  class={this.allowedChunkClass(-1)}>
  <a href="javascript:void(0);"
  on-click={this.setChunk.bind(this,-1)}>&lt;&lt;</a>
  </li>


  <li class="VuePagination__pagination-item VuePagination__pagination-item-prev-page"
  class={this.allowedPageClass(this.page-1)}>
  <a href="javascript:void(0);"
  on-click={this.setPage.bind(this, this.page-1)}>&lt;</a>
  </li>

  {items}

  <li class="VuePagination__pagination-item VuePagination__pagination-item-next-page"
  class={this.allowedPageClass(this.page+1)}>
  <a href="javascript:void(0);"
  on-click={this.setPage.bind(this,this.page+1)}>&gt;</a>
  </li>

  <li class="VuePagination__pagination-item VuePagination__pagination-item-next-chunk"
  class={this.allowedChunkClass(1)}>
  <a href="javascript:void(0);"
  on-click={this.setChunk.bind(this,1)}>&gt;&gt;</a>
  </li>
  </ul>

  <p v-show={parseInt(this.records)}
  class="VuePagination__count">{this.count}</p>
  </div>
}
}
