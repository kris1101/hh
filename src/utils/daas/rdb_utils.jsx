export function uploadStatus(uploadstatus){
      if (uploadstatus === 0){
          return '上传成功'
      }else{
          return '上传失败'
      }
}

export function instanceRunStatus(statuscode){
    const status_choices = ['等待创建','初始化中','启动中','运行中','关机中','已关机','重启中','暂停','挂起','未知']
    return status_choices[statuscode];
}
