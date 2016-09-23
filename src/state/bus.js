let bus = require('../bus')

module.exports = function() {
 return {
  data: function() {
    return {
      page: 1
    }
  },
  methods: {
    paginate: function(page) {
      this.page = page;
      bus.$emit('vue-pagination::' + this.for, page);
    }
  }
}

}
