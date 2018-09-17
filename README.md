# Vue Pagination 2

[Click here](https://jsfiddle.net/matfish2/c9wp2k63) to see it in action.

Note: This package is for use with Vuejs 2.
For version 1 please use [v-pagination](https://www.npmjs.com/package/v-pagination) instead.

Simple, generic and non-intrusive pagination component for Vue.js version 2.

- [Dependencies](#dependencies)
- [Installation](#installation)
  - [NPM](#npm)
  - [Script tag](#script-tag)
- [Usage](#usage)
 
# Dependencies

* Vue.js (>=2.0.0-rc.1). Required.
* CSS: Bootstrap 3 or Bootstrap 4 or Bulma.

# Installation

## NPM

    npm install vue-pagination-2

import the script:

    import Pagination from 'vue-pagination-2';

## Script tag

Grab the minified version under `dist/vue-pagination-2.min.js`. 
It will export a global `Pagination` variable. 

# Usage

## Register the component globally or locally:

```js
Vue.component('pagination', Pagination);
```

OR

```js
...
components: {
  Pagination
},
data() {
  return {
    page: 2
  }
}
...
```

HTML:
```vue
<pagination v-model="page" :records="500" @paginate="myCallback"></pagination>
```
props:

* `records` `number` `required` number of records
* `per-page` `number` `optional` records per page. Default: `25`
* `options` `object` `optional`:
  * `chunk` `number` max pages per chunk. Default: `10`
  * `chunksNavigation` `string` Which method to use when navigating outside chunks boundries. Default: `fixed`. Options are:  
    * `scroll` - the range of pages presented will incrementally change when navigating to a page outside the chunk (e.g 1-10 will become 2-11 once the user presses the next arrow to move to page 11). 
    * `fixed` - navigation will occur between fixed chunks (e.g 1-10, 11-20, 21-30 etc.). Double arrows will be added to allow navigation to the beginning of the previous or next chunk. 
  * `theme` `string` CSS theme used for styling. Supported: `bootstrap3`, `bootstrap4`,`bulma`. Default: `bootstrap3`.
  * `format` `boolean` Format numbers using a separating comma. Default: `true`
  * `edgeNavigation` Show links to first and last pages. Default: `false`
  * `texts` `object` `optional` 
    * `count` total records text. It can consist of up to 3 parts, divided by `|`.
      * First part: used when there are multiple pages
      * Second part: used when there is only one page
      * Third part: used when there is only one record.
    
      Default: `Showing {from} to {to} of {count} records|{count} records|One record`
    
    * `first` First page text. Default: `First`
    * `last` last page text. Default: `Last` 
     

  Note: if you want to display the page number rather than the records range, use `{page}` and `{pages}` as a placeholders. 
  E.g: `Showing page {page} out of {pages}`

## Custom Event

When a page is selected a custom `paginate` event will be dispatched.
Listen to it on the component and run your callback

# Computed Properties

* `totalPages`
* `totalChunks`
* `currentChunk`
