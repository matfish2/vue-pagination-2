"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

module.exports = function () {
  return {
    created: function created() {
      var name = this.for;

      if (this.$store.state[name]) return;

      this.$store.registerModule(this.for, {
        state: {
          page: 1
        },
        mutations: _defineProperty({}, name + "/PAGINATE", function undefined(state, page) {
          state.page = page;
        })
      });
    },
    methods: {
      paginate: function paginate(page) {
        this.$store.commit(this.for + "/PAGINATE", page);
      }
    },
    computed: {
      page: function page() {
        return this.$store.state[this.for].page;
      }
    }
  };
};