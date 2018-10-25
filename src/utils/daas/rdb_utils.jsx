export function runStatus(runstatus){
      if (runstatus === 0){
          return '等待中...'
      }else if(runstatus === 3){
          return '运行中...'
      }else if (runstatus === 4){
          return '停止中...'
      }else if (runstatus === 5){
          return '已停止'
      }
}

export function uploadStatus(uploadstatus){
      if (uploadstatus === 0){
          return '上传成功'
      }else{
          return '上传失败'
      }
}
