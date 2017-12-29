"use strict";

module.exports = function () {

  return function (h) {

    var theme = this.Theme;
    var alignText = this.align + "Text";
    var items = [];

    this.pages.map(function (page) {
      items.push(h(
        "li",
        { "class": "VuePagination__pagination-item " + theme.item + " " + this.activeClass(page) },
        [h(
          "a",
          { "class": theme.link + " " + this.activeClass(page),
            attrs: { href: "javascript:void(0)",
              role: "button"
            },
            on: {
              "click": this.setPage.bind(this, page)
            }
          },
          [page]
        )]
      ));
    }.bind(this));

    return h(
      "div",
      { "class": "VuePagination " + theme.wrapper },
      [h(
        "nav",
        { "class": "" + theme.nav },
        [h(
          "ul",
          {
            directives: [{
              name: "show",
              value: this.totalPages > 1
            }],

            "class": theme.list + " VuePagination__pagination" },
          [h(
            "li",
            { "class": "VuePagination__pagination-item " + theme.item + " " + theme.prev + " VuePagination__pagination-item-prev-chunk " + this.allowedChunkClass(-1) },
            [h(
              "a",
              { "class": theme.link,
                attrs: { href: "javascript:void(0);",
                  disabled: !!this.allowedChunkClass(-1)
                },
                on: {
                  "click": this.setChunk.bind(this, -1)
                }
              },
              ["<<"]
            )]
          ), h(
            "li",
            { "class": "VuePagination__pagination-item " + theme.item + " " + theme.prev + " VuePagination__pagination-item-prev-page " + this.allowedPageClass(this.page - 1) },
            [h(
              "a",
              { "class": theme.link,
                attrs: { href: "javascript:void(0);",
                  disabled: !!this.allowedPageClass(this.page - 1)
                },
                on: {
                  "click": this.prev.bind(this)
                }
              },
              ["<"]
            )]
          ), items, h(
            "li",
            { "class": "VuePagination__pagination-item " + theme.item + " " + theme.next + " VuePagination__pagination-item-next-page " + this.allowedPageClass(this.page + 1) },
            [h(
              "a",
              { "class": theme.link,
                attrs: { href: "javascript:void(0);",
                  disabled: !!this.allowedPageClass(this.page + 1)
                },
                on: {
                  "click": this.next.bind(this)
                }
              },
              [">"]
            )]
          ), h(
            "li",
            { "class": "VuePagination__pagination-item " + theme.item + " " + theme.next + " VuePagination__pagination-item-next-chunk " + this.allowedChunkClass(1) },
            [h(
              "a",
              { "class": theme.link,
                attrs: { href: "javascript:void(0);",
                  disabled: !!this.allowedChunkClass(1)
                },
                on: {
                  "click": this.setChunk.bind(this, 1)
                }
              },
              [">>"]
            )]
          )]
        ), h(
          "p",
          {
            directives: [{
              name: "show",
              value: parseInt(this.records)
            }],

            "class": "VuePagination__count " + theme.count },
          [this.count]
        )]
      )]
    );
  };
};