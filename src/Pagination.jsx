import template from './template'
import RenderlessPagination from "./RenderlessPagination";


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
        const RLPagination = Vue.resolveComponent('renderless-pagination');

        return Vue.h(RLPagination, {}, {
                default: function (props) {
                    return props.override ? Vue.h(
                        props.override,
                        {
                            props
                        }
                    ) : template(props)(Vue.h)
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
