module.exports = function() {
  
  return function(h) {
    
    var theme = this.Theme;
    var alignText = this.align + "Text";
    var items = this.pages.map(function(page) {
      <li class={`VuePagination__pagination-item ${theme.item} ${this.activeClass(page)}`}>
      <a class={`${theme.link} ${this.activeClass(page)}`} 
      href="javascript:void(0)"
      role="button"
      on-click={this.setPage.bind(this, page)}>{page}</a>
      </li>
    }.bind(this));
    
    return <div class={`VuePagination ${theme.wrapper}`}><nav class={`${theme.nav}`}>
    <ul v-show={this.totalPages>1}
    class={`${theme.list} VuePagination__pagination`}>
    
    <li class={`VuePagination__pagination-item ${theme.item} ${theme.prev} VuePagination__pagination-item-prev-chunk ${this.allowedChunkClass(-1)}`}>
    <a class={theme.link} 
    href="javascript:void(0);"
    disabled={!!this.allowedChunkClass(-1)} 
    on-click={this.setChunk.bind(this,-1)}>&lt;&lt;</a>
    </li>
    
    
    <li class={`VuePagination__pagination-item ${theme.item} ${theme.prev} VuePagination__pagination-item-prev-page ${this.allowedPageClass(this.page-1)}`}>
    <a class={theme.link} 
    href="javascript:void(0);"
    disabled={!!this.allowedPageClass(this.page-1)} 
    on-click={this.prev.bind(this)}>&lt;</a>
    </li>
    
    {items}
    
    <li class={`VuePagination__pagination-item ${theme.item} ${theme.next} VuePagination__pagination-item-next-page ${this.allowedPageClass(this.page+1)}`}>
    <a class={theme.link} 
    href="javascript:void(0);"
    disabled={!!this.allowedPageClass(this.page+1)} 
    on-click={this.next.bind(this)}>&gt;</a>
    </li>
    
    <li class={`VuePagination__pagination-item ${theme.item} ${theme.next} VuePagination__pagination-item-next-chunk ${this.allowedChunkClass(1)}`}>
    <a class={theme.link} 
    href="javascript:void(0);"
    disabled={!!this.allowedChunkClass(1)}
    on-click={this.setChunk.bind(this,1)}>&gt;&gt;</a>
    </li>
    </ul>
    <p v-show={parseInt(this.records)}
    class={`VuePagination__count ${theme.count}`}>{this.count}</p>
    </nav>
    </div>
  }
}
