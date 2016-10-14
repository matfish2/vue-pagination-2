module.exports = function() {
  return  {
    created: function() {
      let name = this.for;

      if (this.$store.state[name]) return;

      this.$store.registerModule(this.for,  {
        state: {
          page: 1
        },
        mutations: {
         [`${name}/PAGINATE`] (state, page) {
          state.page = page
        }
      }
    })
    },
    methods:{
      paginate: function(page) {
           this.$store.commit(`${this.for}/PAGINATE`,  page);
      }
    },
    computed:{
      page: function() {
        return this.$store.state[this.for].page
      }
    }
  }
}


