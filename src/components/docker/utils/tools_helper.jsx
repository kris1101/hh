export function generateformdata(values){
    let params = new FormData();
    Object.keys(values).forEach(function(key){
       params.append(key, values[key])
    })  
    return params
}
