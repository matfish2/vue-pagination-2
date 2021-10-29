import template from './template'
import RenderlessPagination from "./RenderlessPagination";
import {h,ref} from 'vue'

export default {
    name: 'Pagination',
    emits:['update:modelValue','paginate'],
    components: {RenderlessPagination},
    provide() {
        return {
            Page: () => this.modelValue,
            perPage: () => this.perPage,
            records: () => this.records
        }
    },
    render() {
        return h(RenderlessPagination, {
            ref:'pg'
        }, {
                default: function (props) {
                    return props.override ? h(
                        props.override,
                        {
                            props
                        }
                    ) : template(props)(h)
                }
        })
    },
    methods:{
      setPage(page) {
          this.$refs.pg.setPage(page)
      }
    },
    props: {
        modelValue: {
            type: Number,
            required: true,
            validator(val) {
                return val > 0;
            }
        },
        records: {
            type: Number,
            required: true
        },
        perPage: {
            type: Number,
            required: true
        },
        options: {
            type: Object
        }
    }
}
