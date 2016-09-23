module.exports = function() {
  return  {
    vuex: {
    actions: {
      paginate: function(store, page) {
        store.dispatch('PAGINATE', this.for, page);
      }
    },
    getters: {
      pagination:  function (state) {
          return state.pagination;
      }
    }
  },
  computed: {
       page: function() {
      return this.pagination[this.for]
      },
  }
 };

}
