const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

export function humansize(size, unit, not_have_unit){
  let n = parseInt(size, 10) || 0;
  let i = units.indexOf(unit || 'B');
  while(n >= 1024 && i < units.length-1 && ++i)
      n = n/1024;
  if (not_have_unit){
    return (n.toFixed(n >= 10 || i < 1 ? 0 : 1));
  }else{
    return (n.toFixed(n >= 10 || i < 1 ? 0 : 1) + ' ' + units[i]);
  }
}
