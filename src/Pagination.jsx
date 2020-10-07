import template from './template'
import RenderlessPagination from "./RenderlessPagination";
import {h} from 'vue'

export default {
    name: 'Pagination',
    components: {RenderlessPagination},
    provide() {
        return {
            Page: () => this.modelValue,
            perPage: () => this.perPage,
            records: () => this.records
        }
    },
    render() {
        return h(RenderlessPagination, {}, {
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
