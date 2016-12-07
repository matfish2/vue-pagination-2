module.exports = function() {
  return function(h) {

  var items = [];

  this.pages.map(function(page) {
      items.push(
        <li class={"VuePagination__pagination-item page-item "+this.activeClass(page)}>
        <a class="page-link" href="javascript:void(0);"
        on-click={this.setPage.bind(this, page)}>{page}</a>
        </li>
        )
  }.bind(this));

  return <div class="VuePagination">
  <ul v-show={this.totalPages>1}
  class="pagination VuePagination__pagination">

  <li class={"VuePagination__pagination-item page-item VuePagination__pagination-item-prev-chunk "+this.allowedChunkClass(-1)}>
  <a class="page-link" href="javascript:void(0);"
  on-click={this.setChunk.bind(this,-1)}>&lt;&lt;</a>
  </li>


  <li class={"VuePagination__pagination-item page-item VuePagination__pagination-item-prev-page "+this.allowedPageClass(this.page-1)}>
  <a class="page-link" href="javascript:void(0);"
  on-click={this.prev.bind(this)}>&lt;</a>
  </li>

  {items}

  <li class={"VuePagination__pagination-item page-item VuePagination__pagination-item-next-page "+this.allowedPageClass(this.page+1)}>
  <a class="page-link" href="javascript:void(0);"
  on-click={this.next.bind(this)}>&gt;</a>
  </li>

  <li class={"VuePagination__pagination-item page-item VuePagination__pagination-item-next-chunk "+this.allowedChunkClass(1)}>
  <a class="page-link" href="javascript:void(0);"
  on-click={this.setChunk.bind(this,1)}>&gt;&gt;</a>
  </li>
  </ul>

  <p v-show={parseInt(this.records)}
  class="VuePagination__count">{this.count}</p>
  </div>
}
}
