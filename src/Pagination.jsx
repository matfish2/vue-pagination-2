import template from './template'
import RenderlessPagination from "./RenderlessPagination";
import {h} from 'vue'
export default {
    name: 'Pagination',
    components: {RenderlessPagination},
    provide() {
      return {
          Page: () => this.value,
          perPage: () => this.perPage,
          records: () => this.records
      }
    },
    render() {
        // return h('div',{},
        //     'hello');
        return <renderless-pagination slots={
                    {
                        default: function (props) {
                            return props.override ? h(
                                props.override,
                                {
                                    attrs: {props}
                                }
                            ) : template(props)(h)
                        }
                    }
        }
        >

        </renderless-pagination>
    },
    props: {
        value: {
            type: Number,
            required: true,
            validator(val) {
                return val>0;
            }
        },
        records: {
            type: Number,
            required: true
        },
        perPage: {
            type: Number,
            default: 25
        },
        options: {
            type: Object
        }
    },
    data: function () {
        return {
            aProps: {
                role: "button"
            }
        }
    }
}
