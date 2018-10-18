import React from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import moment from 'moment';


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


export function timezoneFormat(time, tz="Asia/Shanghai"){
  return (<Moment format="YYYY-MM-DD HH:mm:ss" parse="YYYY-MM-DDTHH:mm:ss.SSSZ" tz={tz}> {time} </Moment>);
}
export function timesince(time, parse="YYYY-MM-DDTHH:mm:ss.SSSZ", tz="Asia/Shanghai"){
  let t = moment.tz(time, "UTC").tz(tz).format("YYYY-MM-DD HH:mm:ss");
  return (<Moment toNow local="zh-cn" parse={parse}> {t} </Moment>);
}
