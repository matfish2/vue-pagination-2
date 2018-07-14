import RenderlessPagination from './RenderlessPagination';

export default {
    components:{RenderlessPagination:RenderlessPagination},
    render() {
      
},
props:{
    for: {
        type: String,
        required: false
    },
    page:{
        type:Number,
        default:1
    },
    records: {
        type: Number,
        required: true
    },
    perPage: {
        type: Number,
        default: 25
    },
    vuex: {
        type: Boolean
    },
    options:{
        type: Object
    }
},
data: function() {
    return {
        aProps:{
            href:"javascript:void(0);",
            role:"button"
        }
    }
},
methods:{
    paginate(page) {
        this.$emit('paginate', page)
    }
}
}
