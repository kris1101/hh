export function formatStrDate(strtime) {
      var now = new Date(strtime);
      var year = now.getFullYear();
      var month = now.getMonth() + 1 < 10 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1;
      var date = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();
      var hour = now.getHours() < 10 ? "0" + now.getHours() : now.getHours();
      var minute = now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
      var second = now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds();
      return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;

}

export function compareDate(startdate, enddate){
      if (startdate && enddate){
          if (parseInt(enddate, 10) > parseInt(startdate, 10)){
            return true
          }else{
            return false
          }
      }else{
          return true
      }
}

