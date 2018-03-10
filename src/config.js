export default ()=>{
    return {
        format: true,
        chunk: 10,
        chunksNavigation:'fixed',
        edgeNavigation: false,
        theme:'bootstrap3',
        texts:{
            count:'Showing {from} to {to} of {count} records|{count} records|One record',
            first:'First',
            last:'Last'
        }
    }
}