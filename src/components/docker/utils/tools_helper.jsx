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


export function combinekeyvalue(keylist, valuelist){
  let result ={};
  if (keylist.length != valuelist.length){
        return [1, result] 
  }else{
    for (var item in keylist){
      if(keylist[item] && valuelist[item]){
        result[keylist[item]] = valuelist[item]
      }
    }
        return [0, result] 
  }
}
