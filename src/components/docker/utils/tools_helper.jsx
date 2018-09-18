export function generateformdata(values){
    let params = new FormData();
    Object.keys(values).forEach(function(key){
       params.append(key, values[key])
    })  
    return params
}

export function omitstring(originstr, n){
    if (originstr.length <= n){
      return originstr;
    }else{
      return originstr.slice(0, n) + "...";
    }

}
