<template>
<RenderlessPagination @paginate="paginate">
    <div class='VuePagination' :class='theme.wrapper' 
         slot-scope="{ 
         pages,
         pageEvents,
         hasEdgeNav,
         setFirstPage,
         setLastPage,
         setPrevChunk,
         setNextChunk,
         hasChunksNav,
         prevChunkProps,
         nextChunkProps,
         firstPageProps,
         lastPageProps,
         pageClasses,
         showPagination, 
         setPrevPage, 
         setNextPage,
         prevProps,
         nextProps,
         hasRecords,
         theme, 
         texts,
         count }">

        <nav :class='theme.nav'>
      
        <ul v-show="showPagination" :class="theme.list">
        
            <li v-if="hasEdgeNav" :class='theme.firstPage' @click="setFirstPage">
                <a v-bind="{...aProps,...firstPageProps}">{{texts.first}}</a>
            </li>
            
            <li v-if="hasChunksNav" :class='theme.prevChunk' @click="setPrevChunk">
                <a v-bind="{...aProps, ...prevChunkProps}">{{texts.prevChunk}}</a>
            </li>
        
            <li :class="theme.prev" @click="setPrevPage">
                <a v-bind="{...aProps,...prevProps}">{{texts.prevPage}}</a>
            </li>
            
            <li v-for="page in pages" :key="page" :class="pageClasses(page)" v-on="pageEvents(page)">
                <a v-bind="aProps" :class="theme.link">{{page}}</a>
            </li>

            <li :class="theme.next" @click="setNextPage">
                <a v-bind="{...aProps, ...nextProps}">{{texts.nextPage}}</a>
            </li>

            <li v-if="hasChunksNav" :class='theme.nextChunk' @click="setNextChunk">
                <a v-bind="{...aProps, ...nextChunkProps}">{{texts.nextChunk}}</a>
            </li>

            <li v-if="hasEdgeNav" :class="theme.lastPage" @click="setLastPage">
                <a v-bind="{...aProps, ...lastPageProps}">{{texts.last}}</a>
            </li>

        </ul>

        <p v-show="hasRecords" :class='theme.count'>{{count}}</p>
        
        </nav>
    </div>

    </RenderlessPagination>    
</template>

<script>

import RenderlessPagination from './RenderlessPagination.js';
import merge from 'merge';

export default {
    props:{
    for: {
      type: String,
      required: false
    },
    page:{
        type:Number,
        default:1
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
  data() {
      return {
          aProps:{
              href:"javascript:void(0);",
              role:"button"
          }
      }
  },
  methods:{
      paginate(page) {
          this.$emit('paginate', page)
      }
  }
}
</script>
