module.exports = function() {
  
  return function(h) {
    
    var theme = this.Theme;
    var prevChunk = '';
    var nextChunk = '';
    var firstPage = '';
    var lastPage = '';
    var items = this.pages.map(function(page) {
      
      return <li class={`VuePagination__pagination-item ${theme.item} ${this.activeClass(page)}`}
      onClick={this.setPage.bind(this, page)}>
      <a class={`${theme.link} ${this.activeClass(page)}`} 
      href="javascript:void(0)"
      role="button">{page}</a>
      </li>
      
    }.bind(this));
    
    
    if (this.opts.edgeNavigation && this.totalChunks > 1) {
      firstPage = <li class={`VuePagination__pagination-item ${theme.item} ${this.page===1?theme.disabled:''} VuePagination__pagination-item-prev-chunk`}
      onClick={this.setPage.bind(this, 1)}>
      <a class={theme.link} 
      href="javascript:void(0);"
      disabled={this.page===1}>{this.opts.texts.first}</a>
      </li>
      
      lastPage = <li class={`VuePagination__pagination-item ${theme.item} ${this.page===this.totalPages?theme.disabled:''} VuePagination__pagination-item-prev-chunk`}
      onClick={this.setPage.bind(this, this.totalPages)}>
      <a class={theme.link} 
      href="javascript:void(0);"
      disabled={this.page===this.totalPages}>{this.opts.texts.last}</a>
      </li>
    }
    
    if (this.opts.chunksNavigation==='fixed') {
      
      prevChunk =  <li class={`VuePagination__pagination-item ${theme.item} ${theme.prev} VuePagination__pagination-item-prev-chunk ${this.allowedChunkClass(-1)}`}
      onClick={this.setChunk.bind(this,-1)}>
      <a class={theme.link} 
      href="javascript:void(0);"
      disabled={!!this.allowedChunkClass(-1)}>{this.opts.texts.prevChunk}</a>
      </li>
      
      nextChunk = <li class={`VuePagination__pagination-item ${theme.item} ${theme.next} VuePagination__pagination-item-next-chunk ${this.allowedChunkClass(1)}`}
      onClick={this.setChunk.bind(this,1)}
      >
      <a class={theme.link} 
      href="javascript:void(0);"
      disabled={!!this.allowedChunkClass(1)}>{this.opts.texts.nextChunk}</a>
      </li>;
      
    }
    
    
    return <div class={`VuePagination ${theme.wrapper}`}><nav class={`${theme.nav}`}>
    <ul v-show={this.totalPages>1}
    class={`${theme.list} VuePagination__pagination`}>
    {firstPage}
    {prevChunk} 
    <li class={`VuePagination__pagination-item ${theme.item} ${theme.prev} VuePagination__pagination-item-prev-page ${this.allowedPageClass(this.page-1)}`}
    onClick={this.prev.bind(this)}>
    <a class={theme.link} 
    href="javascript:void(0);"
    disabled={!!this.allowedPageClass(this.page-1)} 
    >{this.opts.texts.prevPage}</a>
    </li>
    {items}
    <li class={`VuePagination__pagination-item ${theme.item} ${theme.next} VuePagination__pagination-item-next-page ${this.allowedPageClass(this.page+1)}`}
    onClick={this.next.bind(this)}>
    <a class={theme.link} 
    href="javascript:void(0);"
    disabled={!!this.allowedPageClass(this.page+1)} 
    >{this.opts.texts.nextPage}</a>
    </li>
    {nextChunk}
    {lastPage}
    </ul>
    <p v-show={parseInt(this.records)}
    class={`VuePagination__count ${theme.count}`}>{this.count}</p>
    </nav>
    </div>
  }
}
