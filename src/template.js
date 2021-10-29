module.exports = function(props) {

  return function(h) {
    var theme = this.theme;
    var prevChunk = '';
    var nextChunk = '';
    var firstPage = '';
    var lastPage = '';

    var countText = props.opts.hideCount ? '' : <p style={parseInt(this.records) ? '' : 'display:none'}
    class={`VuePagination__count ${theme.count}`}>{this.count}</p>

    var items = this.pages.map(function(page) {
      return <li class={`VuePagination__pagination-item ${theme.page} ${this.activeClass(page)}`}
      onClick={this.setPage.bind(this, page)}
      onKeyDown={this.pageEvents(page).keydown}>
      <button class={`${theme.link} ${this.activeClass(page)}`}>{this.formatNumber(page)}</button>
      </li>

    }.bind(this));


    if (this.opts.edgeNavigation && this.totalChunks > 1) {
      firstPage = <li class={`VuePagination__pagination-item ${theme.page} ${this.page===1?theme.disabled:''} VuePagination__pagination-item-first-page`}
      onClick={this.setPage.bind(this, 1)}>
      <button type="button" class={theme.link}
      disabled={this.page===1}>{this.opts.texts.first}</button>
      </li>

      lastPage = <li class={`VuePagination__pagination-item ${theme.page} ${this.page===this.totalPages?theme.disabled:''} VuePagination__pagination-item-last-page`}
      onClick={this.setPage.bind(this, this.totalPages)}>
      <button type="button" class={theme.link}
      disabled={this.page===this.totalPages}>{this.opts.texts.last}</button>
      </li>
    }

    if (this.opts.chunksNavigation==='fixed') {

      prevChunk =  <li class={`VuePagination__pagination-item ${theme.page} ${theme.prev} VuePagination__pagination-item-prev-chunk ${this.allowedChunkClass(-1)}`}
      onClick={this.setChunk.bind(this,-1)}>
      <button type="button" class={theme.link}
      disabled={!!this.allowedChunkClass(-1)}>{this.opts.texts.prevChunk}</button>
      </li>

      nextChunk = <li class={`VuePagination__pagination-item ${theme.page} ${theme.next} VuePagination__pagination-item-next-chunk ${this.allowedChunkClass(1)}`}
      onClick={this.setChunk.bind(this,1)}
      >
      <button type="button" class={theme.link}
      disabled={!!this.allowedChunkClass(1)}>{this.opts.texts.nextChunk}</button>
      </li>;

    }

    return <div class={`VuePagination ${theme.wrapper}`}><nav class={`${theme.nav}`}>
    <ul style={this.totalPages>1 ? '' : 'display:none'}
    class={`${theme.list} VuePagination__pagination`}>
    {firstPage}
    {prevChunk}
    <li class={`VuePagination__pagination-item ${theme.page} ${theme.prev} VuePagination__pagination-item-prev-page ${this.allowedPageClass(this.page-1)}`}
    onClick={this.prev.bind(this)}>
    <button type="button" class={theme.link}
    disabled={!!this.allowedPageClass(this.page-1)}
    >{this.opts.texts.prevPage}</button>
    </li>
    {items}
    <li class={`VuePagination__pagination-item ${theme.page} ${theme.next} VuePagination__pagination-item-next-page ${this.allowedPageClass(this.page+1)}`}
    onClick={this.next.bind(this)}>
    <button type="button" class={theme.link}
    disabled={!!this.allowedPageClass(this.page+1)}
    >{this.opts.texts.nextPage}</button>
    </li>
    {nextChunk}
    {lastPage}
    </ul>
      {countText}
    </nav>
    </div>
  }.bind(props)
}
